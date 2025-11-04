import { defineStore } from 'pinia'

export const useCountdownStore = defineStore('countdown', {
  state: () => ({
    events: [],
  }),
  getters: {
    sortedEvents: (state) => {
      return [...state.events].sort((a, b) => a.date - b.date)
    },
  },
  actions: {
    loadFromLocalStorage() {
      const stored = localStorage.getItem('countdownEvents')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Gör om datumen till riktiga Date-objekt
        this.events = parsed.map((e) => ({
          ...e,
          date: new Date(e.date),
        }))
      }
    },
    removeFinishedEvents() {
      const now = new Date()
      this.events = this.events.filter((event) => event.date > now)
      this.saveToLocalStorage()
    },
    addEvent(name, date) {
      this.events.push({
        id: Date.now(),
        name,
        date: new Date(date),
      })
      this.saveToLocalStorage()
    },

    removeEvent(id) {
      this.events = this.events.filter((e) => e.id !== id)
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('countdownEvents', JSON.stringify(this.events))
    },
  },
})
