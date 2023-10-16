<template>
    <div>
        <h2>User Login</h2>
        <form @submit.prevent="login">
            <input v-model="username" type="text" placeholder="Username" />
            <input v-model="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    login() {
      // In a real application, perform authentication here.
      // For this, we'll just redirect to a dashboard page.
      this.$router.push('/dashboard');
    },
};
</script>
  