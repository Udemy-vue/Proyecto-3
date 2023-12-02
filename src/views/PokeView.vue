<template>
  <div class="Pokemon" v-if="Pokemon!=null">
    <h1 class="nombre">Poke name: {{ $route.params.poke }}</h1>
    <img :src="currentImage" alt="">
    
  </div>
  <div class="Pokemon" v-else>
    <h1 class="nombre">La Pokedest no registra al: {{ $route.params.poke }}</h1>
  </div>
  <button v-on:click="back">Regresar</button>
</template>

<script>
	import axios from "axios"
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'

	export default {
		data() {
      return {
        Pokemon: ref({}),
        route: useRoute(),
        router: useRouter(),
        images: [],
        currentImageIndex: ref(0)        
      };
    },
    computed: {
      currentImage() {
        return this.images[this.currentImageIndex];
      },
    },
    methods: {
      async Pokeboll() {
        try{
          return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.route.params.poke}`)).data;
        } catch(er){
          // console.log("fallo de la matriz")
          // console.log(er);
          return null;
        }
      },
      back() {
        this.router.push('/pokemon')
      },
      changeImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }
    },
    async created() {
      this.Pokemon = await this.Pokeboll();
      if (this.Pokemon != null) {
        this.images.push(this.Pokemon.sprites.front_default);
        this.images.push(this.Pokemon.sprites.back_default);
      }
      // console.log(this.Pokemon)
    },
    mounted() {
      this.intervalId = setInterval(this.changeImage, 2000);
    },
    beforeUnmount() {
      clearInterval(this.intervalId);
    },
	}
</script>

<style>
  @import "@/assets/styles/app.css";
</style>