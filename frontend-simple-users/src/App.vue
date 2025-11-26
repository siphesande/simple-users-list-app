<template>
  <div class="container">
    <h1>Simple Users List</h1>

    <form @submit.prevent="addUser" class="form">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required
      />

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />
      
      <button type="submit">Add User</button>
    </form>

    <p v-if="errorMessage" class="error-msg">
      {{ errorMessage }}
    </p>

    <ul class="user-list">
      <li v-if="users.length === 0" class="user-item" style="justify-content: center; color: #888;">
        No users added yet
      </li>

      <li v-for="user in users" :key="user._id || user.id" class="user-item">
        <span>{{ user.name }} ({{ user.email }})</span>
        <button @click="deleteUser(user._id || user.id)" class="delete-btn">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
const API_URL = "http://localhost:3000/users";

export default {
  data() {
    return {
      users: [],
      name: "",
      email: "",
      errorMessage: "",
    };
  },

  methods: {
    async fetchUsers() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (Array.isArray(data)) {
            this.users = data;
        } else if (data && Array.isArray(data.data)) {
            this.users = data.data;
        } else {
            this.users = [];
        }
      } catch (e) {
        console.error("Error fetching users", e);
      }
    },

    async addUser() {
      // Clear previous errors
      this.errorMessage = "";

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          this.errorMessage = data.error || "Failed to add user";
          return;
        }
        this.name = "";
        this.email = "";
        this.fetchUsers();
      } catch (error) {
        this.errorMessage = "Network error. Is the backend running?";
      }
    },

    async deleteUser(id) {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      this.fetchUsers();
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f7f7f7;
}

.container {
  max-width: 500px;
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  /* Centering container on screen */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.form input {
  flex: 1;
  padding: 10px;
}

.form button {
  padding: 10px 15px;
  cursor: pointer;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.delete-btn {
  background: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}


.error-msg {
  color: #e53e3e;
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  font-size: 0.9em;
}
</style>