import { defineStore } from "pinia";

const auth = defineStore("auth", {
  state: () => ({
    username: "",
    password: "",
    confirmPassword: "",
    token: sessionStorage.getItem("token") || null,
  }),
  actions: {
    login: async function () {
      try {
        const response = await fetch("http://127.0.0.1:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const result = await response.json();

        this.username = "";
        this.password = "";

        console.log(result);

        if (result.token) {
          sessionStorage.setItem("token", result.token);
          this.token = result.token;
          window.dispatchEvent(new Event("storage"));
        }
      } catch (err) {
        console.error(err.message);
      }
    },
    register: async function () {
      try {
        const response = await fetch("http://127.0.0.1:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        await response.json();

        this.username = "";
        this.password = "";
        this.confirmPassword = "";
      } catch (err) {
        consol.error(`Error: ${err.message}`);
      }
    },
    logout: function () {
      sessionStorage.removeItem("token");
      this.token = null;
      window.dispatchEvent(new Event("storage"));
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
});

export default auth;
