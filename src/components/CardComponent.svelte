<script>
    export let usuarios;
  </script>
  
  {#each usuarios as usuario, index}
    <div key={index} class="card w-full bg-neutral text-neutral-content">
      <div class="card-body text-left">
        <h3>{usuario.competition}</h3>
        <p class="text-xl">{usuario.number} {usuario.match}</p>
        <div class="card-actions">
          <button class="btn btn-primary">Accept</button>
        </div>
      </div>
      <div class="divider"></div>
    </div>
  {/each}
  
  <style>
    /* Importa los estilos de Tailwind CSS */
    @import "tailwindcss/base";
    @import "tailwindcss/components";
    @import "tailwindcss/utilities";
  
    /* Estilos específicos para el componente de la tarjeta */
    .divider {
      @apply my-2;
    }
  </style>
  