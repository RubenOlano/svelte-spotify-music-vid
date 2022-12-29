<script lang="ts">
  import SpotifyAuth from '../components/spotifyAuth.svelte';
  import { onMount } from 'svelte';
  import Player from '../components/player.svelte';
  import { started, vidQueue } from '../stores/vidStore';
  let ws: WebSocket;
  let playing = $started;
  let code_link = '';

  onMount(() => {
    ws = new WebSocket('ws://localhost:8080/ws');
    ws.addEventListener('message', handleMessage);

    return () => ws.close();
  });

  const handleMessage = (message: MessageEvent) => {
    const data = message.data;
    if (!data) return;
    if (isVid(data)) vidQueue.update((queue) => [...queue, data]);
    else code_link = data;
  };

  const isVid = (link: string): boolean => {
    return !link.includes('spotify');
  };
</script>

<div class="flex flex-col items-center justify-center min-h-screen py-2 text-center">
  {#if playing}
    <Player />
  {:else}
    <SpotifyAuth {ws} codeLink={code_link} />
  {/if}
</div>
