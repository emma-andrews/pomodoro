using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PomodoroServer.Handlers;

namespace PomodoroServer.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase {
        
        
        [HttpPost]
        public async Task<string> CreateUser(UserProfile newUser) {

            
            //step 1: fill out userprofile
            //it will come with username, email, password, access token
            var dictionary = await SpotifyHandler.GenerateTokensFromCode(newUser.Authcode);
            newUser.Accesstoken = dictionary["accesstoken"];
            newUser.Refreshtoken = dictionary["refreshtoken"];

            var secondsFromNow = Int32.Parse(dictionary["expiresin"]);
            newUser.Atexpiretime = DateTime.Now.AddSeconds(secondsFromNow);
            
            
            
            //step 2: after filling UP, put in database
            var userCollection = Program.db.Collection("users");
            await userCollection.Document().SetAsync(newUser.convertToDictionary());
            var matchingUserDocs = await Program.db.Collection("users").WhereEqualTo("email", newUser.Email).GetSnapshotAsync();

            return matchingUserDocs[0].Id;
        }
    }
}