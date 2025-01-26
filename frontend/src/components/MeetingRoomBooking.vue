<template>
  <div class="container-fluid">
    <h3>I book a meeting room</h3>

    <div class="form-container">
      <div class="form-group">
        <input v-model="date" type="date" class="input" required/>
      </div>
      <div class="form-group">
        <input v-model="time" type="time" class="input" required/>
      </div>
      <div class="form-group">
        <button type="button" @click="searchRooms" class="btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>

    <div>
      <h1>Liste des salles</h1>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          {{ room.name }}
          <button @click="reserveRoom(room.id)">Réserver</button>
        </li>
      </ul>
      <p v-if="rooms.length === 0">Aucune salle disponible pour le moment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {BookingRoom} from "../store/roomStore.ts";

const store = BookingRoom();
const rooms = computed(() => store.rooms);
const date = ref();
const time = ref();

const successMessage = ref('');
const errorMessage = ref('');

const searchRooms = () => {
  try {
    store.fetchRooms(date.value, time.value);
  } catch (err) {
    console.error('Error during fetchRooms:', err);
  }
};

const reserveRoom = async (id: number) => {

  try {
    await store.reserveRoom(id, date.value, time.value);
    successMessage.value = "Réservation réussie !";
    searchRooms(); // Refresh the list of rooms
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2em;
}

.form-group {
  flex: 1;
  margin-right: 1em;
}

.input {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #091667;
  border-radius: 4px;
  font-size: 1.2em;
}

.btn {
  padding: 0.6em 1.2em;
  background-color: #091667;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #79b2f1;
}
</style>
