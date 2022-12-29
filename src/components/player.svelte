<script lang="ts">
  import { vidQueue } from '../stores/vidStore';

  let queue: string[] = [];

  vidQueue.subscribe((q) => {
    queue = q;
  });

  const nextVid = () => {
    if (queue.length > 1) {
      vidQueue.update((q) => {
        q.shift();
        return q;
      });
      return true;
    }
    return false;
  };

  $: latest_link = queue[0];
</script>

<div class="flex flex-col items-center justify-center min-h-screen py-2 text-center">
  <div class="flex justify-between w-full px-4 py-2 mb-4 bg-gray-800 rounded-t-lg">
    <h1 class="text-3xl font-bold text-white">Latest video</h1>
    {#if queue.length > 1}
      <button class="px-4 py-2 text-white bg-gray-600 rounded-lg" on:click={nextVid}>
        Next video
      </button>
    {/if}
  </div>
  <iframe
    width="560"
    height="315"
    src={latest_link}
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    on:ended={nextVid}
  />
</div>
