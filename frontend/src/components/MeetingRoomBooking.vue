<template>
  <div class="container-fluid">
    <div class="form-container">
      <div class="form-group">
        <input v-model="date" type="date" class="input" required/>
      </div>
      <div class="form-group">
        <el-time-select
            v-model="startTime"
            style="width: 8em;border: 1px solid #091667;border-radius: 4px;font-size: 1.2em"
            :max-time="endTime"
            class="mr-4"
            placeholder="Start time"
            start="08:00"
            step="00:30"
            end="19:30"
            format="HH:mm"
        />
        <el-time-select
            v-model="endTime"
            style="width: 8em;border: 1px solid #091667;border-radius: 4px;border-radius: 4px;font-size: 1.2em"
            :min-time="startTime"
            placeholder="End time"
            start="08:00"
            step="00:30"
            end="19:30"
            format="HH:mm"
        />
      </div>
      <div class="form-group">
        <button type="button" @click="searchRooms" class="btn">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>

    <div style="margin-top: 1em">
      <h3>Available meeting rooms</h3>
      <vxe-table
          highlight-hover-row
          stripe
          border
          show-header-overflow
          ref="tableRef"
          class="mytable"
          :data="rooms"
      >
        <vxe-column field="name" title="Meeting Room"></vxe-column>
        <vxe-column field="capacity" title="Capacity" width="100"></vxe-column>
        <vxe-column
            field="equipements"
            title="Equipments"
            :formatter="formatEquipements"
        ></vxe-column>
        <vxe-column title="Actions" width="140">
          <template #default="{ row }">
            <button @click="reserveRoom(row.id)" class="btn">Book Now</button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { BookingRoom } from "../store/roomStore.ts";

// Définition du type pour une salle (en supposant qu'il existe dans ton store)
interface Room {
  id: number;
  name: string;
  equipments: Equipment[];
}

interface Equipment {
  name: string;
}

// Initialisation de la date actuelle
const now = new Date();

// Accès au store BookingRoom
const store = BookingRoom();

// Recuperation de la propriétée Rooms et du store
const rooms = computed<Room[]>(() => store.rooms);

// Déclaration des variables
const date = ref<string>(now.toISOString().split("T")[0]);  // Format: "yyyy-mm-dd"
const startTime = ref<string>('08:30');
const endTime = ref<string>('09:30');

// Fonction pour rechercher les salles disponibles
const searchRooms = (): void => {
  try {
    store.fetchRooms(date.value, startTime.value, endTime.value);
  } catch (err) {
    console.error('Error during fetchRooms:', err);
  }
};

// Fonction pour formater les équipements en une chaîne de caractères
const formatEquipements = ({ cellValue }: { cellValue: Equipment[] }): string => {
  if (Array.isArray(cellValue)) {
    return cellValue.map((equipment) => equipment.name).join(', ');
  }
  return 'Aucun équipement';
};

// Fonction pour réserver une salle
const reserveRoom = async (id: number): Promise<void> => {
  try {
    await store.reserveRoom(id, date.value, startTime.value, endTime.value);
    searchRooms();  // Rechercher les salles après la réservation
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-group {
  flex: 2;
  margin-right: 1em;
}

.input {
  width: 80%;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #001f34;
  border-radius: 4px;
}

.btn {
  padding: 0.4em 1.2em;
  background-color: #001f34;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #79b2f1;
}

.mytable {
  margin-top: 2em;
  min-width: 40em;
}
</style>
