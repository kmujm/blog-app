import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
import Router from "./components/Router";
import { useState } from "react";

function App() {
  const auth = getAuth(app);
  // !! : 데이터를 boolean 타입으로 명시적 형변환을 위해 사용
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  console.log(auth);

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
