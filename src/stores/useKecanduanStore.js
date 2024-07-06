import { defineStore } from "pinia";

const usePenyakitStore = defineStore({
  id: "kecanduan",
  state: () => ({
    kecanduan: [],
    kode_kecanduan: "",
    perilaku_kecanduan: "",
    selectedKecanduan: null,
  }),
  actions: {
    fetchPenyakit: async function () {
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
        console.error(`Error fetching penyakit: ${err.message}`);
      }
    },
    submitPenyakit: async function () {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/kecanduan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            kode_kecanduan: this.kode_kecanduan,
            perilaku_kecanduan: this.perilaku_kecanduan,
          }),
        });
        // const result = await response.json();
        await response.json();
        // penyakit.value.push(result);
        this.fetchPenyakit();

        this.perilaku_kecanduan = "";
        this.kode_kecanduan = "";
      } catch (err) {
        console.error(err.message);
      }
    },
    deletePenyakit: async function (id) {
      const token = sessionStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:3000/kecanduan/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.status === "success") {
          this.kecanduan = this.kecanduan.filter(
            (p) => p.kode_kecanduan !== id
          );
        }

        this.fetchPenyakit();
      } catch (err) {
        console.error(`Error deleting kecanduan: ${err.message}`);
      }
    },
    updatePenyakit: async function () {
      const token = sessionStorage.getItem("token");

      try {
        await fetch(
          `http://localhost:3000/kecanduan/${this.selectedKecanduan.kode_kecanduan}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              perilaku_kecanduan: this.perilaku_kecanduan,
            }),
          }
        );
        const index = this.kecanduan.findIndex(
          (p) => p.kode_kecanduan === this.selectedKecanduan.kode_kecanduan
        );
        this.kecanduan[index].perilaku_kecanduan = this.perilaku_kecanduan;

        this.perilaku_kecanduan = "";
        this.kode_kecanduan = "";
        this.selectedKecanduan = null;
      } catch (err) {
        console.error(`Error updating kecanduan: ${err.message}`);
      }
    },
  },
});

export default usePenyakitStore;
