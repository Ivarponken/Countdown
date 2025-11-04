<template>
  <form @submit.prevent="addNewEvent" class="add-form">
    <input v-model="name" type="text" placeholder="Vad händer?" required />
    <input v-model="date" type="datetime-local" required />
    <button type="submit">Lägg till</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useCountdownStore } from '@/stores/countdownStore'

const store = useCountdownStore()
const name = ref('')
const date = ref('')

function addNewEvent() {
  store.addEvent(name.value, date.value)
  name.value = ''
  date.value = ''
}
</script>

<style scoped>
.add-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.add-form input {
  flex: 1 1 200px;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background-color: #222831;
  color: #fff;
  font-size: 1rem;
}

.add-form input:focus {
  outline: 2px solid #00adb5;
}

.add-form button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #00adb5;
  color: #eeeeee;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-form button:hover {
  background: #00cccc;
}
</style>
