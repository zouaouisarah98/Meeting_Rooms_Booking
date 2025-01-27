<template>
  <NavBar/>
  <div class="container-fluid" style="margin-top: 2em">
    <div class="row">
      <div class="col-lg-6" style="margin-top: 4em">
        <figure class="figure">
          <img src="./assets/Mroom.jpg" class="figure-img rounded" alt="MyImg">
        </figure>

      </div>
      <div class="col-lg-6">
        <MeetingRoomBooking/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import MeetingRoomBooking from "./components/MeetingRoomBooking.vue";
import NavBar from "./components/NavBar.vue";
</script>


<style scoped>


</style>
