<!-- Reproductor.svelte -->

<script>
    import { onMount } from 'svelte';
    import Hls from 'hls.js';  // Importa la biblioteca hls.js
  
    onMount(() => {
      const valores = window.location.search;
      const urlParams = new URLSearchParams(valores);
      const get = urlParams.get('get');
  
      if (Hls.isSupported()) {
        const videoElement = document.getElementById('videoElement');
        const hls = new Hls();
  
        // Cargar el archivo m3u8
        hls.loadSource(get);
        hls.attachMedia(videoElement);
  
        // Reproducir el video
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoElement.play();
        });
      }
    });
</script>

<style>
    #videoContainer {
      max-width: 100%;
    }
</style>

<div id="videoContainer">
    <video id="videoElement" controls autoplay></video>
</div>
