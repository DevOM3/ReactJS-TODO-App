import { useEffect } from 'react';
import './App.css';
import { auth } from './firebase';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      authUser
        ? dispatch({
          type: "SET_USER",
          user: authUser,
        })
        : dispatch({
          type: "SET_USER",
          user: null,
        })
    })
  }, [dispatch]);

  return (
    <div className="app">
      {
        user
          ? <>
            <Navbar />
            <Home />
          </>
          : <Login />
      }
    </div>
  );
}

export default App;
