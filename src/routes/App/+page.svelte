<script>
  // @ts-nocheck
  import Buttons from "../../components/AllButton.svelte";
  import Title from "../../components/Title.svelte";

  let usuarios = [];
  let isLoading = true;
  var data = [];

  import { writable } from "svelte/store";

  // Crear una store reactiva para 'now'
  const now = writable(Math.floor(Date.now() / 1000));
  let newnow = now - 300;
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
          const url13 = row.c[13]?.v || ""; // Asigna un valor predeterminado si es undefined
          const nameButton = row.c[13]?.v || ""; // Asigna un valor predeterminado si es undefined

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
            statics,
            url13,
            nameButton,
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

<div class="container">
  <main>
    <div class="card w-full bg-neutral text-neutral-content">
      <div class="card-body text-center">
        <Title />
      </div>
    </div>
    <ins class="01d94676" data-key="06204f8a1f807df4131aaa5bd8c90b39" data-cp-host="37097cad0d42436db1131930350b25c3|2|teclado-app-svelte.vercel.app"></ins>
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
      <!-- Sección de la lista de partidos -->
      <!-- Agrega una declaración reactiva que dependa de 'now' -->
      {#if usuarios[0].message != "null"}
      <div role="alert" class="alert alert-error">
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
        <!-- {#if usuarios[0].url13 != "null"}
          <a
            href={usuarios[0].url13}
            class="btn btn-success"
            draggable="false">{usuarios[1].nameButton}</a
          >
        {/if} -->
      </div>

      <div class="divider"></div>
    {/if}
      <!-- Sección de la lista de partidos -->
      {#each usuarios.slice(0) as usuario, index}
        <div key={index}>
          <div class="card w-full bg-neutral text-neutral-content">
            <div class="card-body text-left">
              <h3 class="b-1">{usuario.competition}</h3>
              <p class="text-xl b-1">
                {usuario.formattedTime}
                {usuario.match}
                {#if $now >= usuario.number - 600 && $now < new Date((usuario.number * 1000 + 2 * 60 * 60 * 1000) / 1000)}
                  <span class="indicator-item badge badge-live">En vivo</span>
                {:else if $now <= usuario.number}
                  <span class="indicator-item badge badge-primary"
                    >No empezó</span
                  >
                {:else}
                  <span class="indicator-item badge badge-secundary"
                    >Terminó</span
                  >
                {/if}
              </p>
              <div class="card-actions">
                <Buttons switchs={usuario.switchs} links={usuario.links} />
                <a
                  href={usuario.statics}
                  class="btn btn-primary"
                  draggable="false"><b>Estadísticas</b></a
                >
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
  .b-1 {
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
  .badge-live {
    --tw-border-opacity: 1;
    /* border-color: var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity))); */
    --tw-bg-opacity: 1;
    background-color: #cd2b2b;
    --tw-text-opacity: 1;
    color: #ffffff;
  }
  .gradient-title {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    background-image: linear-gradient(
      90deg,
      oklch(var(--s)) 4%,
      color-mix(in oklch, oklch(var(--s)), oklch(var(--er))) 22%,
      oklch(var(--p)) 45%,
      color-mix(in oklch, oklch(var(--p)), oklch(var(--a))) 67%,
      oklch(var(--a)) 100.2%
    );

    background-size: 600% 100%;
    animation: gradientAnimation 10s linear infinite;

    /* Add backdrop for blur effect */
    position: relative;
    filter: blur(15px);
    backdrop-filter: blur(15px);
  }

  .gradient-title2 {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(
      90deg,
      oklch(var(--s)) 4%,
      color-mix(in oklch, oklch(var(--s)), oklch(var(--er))) 22%,
      oklch(var(--p)) 45%,
      color-mix(in oklch, oklch(var(--p)), oklch(var(--a))) 67%,
      oklch(var(--a)) 100.2%
    );

    background-size: 600% 100%;
    animation: gradientAnimation 10s linear infinite;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Asegura que este elemento esté detrás del otro */
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }

    100% {
      background-position: 100% 50%;
    }
  }

  .relative {
    position: relative;
  }
</style>
