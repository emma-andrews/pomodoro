using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Google.Cloud.Firestore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace PomodoroServer {
    public class Program {
        
        public static readonly FirestoreDb db = GenerateFireStore("swamphacks2020bett", "Swamphacks2020-d25d3a408a1e.json");
        private static string client_id, client_secret;
        
        
        public static void Main(string[] args) {
            Console.WriteLine("Created Cloud Firestore client with project ID: {0}", db.ProjectId);
            FirestoreDbBuilder temp = new FirestoreDbBuilder();
            StreamReader streamReader = new StreamReader("Keys/clientsecrets.txt");
            client_id = streamReader.ReadLine();
            client_secret = streamReader.ReadLine();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
        
        public static FirestoreDb GenerateFireStore(string projectname, string path) {

            FirestoreDbBuilder builder = new FirestoreDbBuilder();
            builder.CredentialsPath = path;
            builder.ProjectId = projectname;

            return builder.Build();
        }

        public static async Task<Dictionary<string, string>> GenerateTokensFromCode(string authcode) {
            
            var values = new Dictionary<string, string> {
                {"grant_type", "authorization_code"},
                {"code", authcode},
                {"redirect_uri", "https://localhost:8888/redirect"}
            };



            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(client_id + ':' + client_secret);
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
        
    }
    
    
    
}