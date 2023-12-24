<script>
  // @ts-nocheck
  import Buttons from "../../components/AllButton.svelte";
  import Title from "../../components/Title.svelte";

  let matches  = [];
  let isLoading = true;

  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1JnXdzWbSuqSApMi6P42lEznPo7led8vIKECdMFR_3IY/gviz/tq?tqx=out:json&sheet=Partido2"
      );
      if (response.ok) {
        const textData = await response.text();
        const jsonString = textData.match(
          /google.visualization.Query.setResponse\((.*?)\);/
        )[1];
        const jsonData = JSON.parse(jsonString);

        const parsedData = jsonData.table.rows;
        matches  = parsedData.map((row) => {
          const Team1 = row.c[0]?.v || '';
  const Medio = row.c[1]?.v || '';
  const Team2 = row.c[2]?.v || '';

          return {
            Team1,
            Medio,
            Team2,

          };
        });

        // Después de cargar los datos, establecer isLoading en falso
        isLoading = false;
      } else {
        console.error("Error al obtener usuarios.");
      }
    } catch (error) {
      console.error("Error al obtener usuarios.", error);
    }
  }


  // Llama a fetchUsers al cargar la página
  import { onMount, onDestroy } from "svelte";
  onMount(fetchUsers);

  // Actualiza automáticamente los datos cada 5 minutos
  const intervalId = setInterval(fetchUsers, 5 * 60 * 1000);

  // Limpiar el intervalo al destruir el componente (evitar fugas de memoria)
  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

{#if isLoading}
  <p>Cargando...</p>
{:else}
  {#each matches as match, index}
    <div class="match-container" key={index}>
      <div class="stats shadow">
        <div class="stat place-items-center">
          <div class="stat-title">Equipo Local</div>
          <div class="stat-value">{match.Team1}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Medio</div>
          <div class="stat-value text-secondary">{match.Medio}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Equipo Visitante</div>
          <div class="stat-value">{match.Team2}</div>
        </div>
      </div>
    </div>
  {/each}
{/if}


<style>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
/* Agrega este estilo para ocultar el enlace en dispositivos móviles */
.btn {
  /* Añade otros estilos según sea necesario */
  touch-action: manipulation; /* Evita el resaltado del enlace y el arrastre en dispositivos táctiles */
  user-select: none; /* Evita la selección del texto al hacer clic en el enlace */
}

  .container {
    @apply mx-auto p-4;
  }
  .b-1{
    color: #fff;
  }
  main {
    @apply text-center;
  }

  h1 {
    @apply text-4xl font-bold mb-4;
  }

  li {
    @apply mb-2 bg-white rounded-md shadow-md p-4;
  }
</style>
