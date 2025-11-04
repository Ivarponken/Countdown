<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCountdownStore } from '@/stores/countdownStore'

const props = defineProps({ event: Object })
const store = useCountdownStore()

const remaining = ref('')
const progress = ref(0)
let interval

const startTime = new Date()
const endTime = props.event.date

// Ljud för när nedräkningen tar slut
const alertSound = new Audio('/sounds/alert.mp3') // Lägg din ljudfil i public/sounds/

function pad(num) {
  return num.toString().padStart(2, '0')
}

function updateRemaining() {
  const now = new Date()
  const diff = endTime - now
  const total = endTime - startTime

  if (diff <= 0) {
    const messages = [
      'Det händer NU!',
      'Din tid är kommen.',
      'Nu smäller det!',
      'NU ÄR DET DAGS',
      'Tror det händer nu?',
      'Nu händer det på riktigt',
      'Akta för nu händer det',
      'Dags att fira!',
    ]
    remaining.value = messages[Math.floor(Math.random() * messages.length)]
    progress.value = 100
    clearInterval(interval)

    // Spela ljud när tiden tar slut
    alertSound.play().catch(() => {
      console.warn('Ljud kunde inte spelas automatiskt, användaren måste interagera först.')
    })

    return
  }

  // Räkna år/månader/dagar för visning
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const years = Math.floor(totalDays / 365)
  const months = Math.floor((totalDays % 365) / 30)
  const days = (totalDays % 365) % 30

  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  remaining.value =
    `${years > 0 ? years + 'y ' : ''}` +
    `${months > 0 ? months + 'mo ' : ''}` +
    `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`

  progress.value = Math.min(100, Math.max(0, ((total - diff) / total) * 100))
}

onMounted(() => {
  updateRemaining()
  interval = setInterval(updateRemaining, 1000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="countdown-card">
    <h3>{{ event.name }}</h3>
    <div class="time">{{ remaining }}</div>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>

    <button @click="store.removeEvent(event.id)">Ta bort</button>
  </div>
</template>
<style scoped>
.countdown-card {
  background: #222831;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.countdown-card h3 {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #eeeeee;
}

.time {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.progress-container {
  width: 100%;
  height: 10px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #017379, #00f2ff);
  transition: width 0.5s linear;
}

.countdown-card button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #ff5555;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.countdown-card button:hover {
  background: #ff2222;
}
</style>
