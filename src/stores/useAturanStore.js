import { defineStore } from "pinia";

const useAturanStore = defineStore("aturan", {
  state: () => ({
    aturan: [],
    kecanduan: [],
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
    async fetchKecanduan() {
      try {
        const response = await fetch("http://127.0.0.1:3000/kecanduan", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            pragma: "no-cache",
          },
        });
        const result = await response.json();
        this.kecanduan = result.data;
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
    async addAturan(data) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:3000/aturan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        await response.json();

        this.fetchAturan();

        this.aturan = [];
        this.gejala = [];
        this.selectedValues = [];
        this.selectedOption = "";
        this.selectedDetail = {};
      } catch (err) {
        console.error(err.message);
      }
    },
    async updateAturan(data) {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(
          `http://127.0.0.1:3000/aturan/${data.kode_kecanduan}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );

        await response.json();

        this.fetchAturan();
      } catch (err) {
        console.error(err.message);
      }
    },
    async deleteAturan(kode_kecanduan) {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/aturan/${kode_kecanduan}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await response.json();

        this.fetchAturan();
      } catch (err) {
        console.error(err.message);
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
