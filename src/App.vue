<script setup>
import AddEventForm from '@/components/AddEventForm.vue'
import CountdownCard from '@/components/CountdownCard.vue'
import { useCountdownStore } from '@/stores/countdownStore'

const store = useCountdownStore()
store.loadFromLocalStorage()
</script>
<template>
  <div class="home">
    <h1 class="title">It's the Final Countdown</h1>
    <h3 class="undertitle">Den ultimata Nedräknings appen</h3>
    <AddEventForm />

    <div class="countdown-list">
      <CountdownCard v-for="event in store.events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  max-width: 600px;
}
.title {
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 5px;
}
.undertitle {
  text-align: center;
  margin: 0;
  font-weight: 400;
  font-size: 1.2rem;
}

.countdown-list {
  margin-top: 20px;
}
</style>
