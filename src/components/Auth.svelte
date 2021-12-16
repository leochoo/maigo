<script lang="ts">
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { db } from "../../firebase";
  import {
    collection,
    addDoc,
    query,
    where,
    getDoc,
    updateDoc,
    doc,
    setDoc,
  } from "firebase/firestore";

  async function addUser(user) {
    const userRef = await setDoc(doc(db, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
        const user = result.user;

        // add user data to users collection
        addUser(user);
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
    src="../src/assets/btn_google_signin_dark_normal_web@2x.png"
    onmouseover="this.src='../src/assets/btn_google_signin_dark_focus_web@2x.png'"
    onmouseout="this.src='../src/assets/btn_google_signin_dark_normal_web@2x.png'"
    alt="Google Login"
    id="glogin"
  />
</main>

<style>
</style>
