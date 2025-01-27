import {defineStore} from 'pinia';
import axios from 'axios';
import {ref} from 'vue';

export const BookingRoom = defineStore('RoomStore', () => {
    const rooms = ref([]);
    const reservations = ref([]); // Ajouter un tableau pour stocker les réservations
    const error = ref(null);

    const fetchRooms = async (date: string, startTime: string, endTime: string) => {
        let url = 'http://localhost:3000/api/booked';
        try {
            const response = await axios.get(url, {
                params: {date, startTime, endTime}
            });
            const allRooms = response.data.availableRooms;
            rooms.value = allRooms;
        } catch (err) {
            error.value = err.response?.data?.error || 'Failed to fetch rooms';
        }
    };

    const fetchReservations = async () => {
        let url = 'http://localhost:3000/api/reservations';
        try {
            const response = await axios.get(url);
            reservations.value = response.data;
        } catch (err) {
            console.error('Error fetching reservations:', err);
        }
    };

    const reserveRoom = async (id: number, date: string, startTime: string, endTime: string) => {
        let url = 'http://localhost:3000/api/reservations';
        try {

            const room = rooms.value.find(r => r.id === id);
            const roomName = room ? room.name : 'Unknown Room';
            await axios.post(url, {id, date, startTime, endTime,roomName});
            fetchRooms(date, startTime, endTime); // Rafraîchir les salles disponibles
            fetchReservations(); // Rafraîchir les réservations
        } catch (err) {
            throw new Error(err.response?.data?.error || 'Failed to reserve room');
        }
    };

    return {rooms, reservations, fetchRooms, fetchReservations, reserveRoom};
});
