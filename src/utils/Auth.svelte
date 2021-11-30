<script lang="ts">
  import App from "../App.svelte"
  import logo from "../assets/svelte.png";
  import { Auth0Context , Auth0LoginButton , Auth0LogoutButton , isAuthenticated }from '@dopry/svelte-auth0'
</script>
<Auth0Context domain = "dev-1y-8z7jp.us.auth0.com" client_id = "VHEXoqYdY67q81qIV5WrAQforzqOWLkh">
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
      <App />
    </main>
  {/if}
</Auth0Context>