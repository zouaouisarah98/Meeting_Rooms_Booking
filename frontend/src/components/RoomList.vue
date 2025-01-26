<template>
  <div>
    <h1>Liste des salles</h1>
    <ul v-if="rooms.length > 0">
      <li v-for="room in rooms" :key="room.name">
        {{ room.name }} - Capacité : {{ room.capacity }}
      </li>
    </ul>
    <p v-else>Chargement des salles...</p>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";

const rooms = ref([])

async function get_rooms() {

  let url = 'http://localhost:3000/api/salles';

  try {

    axios.get(url)

        .then(function (response) {
          rooms.value = response.data
        })

  } catch (error) {
    console.error('Erreur lors de la récupération des salles :', error);
  }


}

onMounted(() => {
  get_rooms();
});
</script>
<style scoped>

</style>