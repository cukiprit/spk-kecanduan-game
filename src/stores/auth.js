import { defineStore } from "pinia";

const auth = defineStore("auth", {
  state: () => ({
    username: "",
    password: "",
    confirmPassword: "",
    token: null,
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

        console.log(result);

        if (result.token) {
          // sessionStorage.setItem("token", result.token);
          // this.token = result.token;
          // window.dispatchEvent(new Event("storage"));
          this.token = result.token;
          this.saveToken();
        }
      } catch (err) {
        console.error(err.message);
        return false;
      }
    },
    saveToken: function () {
      localStorage.setItem("token", this.token);
    },
    removeToken: function () {
      localStorage.removeItem("token");
    },
    loadToken: function () {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
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
        console.error(`Error: ${err.message}`);
      }
    },
    logout: function () {
      this.token = null;
      this.removeToken();
      // this.token = null;
      // window.dispatchEvent(new Event("storage"));
      // this.username = "";
      // this.password = "";
      // this.confirmPassword = "";
    },
  },
});

export default auth;
