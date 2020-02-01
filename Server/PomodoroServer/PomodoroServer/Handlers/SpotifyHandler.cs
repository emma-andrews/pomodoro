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
            
            
            


        }
        
        
        
    }
}