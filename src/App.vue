<template>
  <div id="app">
	<router-view/>
  </div>
</template>

<script setup>
import { useRecaptchaProvider } from 'vue-recaptcha'

useRecaptchaProvider()
</script>

<style>
/*.app-container {
  display: flex;
  height: 100vh; /* Menentukan tinggi komponen induk 100% tinggi layar /
}*/

:root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>