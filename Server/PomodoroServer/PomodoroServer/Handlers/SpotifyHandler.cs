using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace PomodoroServer.Handlers {
    public class SpotifyHandler {
        public static async Task<Dictionary<string, string>> GenerateTokensFromCode(string authcode) {
            
            var values = new Dictionary<string, string> {
                {"grant_type", "authorization_code"},
                {"code", authcode},
                {"redirect_uri", "https://localhost:8888/redirect"}
            };



            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(Program.client_id + ':' + Program.client_secret);
            var base64String = System.Convert.ToBase64String(plainTextBytes);


            HttpClient client = new HttpClient();

            client.DefaultRequestHeaders.Add("Authorization", "Basic " + base64String);

            var content = new FormUrlEncodedContent(values);

            var response = await client.PostAsync("https://accounts.spotify.com/api/token", content);

            var responseString = await response.Content.ReadAsStringAsync();

            //Console.WriteLine(responseString);
            
            JToken jsonResult = JToken.Parse(responseString);

            string accessToken = (string)jsonResult["access_token"];
            int expiresIn = (int)jsonResult["expires_in"];
            string refreshToken = (string)jsonResult["refresh_token"];

            return new Dictionary<string, string> {
                {"accesstoken", accessToken},
                {"expiresin", expiresIn.ToString()},
                {"refreshtoken", refreshToken}
            };
        }

        //todo
        //use firestore id
        public static async Task RefreshUser(string id) {

            var dictionary = Program.db.Collection("users").Document(id).GetSnapshotAsync().Result.ToDictionary();
            UserProfile temp = new UserProfile(dictionary);
            
            var values = new Dictionary<string, string> {
                {"grant_type", "refresh_token"},
                {"refresh_token", temp.Refreshtoken}
            };



            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(Program.client_id + ':' + Program.client_secret);
            var base64String = System.Convert.ToBase64String(plainTextBytes);


            HttpClient client = new HttpClient();

            client.DefaultRequestHeaders.Add("Authorization", "Basic " + base64String);

            var content = new FormUrlEncodedContent(values);

            var response = await client.PostAsync("https://accounts.spotify.com/api/token", content);

            var responseString = await response.Content.ReadAsStringAsync();
            JToken jsonResult = JToken.Parse(responseString);

            var newaccesstoken = (string) jsonResult["access_token"];
            if ((string) jsonResult["refresh_token"] != null) {
                temp.Refreshtoken = (string) jsonResult["refresh_token"];
            }

            var newDateTime = DateTime.Now.ToUniversalTime().AddHours(1);

            temp.Accesstoken = newaccesstoken;
            temp.Atexpiretime = newDateTime;

            await Program.db.Collection("users").Document(id).SetAsync(temp.convertToDictionary());

            //ensure this works


        }


        public static async Task PlayMusic(string id) {
            //check for playerstate beforehand??
            
            
            var dictionary = Program.db.Collection("users").Document(id).GetSnapshotAsync().Result.ToDictionary();
            UserProfile temp = new UserProfile(dictionary);
            
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + temp.Accesstoken);
            var response = await client.PutAsync("https://api.spotify.com/v1/me/player/play", null);
            //null for body?
            var responseString = await response.Content.ReadAsStringAsync();
            
            
            
        }

        public static async Task PauseMusic(string id) {
            
            
            
            var dictionary = Program.db.Collection("users").Document(id).GetSnapshotAsync().Result.ToDictionary();
            UserProfile temp = new UserProfile(dictionary);
            
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + temp.Accesstoken);

            var response = await client.GetAsync("https://api.spotify.com/v1/me/player");
            var responseString = await response.Content.ReadAsStringAsync();
            JToken jsonResult = JToken.Parse(responseString);

            if (!(bool) jsonResult["is_playing"]) {
                Console.WriteLine("ALREADY PAUSED\nALREADY PAUSED\nALREADY PAUSED\nALREADY PAUSED\nALREADY PAUSED\nALREADY PAUSED\n");
                return;
            }
            
            response = await client.PutAsync("https://api.spotify.com/v1/me/player/pause", null);
            //null for body?
            responseString = await response.Content.ReadAsStringAsync();
        }
        
        
        
    }
}