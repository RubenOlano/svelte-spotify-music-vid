<script lang="ts">
  import { started } from '../stores/vidStore';

  export let ws: WebSocket;
  export let codeLink: string;
  let code = '';
  let submitted = false;
  const handleSubmit = () => {
    ws.send(code);
    codeLink = '';
    submitted = true;
    started.set(true);
  };
</script>

<h1 class="text-3xl text-center text-green-500 font-bold mb-4">Welcome to the Spotify Party!</h1>
<p class="text-center text-white">Please authorize the app to use your spotify account</p>

{#if !submitted}
  <div class="w-60 flex justify-center align-middle">
    <a target="_blank" rel="noreferrer" href={codeLink}>
      <div
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out m-2"
      >
        Authorize
      </div>
    </a>
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      class=" border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm focus:outline-none"
      type="text"
      bind:value={code}
    />
    <button
      type="submit"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
      >Submit</button
    >
  </form>
{:else}
  <div class="text-green text-center text-white">Submitted!</div>
  <p class="text-center text-white">Fetching currently playing song</p>
  <p class="text-center text-white">Make sure your spotify player is currently playing a song</p>
{/if}
