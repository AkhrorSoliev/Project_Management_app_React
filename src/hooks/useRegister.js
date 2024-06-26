// react hot toast
import { toast } from "react-hot-toast";

// react imports
import { useState } from "react";

// firebase config
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// contextAPI
import { useGlobalContext } from "./useGlobalContext";

function useRegister() {
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useGlobalContext();

  const register = async (displayName, url, email, password) => {
    setIsPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: url,
      });
      dispatch({ type: "LOGIN", payload: user });
      setUser(user);
      setIsPending(true);
      toast.success("Welcome");
    } catch (error) {
      setIsPending(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return { register, isPending };
}

export { useRegister };
