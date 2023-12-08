<template>
  <div class="Pokemon" v-if="Pokemon!=null">
    <h1 class="nombre">Poke name: {{ $route.params.poke }}</h1>
    <img :src="currentImage" alt="">
    
  </div>
  <div class="Pokemon" v-else>
    <h1 class="nombre">La Pokedest no registra a: {{ $route.params.poke }}</h1>
  </div>
  <button v-on:click="back">Regresar</button>
  <button v-if="$route.params.punto=='vista'" @click="useFavoritos.add(Pokemon)" :disabled="useFavoritos.atrapado($route.params.poke)">Me Gusta</button>
  <button v-else v-on:click="eliminar" :disabled="useFavoritos.vista($route.params.punto, $route.params.poke)">No Me Gusta</button>
  <!-- <button v-if="$route.params.punto==='vista'" @click="useFavoritos.atrapado($route.params.poke)">vista</button> -->
  

</template>

<script>
	// import axios from "axios"
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { Pokedest } from '@/assets/js/bundle.js'
  import { useFavoritosStore } from '@/store/favoritos.js';
  // import { useStore } from 'pinia';

	export default {
		data() {
      return {
        Pokemon: ref({}),
        route: useRoute(),
        router: useRouter(),
        images: [],
        currentImageIndex: ref(0),
        useFavoritos: useFavoritosStore(),
        paso: false
      };
    },
    computed: {
      currentImage() {
        return this.images[this.currentImageIndex];
      },
    },
    methods: {
      emitLectura() {
        console.log(this.paso)
      },
      eliminar() {
        this.useFavoritos.delete(this.route.params.punto);
        // this.paso = true;
        // this.useFavoritos.paso('hi', 'jasd');
        // this.useFavoritos.vista('asd','asdf');
      },
      back() {
        if (this.route.params.punto=='vista') this.router.push(`/pokemon`);
        else this.router.push(`/favoritos`);
      },
      Favorito() {
        // console.log(this.route.params.poke);
        // console.log(this.Pokemon)
      },
      changeImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }
    },
    async created() {
      
      this.Pokemon = await Pokedest.Pokeboll(`https://pokeapi.co/api/v2/pokemon/${this.route.params.poke}`);
      if (this.Pokemon != null) {
        this.images.push(this.Pokemon.sprites.front_default);
        this.images.push(this.Pokemon.sprites.back_default);
      }

      // if(this.route.params.punto!='vista') {
      //   this.paso = this.useFavoritos.paso(this.route.params.punto, this.route.params.poke);
      // }
    },
    mounted() {
      this.intervalId = setInterval(this.changeImage, 2000);
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    },
    components: {
      useFavoritosStore
    }
	}
</script>

<style>
  @import "@/assets/styles/app.css";
</style>