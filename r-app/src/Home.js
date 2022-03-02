import React, { useContext } from "react";
import app from "./base";
import { AuthContext } from "./context/Auth";

const Home = (props) => {
  const { currentUser } = useContext(AuthContext);
  console.log("currentUser:", currentUser);

  return (
    <div>
      <header>
        <div className={"flex justify-between items-center"}>
          <div>Thinkify</div>
          <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
      </header>
	  <main>
		  Put the search box
	  </main>
    </div>
  );
};

export default Home;
