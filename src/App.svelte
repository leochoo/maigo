<link rel="stylesheet" href="src/styles.css">

<script lang="ts">
  import { onMount, setContext, getContext } from "svelte";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { Loader } from "@googlemaps/js-api-loader";
  import Main from "./components/Main.svelte";
  import Auth from "./components/Auth.svelte";
  import { currentUser } from "./store";
  import { Router, Link, Route } from "svelte-routing";

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
  <main>
    <div class="main">
      {#if $currentUser.isLoggedIn}
        <Main />
      {:else}
        <h1>MaiGO</h1>
        <Auth />
      {/if}
    </div>
    <!-- <Route path="upload" component={Upload} /> -->
    <!-- <Route path="charts" component={Charts} /> -->
    <!-- <Route path="login" component={Login} /> -->
  </main>
</Router>

<style>
  :root { 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    /* Fullscreen background code */
    background: url(src/assets/earthFromSpace.jpeg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    /*scrolling background code */
    /* background: url("src/assets/panoramic_background.jpeg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover; */
    /* animation: slide 60s linear infinite; */
  }
  .main {
    /* display: flex; */
    flex-direction: column;
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    padding-top: 3em;
  }
  img {
    justify-content: center;
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


  @keyframes slide{
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-1692px, 0, 0);
    }
  }
</style>
