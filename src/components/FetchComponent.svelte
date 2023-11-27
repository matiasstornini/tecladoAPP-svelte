<script>
    export let usuarios;
    
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1uD_UtAaYl8lh7w_8VWRCnVi-Ugat-O_2V-puezenbdw/gviz/tq?tqx=out:json&sheet=Test"
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
  
            return { number, match, competition };
          });
        } else {
          console.error("Error al obtener usuarios.");
        }
      } catch (error) {
        console.error("Error al obtener usuarios.", error);
      }
    }
  
    // Llama a fetchUsers al cargar el componente
    import { onMount } from "svelte";
    onMount(fetchUsers);
  </script>
  