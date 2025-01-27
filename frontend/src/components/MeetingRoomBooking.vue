<template>
  <div class="container-fluid">
    <div class="form-container">
      <div class="form-group">
        <input v-model="date" type="date" class="input" required/>
      </div>
      <div class="form-group">
        <el-time-select
            v-model="startTime"
            style="width: 240px"
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
            style="width: 240px"
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
import {ref, computed} from 'vue';
import {BookingRoom} from "../store/roomStore.ts";


const now = new Date();
const store = BookingRoom();
const rooms = computed(() => store.rooms);
const date = ref<string>(now.toISOString().split("T")[0]);


const startTime = ref<string>('08:30');
const endTime = ref<string>('09:30');

// const timeRange = ref<[string, string]>([
//   `${String(now.getHours()).padStart(2, "0")}:${String(
//       now.getMinutes()
//   ).padStart(2, "0")}`,
//   `${String(now.getHours() + 1).padStart(2, "0")}:${String(
//       now.getMinutes()
//   ).padStart(2, "0")}`,
// ]);

const successMessage = ref('');
const errorMessage = ref('');

const searchRooms = () => {
  try {
    // const [startTime, endTime] = timeRange.value;
    store.fetchRooms(date.value, startTime.value, endTime.value);
  } catch (err) {
    console.error('Error during fetchRooms:', err);
  }
};

// Formatter pour les équipements
const formatEquipements = ({cellValue}) => {
  if (Array.isArray(cellValue)) {
    return cellValue.map((equipment) => equipment.name).join(', ');
  }
  return 'Aucun équipement';
};


const reserveRoom = async (id: number) => {

  try {
    // const [startTime, endTime] = timeRange.value;
    await store.reserveRoom(id, date.value,  startTime.value, endTime.value);
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
  margin-top: 1em;
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
  border-radius: 3px;
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

.mytable {
  margin-top: 2em;
  width: 40em;
}
</style>
