<template>
  <div class="Pokemon" v-if="Pokemon!=null">
    <h1 class="nombre">Poke name: {{ $route.params.poke }}</h1>
    <img :src="currentImage" alt="">
    
  </div>
  <div class="Pokemon" v-else>
    <h1 class="nombre">La Pokedest no registra a: {{ $route.params.poke }}</h1>
  </div>
  <button v-on:click="back">Regresar</button>
</template>

<script>
	// import axios from "axios"
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { Pokedest } from '@/assets/js/bundle.js'

	export default {
    // props: ['updateName', 'info'],
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
      emitLectura() {
        
        // this.$emit('lectura', this.buttonText);
      },
      back() {
        // console.log(this.$route.params.http);
        // this.$emit('lectura', this.$route.params.http);
        this.router.push(`/pokemon/${encodeURIComponent(this.$route.params.http)}`);
        // this.router.push(`/pokemon/${encodeURIComponent(http)}`)
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