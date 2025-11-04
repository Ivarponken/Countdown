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
    <button class="clear" @click="store.removeFinishedEvents">Ta bort alla klara</button>
    <div class="countdown-list">
      <CountdownCard v-for="event in store.sortedEvents" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.clear {
  display: block;
  margin: 10px 0 20px 0;
  padding: 10px 16px;
  background-color: #ff5555;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.clear:hover {
  background-color: #ff2222;
}
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
