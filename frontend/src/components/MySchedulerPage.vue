<template>
  <div class="calendar-container">
    <h2>Meeting Room Schedule</h2>
    <FullCalendar
        class='demo-app-calendar'
        :options="calendarOptions"
    />
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted } from 'vue';
import { BookingRoom } from '../store/roomStore.ts';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

// Définition des types pour une réservation
interface Reservation {
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
}

// Initialisation du store BookingRoom
const store = BookingRoom();

// récuperation des  réservations provenant du store
const reservations = computed<Reservation[]>(() => store.reservations);


// Personnalisation des options du calendrier
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  editable: true,
  weekends: false,
  events: reservations.value.map((reservation) => ({
    title: `${reservation.roomName}`, // Titre de l'événement
    start: `${reservation.date}T${reservation.startTime}`, // Date et heure de début
    end: `${reservation.date}T${reservation.endTime}`, // Date et heure de fin
    backgroundColor: 'red', // Couleur personnalisée
    borderColor: 'red',
  })),
}));



// Chargement des réservations au montage du composant
onMounted(async () => {
  await store.fetchReservations();
});
</script>

<style scoped>
.demo-app-calendar {
  height: 53em;
  margin: 1em;
  flex-grow: 1;
  padding: 1em;
}
</style>
