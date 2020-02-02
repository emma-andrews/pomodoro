using System;
using System.Collections.Generic;
using System.Linq;
using Google.Cloud.Firestore;

namespace PomodoroServer {
    public class UserProfile {
        public string Email {
            get => email;
            set => email = value;
        }

        public string Username {
            get => username;
            set => username = value;
        }

        public string Password {
            get => password;
            set => password = value;
        }

        public string Accesstoken {
            get => accesstoken;
            set => accesstoken = value;
        }

        public string Refreshtoken {
            get => refreshtoken;
            set => refreshtoken = value;
        }

        public DateTime Atexpiretime {
            get => atexpiretime;
            set => atexpiretime = value;
        }

        public int Sessionlength {
            get => sessionlength;
            set => sessionlength = value;
        }

        public int Intervallength {
            get => intervallength;
            set => intervallength = value;
        }

        public int Breaklength {
            get => breaklength;
            set => breaklength = value;
        }

        
        private string email, username, password, accesstoken, refreshtoken;

        private bool loggedin;

        public bool Loggedin {
            get => loggedin;
            set => loggedin = value;
        }

        private DateTime atexpiretime;
        private int sessionlength, intervallength, breaklength;

        public Dictionary<string, object> convertToDictionary() {

            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            
            dictionary.Add("username", username);
            dictionary.Add("email", email);
            dictionary.Add("password", password);
            atexpiretime = DateTime.SpecifyKind(atexpiretime, DateTimeKind.Utc);
            dictionary.Add("atexpiretime", atexpiretime);
            dictionary.Add("sessionlength", sessionlength);
            dictionary.Add("intervallength", intervallength);
            dictionary.Add("breaklength", breaklength);
            dictionary.Add("accesstoken", accesstoken);
            dictionary.Add("refreshtoken", refreshtoken);
            
            return dictionary;
        }

        public UserProfile(){}
        public UserProfile(Dictionary<string, object> values) {

            if(values.ContainsKey("email"))
                email = (string)values["email"];
            if(values.ContainsKey("username"))
                username = (string) values["username"];
            if (values.ContainsKey("atexpiretime")) {
                Timestamp timestamp = (Timestamp) values["atexpiretime"];
                atexpiretime = timestamp.ToDateTime();
            }
            if(values.ContainsKey("password"))
                password = (string) values["password"];
            if(values.ContainsKey("sessionlength"))
                sessionlength = Int32.Parse(values["sessionlength"].ToString());
            if(values.ContainsKey("intervallength"))
                intervallength = Int32.Parse(values["intervallength"].ToString());
            if(values.ContainsKey("breaklength"))
                breaklength = Int32.Parse(values["breaklength"].ToString());
            if(values.ContainsKey("accesstoken"))
                accesstoken = (string)values["accesstoken"];
            if(values.ContainsKey("refreshtoken"))
                refreshtoken = (string)values["refreshtoken"];

        }
        
        
        
    }
}