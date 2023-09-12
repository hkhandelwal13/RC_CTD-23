import React, { useState, useEffect } from 'react';

import {BrowserRouter,Route, Routes ,Navigate} from "react-router-dom";
import Navbar from "./components/Nav-comp/Navbar";
import './App.css';
import Instruct from "./components/instruct-comp/instruct";
import Mobileview from './components/codingpage-comp/mobileview/mobileview';
import Codingpage from "./components/codingpage-comp/codingpage";
// import Submission from "./components/submission-comp/submission";
import Leaderboard from "./components/leaderb-comp/leaderboard";
import Result from "./components/result-comp/result";
import Footer from "./components/footer-comp/footer";
import Quescards from "./components/quescard-comp/quescards";
import Login from "./components/loginpage-comp/login";
import Form from "./components/regester/register";
// import QuestionHubPage from "./components/test_component/hello69";
// import axios from "./components/axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {isTimeOver} from './Utils/utils';

function displayOnlyOnDesktop() {
  const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

  if(isMobile){
    return <div>Sorry, this website is only available on desktop devices.</div>
}
}


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [accessExpired, setAccessExpired] = useState(false);
  const [IsAccepted, setIsAccepted] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  // Check local storage for login status on initial load


  
  useEffect(() => {
    if(window.innerWidth <= 800)
      setShowMobileWarning(true)
    const userIsLoggedIn = localStorage.getItem('isLogin') === 'true';
    const contractAccept = localStorage.getItem('contractAccept') === 'true';
    // console.log("cecking ",userIsLoggedIn);

    setLoggedIn(userIsLoggedIn);
    setIsAccepted(contractAccept);

    setAccessExpired(isTimeOver());
  }, []);
  // }, [loggedIn,accessExpired]);


  // const handleLogout = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setLoggedIn(false);
  // };

  return (
   
    <>
  
  {showMobileWarning ? <Mobileview/>: 
    <BrowserRouter>
  
    <div>
      <div>
        <Navbar />
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>

        <Routes>
          <Route path="/" element={loggedIn  ? IsAccepted ? <Navigate to="/question" /> : <Navigate to="/instruction" /> : <Login />} />
          <Route path="/login" element={loggedIn  ? IsAccepted ? <Navigate to="/question" /> : <Navigate to="/instruction" /> : <Login />} />
          <Route path="/instruction" element={loggedIn && !accessExpired && !IsAccepted ?  <Instruct />  : loggedIn && IsAccepted ? <Navigate to="/question" /> : <Navigate to="/" />} />
          <Route path="/result" element={ loggedIn &&  !accessExpired ?<Result /> : <Navigate to="/login" />} />
          {/* <Route path="/result" element={ <Result />} /> */}
          <Route path="/question" element={loggedIn && !accessExpired ? <Quescards /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={<Leaderboard /> } />
          {/* <Route path="/submission" element={<Submission/>} /> */}
          <Route path="/question/:questionId" element={<Codingpage/>} />
          {/* <Route path="/test" element={<QuestionHubPage/>} /> */}
          <Route path="/register" element={ <Form />} />
        </Routes>
    
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    </BrowserRouter>
    }
    </>
  );
 
}

export default App;
