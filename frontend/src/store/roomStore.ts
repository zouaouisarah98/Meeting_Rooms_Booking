import {defineStore} from 'pinia'
import axios from 'axios'
import {ref} from 'vue'


export const BookingRoom = defineStore('RoomStore',
    () => {


        const rooms = ref([])
        const error = ref(null);
        // const startTime = ref('')
        // const endTime = ref('')

        const fetchRooms = async (date: Date, startTime: string, endTime: string) => {
            // console.log("fetchRooms called with:", date, time);

            let url = 'http://localhost:3000/api/booked';

            try {
                await axios.get(url,
                    {params: {date, startTime, endTime}})
                    .then(function (salleResponse) {
                        const allRooms = salleResponse.data.availableRooms; // Liste de toutes les salles
                        console.log(allRooms)

                        // Créer un index virtuel en ajoutant un id temporaire
                        const allRoomsWithId = allRooms.map((room, index) => ({
                            ...room,
                            id: index + 1 // Création d'un index virtuel basé sur l'ordre des éléments
                        }));
                        console.log("API Response:", allRoomsWithId);
                        rooms.value = allRoomsWithId
                    })
            } catch (err) {
                console.log("Error:", err);
                error.value = err.response?.data?.error || 'Failed to fetch rooms';
            }
        }

        const reserveRoom = async (id: number, date: Date, startTime: string, endTime: string) => {
            // console.log("reserved:", date, time, id);

            let url = 'http://localhost:3000/api/reservations';
            try {
                await axios.post(url, {id, date, startTime, endTime})
                    .then(function (response) {
                        console.log("API Reservation:", response.data);
                        rooms.value = response.data
                    })
            } catch (err) {
                throw new Error(err.response?.data?.error || 'Failed to reserve room');
            }
        };
        return {rooms, fetchRooms, reserveRoom}  //findRoom


    }
)
