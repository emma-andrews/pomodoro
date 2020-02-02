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

  // const [cookies] = useCookies();

  const checkIfAuthenticated = () => {
    // console.log(Cookie.load('hi'));
    const args = cookies.get('authCookie');
    if (args !== undefined) {
      const argsList = args.split(':');
      if (argsList.length === 2) {
        console.log(argsList[0]);
        console.log(argsList[1]);
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
    });
    checkIfAuthenticated();
  }, []);

  return null;
};

export default AuthState;
