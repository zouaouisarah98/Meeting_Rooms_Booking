<!-- Calendar.vue -->
<template>
  <div class="calendar-container">
    <FullCalendar
      :options="calendarOptions"
      @dateClick="handleDateClick"
      @eventClick="handleEventClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed ,onMounted} from 'vue';
import { BookingRoom } from '../store/roomStore.ts';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const store = BookingRoom();
const reservations = computed(() => store.reservations);

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'timeGridWeek',
  events: reservations.value.map(reservation => ({
    title: `Room ${reservation.roomName}`, // Titre de la réservation
    start: `${reservation.date}T${reservation.startTime}`, // Date et heure de début
    end: `${reservation.date}T${reservation.endTime}`, // Date et heure de fin
    description: `Reserved by User`,
    backgroundColor: 'red', // Colorier en rouge les événements réservés
    borderColor: 'red',
  })),
  dateClick(info) {
    console.log('Date clicked: ', info.dateStr);
  },
  eventClick(info) {
    console.log('Event clicked: ', info.event.title);
  }
}));


const handleDateClick = (info) => {
  console.log('Date clicked: ', info.dateStr);
};

const handleEventClick = (info) => {
  console.log('Event clicked: ', info.event.title);
};

onMounted(async () => {
  await store.fetchReservations();
});

</script>

<style scoped>
.calendar-container {
  width: 80%;
  margin: 1em;
  height: 10em;
}
</style>
