import { defineStore } from "pinia";

const useGejalaStore = defineStore({
  id: "gejala",
  state: () => ({
    gejala: [],
    kode_gejala: "",
    nama_gejala: "",
    selectedGejala: null,
  }),
  actions: {
    fetchGejala: async function () {
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
        console.error(`Error fetching gejala: ${err.message}`);
      }
    },
    submitGejala: async function () {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/gejala", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            kode_gejala: this.kode_gejala,
            nama_gejala: this.nama_gejala,
          }),
        });
        // const result = await response.json();
        await response.json();
        // penyakit.value.push(result);
        this.fetchGejala();

        this.nama_gejala = "";
        this.kode_gejala = "";
      } catch (err) {
        console.error(err.message);
      }
    },
    deleteGejala: async function (id) {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:3000/gejala/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.status === "success") {
          this.gejala = this.gejala.filter((p) => p.kode_gejala !== id);
        }

        this.fetchGejala();
      } catch (err) {
        console.error(`Error deleting gejala: ${err.message}`);
      }
    },
    updateGejala: async function () {
      const token = sessionStorage.getItem("token");

      try {
        await fetch(
          `http://localhost:3000/gejala/${this.selectedGejala.kode_gejala}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              nama_gejala: this.nama_gejala,
            }),
          }
        );
        const index = this.gejala.findIndex(
          (p) => p.kode_gejala === this.selectedGejala.kode_gejala
        );
        this.gejala[index].nama_gejala = this.nama_gejala;

        this.nama_gejala = "";
        this.kode_gejala = "";
        this.selectedGejala = null;
      } catch (err) {
        console.error(`Error updating gejala: ${err.message}`);
      }
    },
  },
});

export default useGejalaStore;
