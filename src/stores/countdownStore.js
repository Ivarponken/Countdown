import { defineStore } from 'pinia'

export const useCountdownStore = defineStore('countdown', {
  state: () => ({
    events: [],
  }),

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
