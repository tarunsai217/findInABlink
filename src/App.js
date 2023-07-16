import "./App.css";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import logo from "./Assets/logop.png";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  const handleOnClickHandler = () => {
    if (user) {
      logOut();
    } else {
      login();
    }
  };

  console.log("user", user, profile);
  return (
    <div className="bg-[#1D1D1D] h-[100vh] text-white flex flex-col">
      <header className="bg-[#1E1E1E] flex justify-between ml-24 mr-24 py-4">
        <ul className="ml-0 flex items-center">
          <li className="font-[700] text-2xl cursor-pointer">𝕗𝕚𝕟𝕕𝕀𝕟𝔸𝔹𝕝𝕚𝕟𝕜</li>
        </ul>
        <ul className="ml-0 flex ">
          <li className="flex items-center hidden">
            <button className="text-[#A8A196] hover:text-white hover:text-xl font-[700] text-lg  mr-6 cursor-pointer">
              Sign up
            </button>
          </li>
          <li>
            <button
              onClick={handleOnClickHandler}
              className="bg-white text-black hover:bg-[#EEEEEE] font-[700] transform hover:scale-110 rounded-2xl px-8 py-2 cursor-pointer"
            >
              {user ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </header>
      <main className="flex justify-center items-center mr-40 ml-40 height-auto flex-1 mb-28 ">
        <section className="w-[50%]">
          <h2 className="text-6xl mb-6 gradient-text">
            Rediscover Lost Possessions Swiftly - FindInABlink, Your Local-First
            App!
          </h2>
          <p className="text-xl text-[#A8A196] font-[600]">
            FindInABlink - Where lost items find their way home. Our
            compassionate community and smart search tools make the process
            seamless. Reclaim what's yours swiftly and rediscover peace of mind
            today!
          </p>
        </section>
        <section className="w-[50%] flex justify-center items-center">
          {/* <img
            width="350"
            height="500"
            src="https://img.icons8.com/3d-fluency/94/lightning-bolt.png"
            alt="lightning-bolt"
          /> */}
          <img className="w-[350px] h-[500px]" src={logo} />
        </section>
      </main>
    </div>
  );
}

export default App;
