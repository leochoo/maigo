<script lang="ts">
  import logo from "./assets/svelte.png";
  import Map from "./Map.svelte";
  import StreetView from "./StreetView.svelte";
  import { Loader } from "@googlemaps/js-api-loader";
  import { onMount, setContext, getContext } from "svelte";
  import { Auth0Context , Auth0LoginButton , Auth0LogoutButton , isAuthenticated }from '@dopry/svelte-auth0'
  const loader = new Loader({
    // Don't use this api key below unless you need it
    // apiKey: import.meta.env.VITE_MAPS_JS_API as string,
    apiKey: "",
  });
  console.log("main loader", loader);
  setContext("loader", loader);
</script>
<Auth0Context domain = "dev-1y-8z7jp.us.auth0.com" client_id = "ACQsQAQJYGAWlTfp0Cs6tHOxCtbM7Tvv">
  {#if $isAuthenticated == false}
  <main>
    <h1>Welcome to Maigo</h1>
    <img src={logo} alt="Svelte Logo" />
    <h2>Please log in to continue</h2>
    <Auth0LoginButton class = 'btn'>Login</Auth0LoginButton>
  </main>
    <style>
      :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }

      main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
      }

      img {
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

      p {
        max-width: 14rem;
        margin: 1rem auto;
        line-height: 1.35;
      }

      @media (min-width: 480px) {
        h1 {
          max-width: none;
        }

        p {
          max-width: none;
        }
      }
    </style>
    {:else}
    <Auth0LogoutButton class = 'btn'>Logout</Auth0LogoutButton>
    <main>
      <img src={logo} alt="Svelte Logo" />
      <h1>MaiGO</h1>
    
      <div class="streetview"><StreetView /></div>
      <div class="map2d"><Map /></div>
      <p>A GeoGeussr Clone for Multiplayer Online</p>
      <p>HHLAB is a group of students from Keio University, Japan.</p>
    </main>
    
    <style>
      :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      .map2d {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
      }
      main {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 1em;
        margin: 0 auto;
      }
      img {
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
      p {
        max-width: 14rem;
        margin: 1rem auto;
        line-height: 1.35;
      }
      @media (min-width: 480px) {
        h1 {
          max-width: none;
        }
        p {
          max-width: none;
        }
      }
    </style>
  {/if}
</Auth0Context>