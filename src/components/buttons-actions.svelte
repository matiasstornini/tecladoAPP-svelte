<!-- Buttons.svelte -->
<script>
    import { createEventDispatcher } from "svelte";
    
    export let link = ""; // Parámetro para el enlace
    const dispatch = createEventDispatcher();
    
    // Función para manejar el clic en el botón
    function handleClick() {
      dispatch("buttonClick", { link });
    }
  </script>
  
    <a on:click={handleClick} href={link} class="btn btn-primary" draggable="false">Abrir</a>
    <!-- Puedes seguir la misma estructura para los otros botones -->
