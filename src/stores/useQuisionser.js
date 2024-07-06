import { defineStore } from "pinia";

const useQuisionerStore = defineStore("quisioner", {
  state: () => ({
    quisioner: [],
    aturan: [],
    answers: {},
  }),
  actions: {
    async fetchQuisioner() {
      try {
        const response = await fetch("http://127.0.0.1:3000/gejala", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            pragma: "no-cache",
          },
        });

        const result = await response.json();
        this.quisioner = result.data;
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    },
    async fetchRules() {
      try {
        const response = await fetch("http://127.0.0.1:3000/aturan", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            pragma: "no-cache",
          },
        });

        const result = await response.json();
        this.aturan = result.data;
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    },
    setAnswer(kode_gejala, answer) {
      this.answers[kode_gejala] = answer;
    },
    calculateResult() {
      const result = this.aturan.map((rule) => {
        const totalGejala = rule.kode_gejala.length;
        const matchedGejala = rule.kode_gejala.filter(
          (gejala) => this.answers[gejala] === "yes"
        ).length;

        return {
          kode_kecanduan: rule.kode_kecanduan,
          perilaku_kecanduan: rule.perilaku_kecanduan,
          percentage: (matchedGejala / totalGejala) * 100,
        };
      });

      return result;
    },
  },
});

export default useQuisionerStore;
