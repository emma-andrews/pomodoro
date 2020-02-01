using System;
using System.Collections.Generic;
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
        public string Authcode {
            get => authcode;
            set => authcode = value;
        }
        
        private string email, username, password, accesstoken, refreshtoken, authcode;



        private DateTime atexpiretime;
        private int sessionlength, intervallength, breaklength;

        public Dictionary<string, object> convertToDictionary() {

            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            
            dictionary.Add("email", email);
            dictionary.Add("password", password);
            dictionary.Add("authcode", authcode);
            atexpiretime = DateTime.SpecifyKind(atexpiretime, DateTimeKind.Utc);
            dictionary.Add("atexpiretime", atexpiretime);
            dictionary.Add("sessionlength", sessionlength);
            dictionary.Add("intervallength", intervallength);
            dictionary.Add("breaklength", breaklength);
            
            
            return dictionary;
        }

        public UserProfile(){}
        public UserProfile(Dictionary<string, object> values) {

            email = (string) values["email"];
            Timestamp timestamp = (Timestamp) values["atexpiretime"];
            atexpiretime = timestamp.ToDateTime();
            password = (string) values["password"];
            sessionlength = (int) values["sessionlength"];
            intervallength = (int) values["intervallength"];
            breaklength = (int) values["breaklength"];
            authcode = (string) values["authcode"];

        }
        
        
        
    }
}