import { app, db } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Router from "./components/Router";
import { useContext, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";
import ThemeContext from "context/ThemeContext";

function App() {
  const context = useContext(ThemeContext);
  const auth = getAuth(app);

  // auth를 체크하기 전에(initalize 전) loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);
  // !! : 데이터를 boolean 타입으로 명시적 형변환을 위해 사용
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <div className={context.theme === "light" ? "white" : "dark"}>
        <ToastContainer />
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </div>
    </>
  );
}

export default App;
