import { defineStore } from "pinia";

const useAturanStore = defineStore("aturan", {
  state: () => ({
    aturan: [],
    gejala: [],
    selectedValues: [],
    selectedOption: "",
    selectedDetail: {},
    mode: "add", // New state to track mode
  }),
  actions: {
    async fetchAturan() {
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
    async fetchGejala() {
      try {
        const response = await fetch("http://127.0.0.1:3000/gejala", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            pragma: "no-cache",
          },
        });
        const result = await response.json();
        this.gejala = result.data;
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    },
    async fetchDetail(kode_kecanduan) {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/aturan/${kode_kecanduan}`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
              pragma: "no-cache",
            },
          }
        );
        const result = await response.json();
        this.selectedDetail = result.data;
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    },
    addSelectedOption() {
      if (
        this.selectedOption &&
        !this.selectedValues.includes(this.selectedOption)
      ) {
        this.selectedValues.push(this.selectedOption);
        this.selectedOption = ""; // Reset selected option
      }
    },
    removeSelectedOption(item) {
      this.selectedValues = this.selectedValues.filter(
        (option) => option !== item
      );
    },
    setMode(mode) {
      this.mode = mode;
    },
  },
});

export default useAturanStore;
