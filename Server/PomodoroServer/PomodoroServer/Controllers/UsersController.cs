using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PomodoroServer.Handlers;

namespace PomodoroServer.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase {
        
        
        [HttpPost]
        public async Task<Dictionary<string, string>> CreateUser(UserProfile newUser) {

            Console.WriteLine(newUser.ToString());
            
            //step 1: fill out userprofile
            //it will come with username, email, password, access token
            //var dictionary = await SpotifyHandler.GenerateTokensFromCode(newUser.Authcode);
            // newUser.Accesstoken = dictionary["accesstoken"];
            // newUser.Refreshtoken = dictionary["refreshtoken"];

            //var secondsFromNow = Int32.Parse(dictionary["expiresin"]);
            //newUser.Atexpiretime = DateTime.Now.AddSeconds(newUser.);

            //step 2: after filling UP, put in database
            var userCollection = Program.db.Collection("users");
            await userCollection.Document().SetAsync(newUser.convertToDictionary());
            var matchingUserDocs = await Program.db.Collection("users").WhereEqualTo("email", newUser.Email).GetSnapshotAsync();

            return new Dictionary<string, string> {{"id", matchingUserDocs[0].Id}};
        }

        // [HttpPut]
        // public async Task<string> UpdateUser(UserProfile updatedUser, string id) {
        //     var userCollection = Program.db.Collection("users");
        //     var docRef = userCollection.Document(id);
        //     docRef.UpdateAsync(updatedUser.convertToDictionary());
        //     //docRef.SetAsync(updatedUser.convertToDictionary());
        //     //await userCollection.Document().SetAsync(updatedUser.convertToDictionary());
        //
        //     return "good";
        // }
        //


        [HttpPut("updatespotify")]
        public async Task<string> UpdateUserSpotify(UserProfile updatedUser, string id) {
                 var userCollection = Program.db.Collection("users");
                 var docRef = userCollection.Document(id);
                 var user = new UserProfile(docRef.GetSnapshotAsync().Result.ToDictionary());

                 user.Accesstoken = updatedUser.Accesstoken;
                 user.Refreshtoken = updatedUser.Refreshtoken;
                 user.Atexpiretime = updatedUser.Atexpiretime;
                 
                 return "ok";
        }

        [HttpPut("updatesettings")]
        public async Task<string> UpdateUserSettings(UserProfile updatedUser, string id) {
            var userCollection = Program.db.Collection("users");
            var docRef = userCollection.Document(id);
            var user = new UserProfile(docRef.GetSnapshotAsync().Result.ToDictionary());

            user.Breaklength = updatedUser.Breaklength;
            user.Intervallength = updatedUser.Intervallength;
            user.Sessionlength = updatedUser.Sessionlength;
                 
            return "ok";
        }

        [HttpGet("verify")]
        public async Task<Dictionary<string, string>> VerifyUser(string email, string password) {
            
            var matchingUserDocs = await Program.db.Collection("users").WhereEqualTo("email", email)
                .WhereEqualTo("password", password).GetSnapshotAsync();

            
            if (matchingUserDocs.Count != 1) {
                return null;
            }

            var documentSnapshot = matchingUserDocs[0];
            return new Dictionary<string, string> {{"id", matchingUserDocs[0].Id}};

        }
        
        

        [HttpGet("refresh")]
        public async Task RefreshUser(string id) {
            SpotifyHandler.RefreshUser(id);
            //Do I need an await here
        }

        [HttpGet("pause")]
        public void PauseUser(string id) {
            SpotifyHandler.PauseMusic(id);
        }
        
        [HttpGet("play")]
        public async Task PlayUser(string id) {
            await SpotifyHandler.PlayMusic(id);
        }
        
        [HttpGet]
        public async Task<Dictionary<string, object>> GetUser(string id) {
            try {
                var matchingUserDocs = await Program.db.Collection("users").Document(id).GetSnapshotAsync();
                return new UserProfile(matchingUserDocs.ToDictionary()).convertToDictionary();
            }
            catch (Exception e) {
                return null;
            }
        }
        
        
        
        
    }
}