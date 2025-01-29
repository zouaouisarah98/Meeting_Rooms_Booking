import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

// Définition des types pour une salle et une réservation
interface Room {
  id: number;
  name: string;
  [key: string]: any; // pour autoriser d'autres propriétés non spécifiées
}

interface Reservation {
  id: number;
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const BookingRoom = defineStore('RoomStore', () => {
  // Déclarations des références
  const rooms = ref<Room[]>([]);
  const reservations = ref<Reservation[]>([]);
  const error = ref<string | null>(null);

  // fonction de récupération des salles disponibles
  const fetchRooms = async (date: string, startTime: string, endTime: string): Promise<void> => {
    const url = 'http://localhost:3000/api/booked';
    try {
      const response = await axios.get(url, {
        params: { date, startTime, endTime }
      });
      const allRooms: Room[] = response.data.availableRooms;
      rooms.value = allRooms;
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to fetch rooms';
    }
  };

  // fonction de récupération des réservations
  const fetchReservations = async (): Promise<void> => {
    const url = 'http://localhost:3000/api/reservations';
    try {
      const response = await axios.get(url);
      reservations.value = response.data;
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  // fonction de réservation d'une salle
  const reserveRoom = async (id: number, date: string, startTime: string, endTime: string): Promise<void> => {
    const url = 'http://localhost:3000/api/reservations';
    try {
      const room = rooms.value.find(r => r.id === id);
      const roomName = room ? room.name : 'Unknown Room';
      await axios.post(url, { id, date, startTime, endTime, roomName });
      fetchRooms(date, startTime, endTime); // Rafraîchir les salles disponibles
      fetchReservations(); // Rafraîchir les réservations
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to reserve room');
    }
  };

  return { rooms, reservations, fetchRooms, fetchReservations, reserveRoom, error };
});
