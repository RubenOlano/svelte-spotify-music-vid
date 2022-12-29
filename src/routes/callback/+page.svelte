<script lang="ts">
  import { onMount } from 'svelte';

  let code_from_url: string;

  onMount(() => {
    code_from_url = new URL(window.location.href).searchParams.get('code') || '';
  });

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code_from_url);
    buttonText = 'Copied!';
    setTimeout(() => {
      // force close the window
      window.close();
    }, 500);
  };

  $: buttonText = 'Copy code to clipboard';
</script>

<div class="flex flex-col items-center justify-center min-h-screen py-2 text-center">
  {#if !code_from_url}
    <p class="text-center text-white">Something went wrong</p>
  {:else}
    <p class="text-center text-white">Success</p>
    <button
      on:click={copyCodeToClipboard}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-200"
      >{buttonText}</button
    >
  {/if}
</div>
