<script>
  // @ts-nocheck
  import Buttons from "../../components/AllButton.svelte";
  import Title from "../../components/Title.svelte";

  let usuarios = [];
  let isLoading = true;

  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1uD_UtAaYl8lh7w_8VWRCnVi-Ugat-O_2V-puezenbdw/gviz/tq?tqx=out:json&sheet=Admin"
      );
      if (response.ok) {
        const textData = await response.text();
        const jsonString = textData.match(
          /google.visualization.Query.setResponse\((.*?)\);/
        )[1];
        const jsonData = JSON.parse(jsonString);

        const parsedData = jsonData.table.rows;
        usuarios = parsedData.map((row) => {
          const number = row.c[0].v;
          const match = row.c[1].v;
          const competition = row.c[2].v;
          const statics = row.c[3].v;
          const switchs = row.c[4].v;
          const link = row.c[5].v;
          const link2 = row.c[6].v;
          const link3 = row.c[7].v;
          const message = row.c[11]?.v || ""; // Asigna un valor predeterminado si es undefined

          // Convertir timestamp a HH:MM
          const date = new Date(row.c[0].v * 1000);
          const hours = "0" + date.getHours();
          const minutes = "0" + date.getMinutes();
          const formattedTime = hours.substr(-2) + ":" + minutes.substr(-2);

          return {
            number,
            match,
            competition,
            switchs,
            links: [link, link2, link3],
            formattedTime,
            message,
            statics
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
  import { onMount } from "svelte";
  onMount(fetchUsers);
  
</script>

<div class="container">
  <main>
    <div class="card w-full bg-neutral text-neutral-content">
      <div class="card-body text-center">
        <Title />

      </div>
    </div>
    <div class="divider"></div>

    {#if isLoading}
      <!-- Muestra el esqueleto mientras se cargan los datos -->
      <div class="card w-full bg-neutral text-neutral-content">
        <div class="card-body text-left">
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div class="divider"></div>
    {:else}
      {#if usuarios.length > 0}
        <div role="alert" class="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path></svg
          >
          <span>{usuarios[0].message}</span>
        </div>
        <div class="divider"></div>
      {/if}
      <!-- ... -->
      {#each usuarios.slice(0) as usuario, index}
        <div key={index}>
          <div class="card w-full bg-neutral text-neutral-content">
            <div class="card-body text-left">
              <h3 class="b-1">{usuario.competition}</h3>
              <p class="text-xl b-1">{usuario.formattedTime} {usuario.match}</p>
              <div class="card-actions">
                <Buttons switchs={usuario.switchs} links={usuario.links} />
                <a href={usuario.statics} class="btn btn-primary"><b>Estadisticas</b></a>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
      {/each}
    {/if}
  </main>
</div>

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
