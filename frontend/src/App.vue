<template>
  <NavBar/>
  <div class="container-fluid" style="margin-top: 2em">
    <div class="row">
      <div class="col-xxl-6" style="margin-top:1em">
        <MySchedulerPage/>
      </div>
      <div class="col-xxl-6">
        <figure class="figure">
          <img src="./assets/Mroom.jpg" class="figure-img rounded" alt="MyImg">
        </figure>
        <MeetingRoomBooking/>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">

import MeetingRoomBooking from "./components/MeetingRoomBooking.vue";
import NavBar from "./components/NavBar.vue";
import MySchedulerPage from "./components/MySchedulerPage.vue";
</script>


<style scoped>

.container-fluid {
  height: 100%; /* Adjust this if you have a fixed height */
  overflow-y: hidden; /* Hide vertical scrollbar */
}

.figure {
  height: 20em;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;

}
</style>
