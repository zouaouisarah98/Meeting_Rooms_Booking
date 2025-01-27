<template>
  <NavBar/>
  <div class="container-fluid" style="margin-top: 2em">
    <div class="row">
      <div class="col-8" style="margin-top:1em">
        <MySchedulerPage/>
      </div>
      <div class="col-4">
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


</style>
