import { useGlobal, useEffect, setGlobal } from 'reactn';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Populates useGlobal('currentUser') with the logged in user's session and role details
// if const [currentUser] = useGlobal('currentUser'), and currentUser is null, user is not logged in or this is still getting user data
// ReactN is used for this global user state
// Used in App.js, runs on first render to check if session is active

const AuthState = (props) => {
  // eslint-disable no-unused-vars
  const [currentUser, setCurrentUser] = useGlobal('currentUser');
  const [currentUserID, setCurrentUserID] = useGlobal('currentUserID');

  // const [cookies] = useCookies();

  // try {
  //   const res = await axios.post(reqURL, postContent);
  //   if (res.data && res.data.id !== null) {
  //     cookies.set('authCookie', `${email}:${password}`);
  //   }
  //   const userData = await axios.get(reqURL, {
  //     params: { id: res.data.id },
  //   });
  //   if (userData && userData.data !== null) setCurrentUser(userData.data);
  //   closeModalRegister();
  // } catch (err) {
  //   console.log(err);
  // }

  const checkIfAuthenticated = async () => {
    // console.log(Cookie.load('hi'));
    const args = cookies.get('authCookie');
    if (args !== undefined) {
      const argsList = args.split(':');
      if (argsList.length === 2) {
        console.log(argsList[0]);
        console.log(argsList[1]);
        const loginURL = '/external/users/verify';
        try {
          const authRes = await axios.get(loginURL, {
            params: { email: argsList[0], password: argsList[1] },
          });
          console.log(authRes);
          if (authRes.data && authRes.data.id !== null) {
            const getUserURL = '/external/users';
            const userData = await axios.get(getUserURL, {
              params: { id: authRes.data.id },
            });
            console.log(userData);
            if (userData && userData.data !== null) {
              setCurrentUser(userData.data);
              setCurrentUserID(authRes.data.id);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    // if (args.length == 2) {
    //   axios.post('/external/');
    // }
    // axios
    //   .post('/external/isLoggedIn')
    //   .then((res) => {
    //     if (res.data.success) setCurrentUser(res.data.user);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // Check if the user is already logged in (if they refresh the page)
  useEffect(() => {
    setGlobal({
      currentUser: null,
      currentUserID: null,
    });
    checkIfAuthenticated();
  }, []);

  return null;
};

export default AuthState;
