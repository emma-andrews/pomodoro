using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Google.Type;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PomodoroServer.Handlers;

namespace ServerWorker {
    public class Worker : BackgroundService {
        private readonly ILogger<Worker> _logger;
        private string servURL = "http://10.136.248.196:5001";

        public Worker(ILogger<Worker> logger) {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
            while (!stoppingToken.IsCancellationRequested) {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                await Task.Delay(30000, stoppingToken);
                
                //How often do I poll the users?
                //every minute?

                await RefreshUsers();
                



            }
        }

        private async Task RefreshUsers() {
            var queue = await GetUsers();
            await RefreshOldUsers(queue);
        }
        protected async Task<Queue<KeyValuePair<string, DateTime>>> GetUsers() {


            //Queue<Tuple<string, DateTime>> userQueue = new Queue<Tuple<string, DateTime>>();
            Dictionary<string, DateTime> userDictionary = new Dictionary<string, DateTime>();
            var collection = Program.db.Collection("users");
            var list = await collection.ListDocumentsAsync().ToList();
            foreach (var userRef in list) {
                var user = userRef.GetSnapshotAsync().Result.ToDictionary();
                Timestamp timestamp = (Timestamp) user["atexpiretime"];
                var dateTime = timestamp.ToDateTime().ToLocalTime();
                var userID = userRef.Id;
                userDictionary.Add(userID, dateTime);
            }
            var myList = userDictionary.ToList();

            myList.Sort((pair1,pair2) => pair1.Value.CompareTo(pair2.Value));
            Queue<KeyValuePair<string, DateTime>> userQueue = new Queue<KeyValuePair<string, DateTime>>(myList);
            return userQueue;
        }

        protected async Task RefreshOldUsers(Queue<KeyValuePair<string, DateTime>> queue) {

            int compareValue = DateTime.Compare(DateTime.Now.ToUniversalTime().AddMinutes(2.5), queue.Peek().Value.ToUniversalTime()); //want to be less for refresh
            while (compareValue > 0) {
                HttpClient client = new HttpClient();
                var url = $"{servURL}/users/refresh/?id={queue.Peek().Key}";
                await client.GetAsync(url);
                //await SpotifyHandler.RefreshUser(queue.Peek().Key);
                queue.Dequeue();
                if (queue.Count < 1) {
                    return;
                }
                compareValue = DateTime.Compare(DateTime.Now.ToUniversalTime().AddMinutes(5), queue.Peek().Value.ToUniversalTime());
            }
        }
        
        
        
    }
}
