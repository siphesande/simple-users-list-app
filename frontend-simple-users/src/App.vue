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

    <ul class="user-list">
    
    <li v-if="users.length === 0" class="user-item" style="justify-content: center; color: #888;">
      No users added yet
    </li>

    <li v-for="user in users" :key="user.id" class="user-item">
      <span>{{ user.name }} ({{ user.email }})</span>
      <button @click="deleteUser(user.id)" class="delete-btn">Delete</button>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      name: "",
      email: "",
    };
  },

  methods: {
    async fetchUsers() {
      const res = await fetch("http://localhost:3000/users");
      this.users = await res.json();
    },

    async addUser() {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
        }),
      });

      this.name = "";
      this.email = "";
      this.fetchUsers();
    },

    async deleteUser(id) {
      await fetch(`http://localhost:3000/users/${id}`, {
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
</style>

Do not not change the code but only container div to be on the center