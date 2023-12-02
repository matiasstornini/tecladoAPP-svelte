<script>
  export let text = "TecladoAPP";
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md flex items-center justify-between">
      <div class="relative">
        <h1 class="gradient-title2 absolute top-0 left-0 w-full h-full">{text}</h1>
        <h1 class="gradient-title">{text}</h1>
      </div>

    </div>

  </div>
</div>

<style>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";

  /* Importa tu fuente personalizada si no es de Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');


  h1 {
    @apply text-4xl font-bold mb-4;
    font-family: 'Bebas Neue', sans-serif;
  }

  .follow-section {
    @apply flex items-center;
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
