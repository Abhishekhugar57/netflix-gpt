import Header from "./header";
import { useRef, useState } from "react";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Browse from "./Browse";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignedInForm, SetIsSignedInForm] = useState(true);
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrMessage(message);
    if (message) return;
    if (!isSignedInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSiginIn = () => {
    SetIsSignedInForm(!isSignedInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover "
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d615dd28-a1ac-4a03-995a-022d24e7b367/web/IN-en-20251124-TRIFECTA-perspective_263f0625-557f-436a-9d4f-b93224d2d6d2_medium.jpg"
          alt="bgd"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignedInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedInForm && (
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-4 w-full bg-gray-700 rounded"
        />
        <p className="text-red-500 font-bold text-g py-2">{errMessage}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleButtonClick}
            className="p-4 my-6 bg-red-600 hover:bg-red-700 font-semibold w-full rounded-lg"
          >
            {isSignedInForm ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <p className="py-4 cursor-pointer" onClick={toggleSiginIn}>
          {isSignedInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered?Sign In Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
