<script lang="ts">
  import { onMount, setContext, getContext } from "svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { Loader } from "@googlemaps/js-api-loader";

  import Main from "./components/Main.svelte";
  import Auth from "./components/Auth.svelte";
  import { currentUser } from "./store";
  import { Router } from "svelte-routing";
  import logo from "./assets/svelte.png";
  import backgroundPhoto from "./assets/earthFromSpace.jpeg";
  
  //:root css
  document.documentElement.style.setProperty('background', `url(${backgroundPhoto})`);
  document.documentElement.style.setProperty('-webkit-background-size', 'cover');
  document.documentElement.style.setProperty('-moz-background-size', 'cover');
  document.documentElement.style.setProperty('background-size', 'cover');
  document.documentElement.style.setProperty('font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif');

  
  const loader = new Loader({
    // Don't use this api key below unless you need it
    // apiKey: import.meta.env.VITE_MAPS_JS_API as string,
    apiKey: "",
    language: "ja",
  });
  setContext("loader", loader);
  const auth = getAuth();
  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser.set({
          isLoggedIn: true,
          user: user,
        });
      } else {
        currentUser.set({
          isLoggedIn: false,
          user: null,
        });
      }
    });
  });
</script>

<Router>
  <!-- <div style="background-image: url({backgroundPhoto})"> -->
  <main>
    <div class="main">
      {#if $currentUser.isLoggedIn}
        <Main />
      {:else}
        <img src={logo} alt="Svelte Logo" />
        <h1>MaiGO</h1>
        <Auth />
      {/if}
    </div>
    <!-- <Route path="upload" component={Upload} /> -->
    <!-- <Route path="charts" component={Charts} /> -->
    <!-- <Route path="login" component={Login} /> -->
  </main>
  <!-- </div> -->
</Router>

<style>
  .main {
    /* display: flex; */
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    padding-top: 3em;
  }
  img {
    left: calc(50% - 8rem);
    height: 16rem;
    width: 16rem;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
  button {
    z-index: 1;
    background-color: whitesmoke;
    border: none;
    color: black;
    padding: 5px 10px;
    margin: 0.5em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
  }
  button:hover {
    background: lightcyan;
  }
  button:active {
    background: grey;
  }
</style>
