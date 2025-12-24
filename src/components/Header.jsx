import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/GptSlice";
import { LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
import GptSearchBar from "./GptSearchBar";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // 🔥 get the user from Redux store
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");

        // User is signed out
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  const handleGptSeachClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div
      className="
    fixed top-0 left-0 w-full z-50
    h-20
    flex flex-wrap items-center justify-between
    px-8 md:px-16
    bg-black/90
  "
    >
      <img
        className="w-44 mx-auto md:mx-0"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />

      {user && (
        <div className="flex items-center gap-0 mr-6">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-500 text-white"
              onChange={handleLanguageChange}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-2 px-4 mx-6 my-4 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSeachClick}
          >
            {showGptSearch ? "HomePage" : "Gpt Search"}
          </button>
          <img
            className="w-12 rounded"
            alt="user-icon"
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
          />
          <button
            onClick={handleSignOut}
            className="text-white font-bold m-0 p-0"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
