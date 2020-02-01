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
        public static string client_id, client_secret;
        
        
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



    }
    
    
    
}