const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors')
const PORT = 3000;

app.use(express.json())
app.use(cors());

const roomsUrl = 'salles.json';
const bookedUrl = 'booked.json';

const loadJSON = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([])); // Crée un fichier vide avec un tableau par défaut
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return data ? JSON.parse(data) : []; // Retourne un tableau vide si le fichier est vide
    } catch (error) {
        console.error(`Error loading JSON from ${filePath}:`, error);
        return [];
    }
};

// Charger les données des salles et des réservations
const reservations = loadJSON(bookedUrl); // Charger les réservations
const rooms = loadJSON(roomsUrl); // Charger les salles
const saveJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


app.get('/api/salles', (req, res) => {
    try {
        const data = loadJSON(roomsUrl);
        res.status(200).json(data.rooms); // Retourne uniquement les salles
    } catch (error) {
        res.status(500).send('Erreur lors de la lecture des données');
    }

});

const isOverlapping = (start1, end1, start2, end2) => {
  const [startHour1, startMinute1] = start1.split(':').map(Number);
  const [endHour1, endMinute1] = end1.split(':').map(Number);
  const [startHour2, startMinute2] = start2.split(':').map(Number);
  const [endHour2, endMinute2] = end2.split(':').map(Number);

  const start1Minutes = startHour1 * 60 + startMinute1;
  const end1Minutes = endHour1 * 60 + endMinute1;
  const start2Minutes = startHour2 * 60 + startMinute2;
  const end2Minutes = endHour2 * 60 + endMinute2;

  return start1Minutes < end2Minutes && start2Minutes < end1Minutes;
};

app.get('/api/booked', (req, res) => {
    const {date, startTime, endTime} = req.query;
    // console.log('Request received:', {date, time});
    const data = rooms.rooms

    if (!date || !startTime || !endTime) {
        return res.status(400).json({error: 'Date and time are required'});
    }

    const unavailableRooms = reservations
        .filter((r) => r.date === date && isOverlapping(r.startTime, r.endTime, startTime, endTime))
        .map((r) => r.roomId);

    // Créer un index virtuel dans la liste des salles
    const availableRooms = data.map((room, index) => ({
        ...room,
        id: index + 1,  // Ajouter un identifiant virtuel
    })).filter((room) => !unavailableRooms.includes(room.id)); // Vérifier la disponibilité

    res.status(200).json({availableRooms});
});


// Reserve a room
app.post('/api/reservations', (req, res) => {

    const {id, date, startTime, endTime} = req.body;

    if (!id || !date || !startTime || !endTime) {
        return res.status(400).json({error: 'Room ID, date, and time are required'});
    }

    const isRoomAvailable = !reservations.some(
        (r) => r.roomId === id && r.date === date && isOverlapping(r.startTime, r.endTime, startTime, endTime)
    );

    if (!isRoomAvailable) {
        return res.status(400).json({error: 'Room is already reserved for this date and time'});
    }

    // Ajouter la réservation avec l'ID de la salle
    reservations.push({roomId: id, date, startTime, endTime});

    saveJSON(bookedUrl, reservations);
    res.status(201).json({message: 'Reservation created successfully'});
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
