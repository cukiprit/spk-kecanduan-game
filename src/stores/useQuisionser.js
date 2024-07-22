import { defineStore } from "pinia";
import auth from "./auth";

const useQuisionerStore = defineStore("quisioner", {
  state: () => ({
    quisioner: [],
    aturan: [],
    answers: {},
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

        // Log to check if quisioner is populated correctly
        console.log("Fetched quisioner:", this.quisioner);
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

        // Log to check if aturan is populated correctly
        console.log("Fetched aturan:", this.aturan);
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
      await this.fetchQuisioner(); // Ensure quisioner is fetched before calculation
      await this.fetchRules(); // Ensure rules are fetched before calculation

      const solutions = await this.fetchSolutions();
      const result = this.aturan
        .map((rule) => {
          // Ensure rule.kode_gejala is an array
          if (!Array.isArray(rule.kode_gejala)) {
            console.error(`Invalid kode_gejala in rule:`, rule);
            return null;
          }

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
        })
        .filter((res) => res !== null); // Filter out any null results

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
      if (this.currentPart < this.quisioner.length - 1) {
        this.currentPart++;
      }
    },
    prevPart() {
      if (this.currentPart > 0) {
        this.currentPart--;
      }
    },
    isCurrentPartFilled() {
      const question = this.quisioner[this.currentPart];
      // Add check to ensure question exists and has kode_gejala
      if (!question || !question.kode_gejala) {
        console.error("Invalid current part question:", question);
        return false;
      }
      return this.answers[question.kode_gejala] !== undefined;
    },
    currentPartQuestions() {
      // Add check to ensure currentPart is within bounds
      if (this.currentPart >= this.quisioner.length) {
        console.error("Current part out of bounds:", this.currentPart);
        return [];
      }
      return [this.quisioner[this.currentPart]];
    },
    resetForm() {
      this.$reset(); // Reset the state to its initial values
    },
  },
});

export default useQuisionerStore;
