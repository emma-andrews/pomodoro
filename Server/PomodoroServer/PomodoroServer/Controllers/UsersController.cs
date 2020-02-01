using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace PomodoroServer.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase {
        
        
        [HttpPost]
        public async Task<string> CreateUser(UserProfile newUser) {

            
            //step 1: fill out userprofile
            //it will come with username, email, password, access token
            
            
            
            //step 2: after filling UP, put in database
            var userCollection = Program.db.Collection("users");
            //return userCollection.Document(newId.ToString()).SetAsync(newUser.convertToDictionary()).Result.ToString();
            return "blah";
        }
    }
}