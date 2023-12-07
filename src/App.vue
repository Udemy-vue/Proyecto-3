<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useCounterStore } from '@/store/counter.js'

const useCounter = useCounterStore();

const http = () => {
  // console.log("hola mundo");
  useCounter.Actualizar('https://pokeapi.co/api/v2/pokemon')
  // useCounter.http = 'https://pokeapi.co/api/v2/pokemon';
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/pokemon" @click="http">Pokemon</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
        <RouterLink to="/contador">Contador</RouterLink>

      </nav>
    </div>
  </header>

  <RouterView />
</template> 

<style scoped>
  @import 'assets/styles/app.css';
</style>
