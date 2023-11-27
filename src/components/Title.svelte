<!-- Title.svelte -->
<script>
  export let text = "Tu texto aquí";
</script>

<h1 class="gradient-title">{text}</h1>

<style>
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
  .gradient-title {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(
      60deg,
      #f79533,
      #f37055,
      #ef4e7b,
      #a166ab,
      #5073b8,
      #1098ad,
      #07b39b,
      #6fba82
    );

    background-size: 600% 100%;
    animation: gradientAnimation 10s linear infinite;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  h1 {
    @apply text-4xl font-bold mb-4;
  }
</style>
