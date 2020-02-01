using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ServerWorker {
    public class Program {
        
        public static readonly FirestoreDb db = GenerateFireStore("swamphacks2020bett", "../PomodoroServer/Keys/Swamphacks2020-d25d3a408a1e.json");

        public static void Main(string[] args) {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) => { services.AddHostedService<Worker>(); });
        
        
        public static FirestoreDb GenerateFireStore(string projectname, string path) {

            FirestoreDbBuilder builder = new FirestoreDbBuilder();
            builder.CredentialsPath = path;
            builder.ProjectId = projectname;

            return builder.Build();
        }
        
        
        
    }
}