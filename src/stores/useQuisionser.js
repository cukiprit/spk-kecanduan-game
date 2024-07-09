import { defineStore } from "pinia";
import auth from "./auth";

const useQuisionerStore = defineStore("quisioner", {
  state: () => ({
    quisioner: [],
    aturan: [],
    answers: [],
    currentPart: 0,
    result: [],
    highestResult: null,
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
    async fetchSolutions() {
      try {
        const response = await fetch("http://127.0.0.1:3000/kecanduan", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            pragma: "no-cache",
          },
        });

        const result = await response.json();
        return result.data;
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    },
    setAnswer(kode_gejala, answer) {
      this.answers[kode_gejala] = answer;
    },
    async calculateResult() {
      const solutions = await this.fetchSolutions();
      const result = this.aturan.map((rule) => {
        const totalGejala = rule.kode_gejala.length;
        const matchedGejala = rule.kode_gejala.filter(
          (gejala) => this.answers[gejala] === "yes"
        ).length;

        const solution = solutions.find(
          (s) => s.kode_kecanduan === rule.kode_kecanduan
        );

        return {
          kode_kecanduan: rule.kode_kecanduan,
          perilaku_kecanduan: rule.perilaku_kecanduan,
          percentage: (matchedGejala / totalGejala) * 100,
          solusi: solution ? solution.solusi : "Tidak Ada Solusi",
        };
      });

      this.result = result;
      this.highestResult = result.reduce(
        (max, res) => (res.percentage > max.percentage ? res : max),
        result[0]
      );
    },
    async saveResult(result) {
      const useAuth = auth();

      try {
        const response = await fetch("http://127.0.0.1:3000/hasil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${useAuth.token}`,
          },
          body: JSON.stringify(result),
        });

        if (!response.ok) {
          throw new Error("Failed to save result!");
        }
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    },
    nextPart() {
      if (this.currentPart < Math.ceil(this.quisioner.length / 7) - 1) {
        this.currentPart++;
      }
    },
    prevPart() {
      if (this.currentPart > 0) {
        this.currentPart--;
      }
    },
    isCurrentPartFilled() {
      const start = this.currentPart * 7;
      const end = start + 7;
      return this.quisioner
        .slice(start, end)
        .every((q) => this.answers[q.kode_gejala] !== undefined);
    },
    currentPartQuestions() {
      const start = this.currentPart * 7;
      const end = start + 7;
      return this.quisioner.slice(start, end);
    },
    resetForm() {
      this.quisioner = [];
      this.aturan = [];
      this.answer = [];
      this.currentPart = 0;
      this.result = [];
      this.highestResult = null;
    },
  },
});

export default useQuisionerStore;
