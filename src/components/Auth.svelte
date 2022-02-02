<script lang="ts" context="module">
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo,
    UserInfo,
  } from "firebase/auth";
  import { db } from "../../firebase";
  import { doc, setDoc, updateDoc } from "firebase/firestore";
  import GoogleLoginButton from "../../public/btn_google_signin_dark_normal_web@2x.png";

  /*
      Update user's updatedAt or create user doc if it doesn't exist
   */
  export async function setUser(user: UserInfo, isFirstLogin: boolean) {
    const userRef = doc(db, "users", user.uid);
    if (isFirstLogin) {
      await setDoc(userRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      await updateDoc(userRef, {
        updatedAt: new Date(),
      });
    }
  }

  async function googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user: UserInfo = result.user;
        // add user data to users collection
        setUser(user, getAdditionalUserInfo(result).isNewUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>

<main>
  <img
    on:click={() => {
      googleLogin();
    }}
    src={GoogleLoginButton}
    alt="Google Login"
    id="glogin"
  />
</main>

<style>
</style>
