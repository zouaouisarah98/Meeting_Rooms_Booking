import { setActivePinia, createPinia } from 'pinia';
import { BookingRoom } from '../../src/store/roomStore';
import axios from 'axios';

// Mocker axios pour simuler les appels HTTP dans les tests.
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;



// Suite de tests dédiée à la gestion du store des salles.
describe('RoomStore', () => {
  let store: ReturnType<typeof BookingRoom>;

// initialisation de Pinia et du store.
  beforeEach(() => {
    setActivePinia(createPinia());
    store = BookingRoom();
  });

// Test pour vérifier la récupération des salles disponibles.
  it('devrait récupérer les salles disponibles', async () => {
    mockedAxios.get.mockResolvedValue({ data: { availableRooms: [{ id: 1, name: 'Salle A' }] } });

    await store.fetchRooms('2025-01-30', '10:00', '12:00');

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/booked', { params: { date: '2025-01-30', startTime: '10:00', endTime: '12:00' } });  // Vérifie si l'appel API a été effectué avec les bons paramètres.
    expect(store.rooms).toEqual([{ id: 1, name: 'Salle A' }]);  // Vérifie que les salles récupérées sont correctement assignées au store.
  });

  // Test pour vérifier la récupération des réservations.
  it('devrait récupérer les réservations', async () => {
    mockedAxios.get.mockResolvedValue({ data: [{ id: 1, roomName: 'Salle A', date: '2025-01-30' }] });

    await store.fetchReservations();

    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/reservations');
    expect(store.reservations).toEqual([{ id: 1, roomName: 'Salle A', date: '2025-01-30' }]);
  });

   // Test pour vérifier le processus de réservation d'une salle.
  it('devrait réserver une salle', async () => {
    mockedAxios.post.mockResolvedValue({});

    store.rooms = [{ id: 1, name: 'Salle A' }];  // Simuler que la salle est disponible dans le store.
    await store.reserveRoom(1, '2025-01-30', '10:00', '12:00');

    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/api/reservations', { id: 1, date: '2025-01-30', startTime: '10:00', endTime: '12:00', roomName: 'Salle A' });
  });
});