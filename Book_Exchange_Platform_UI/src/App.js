import "./App.css";
import MiniDrawer from "./main/MiniDrawer";
import Login from "./main/Login";
//import SignUp from "./main/SignUp";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./state/ActionCreator";
import { bindActionCreators } from "redux";
import axios from "axios";
import { COMMON_URL } from "./constants/URL";
import Loading from "./main/Loading";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import SignUp from "./main/SignUp";

function App() {
  const [cookies, setCookie] = useCookies(['access_token']);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const userData = useSelector(state => state.login);
  const [isLogging, setIsLogging] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#007bff',
      },
      secondary: {
        main: '#6c757d',
      },
      background: {
        default: '#f8f9fa',
      },
      text: {
        primary: '#333',
      },
    },
    // Add more theme customization options as needed
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  React.useEffect(() => {
    if (!cookies?.['access_token']) {
      setIsLoading(false);
      return;
    }
    axios.defaults.headers.common['Authorization'] = cookies['access_token'];
    axios.get(COMMON_URL + "auth/userinfo").then((response) => {
      if (response.status === 200 && response.data) {
        actions.loginAction(response.data);
        setIsLogging(false);
      }
    }).catch((error) => {
      console.error('userinfo failed:', error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          {isLogging && !userData?.username ?
            <Route path="*" element={isLoading ? <Loading /> : <Navigate to="/login" />} /> :
            (<><Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<MiniDrawer />} /></>)}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;