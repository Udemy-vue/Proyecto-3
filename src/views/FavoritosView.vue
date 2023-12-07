<template>
	<h1 class="texto_centrado">Pokemones Favoritos</h1>
	<div v-if="data!=0" class="NamePoke">
		<ul>
			<li v-for="(poke, index) in useFavoritos.favoritos" :key="poke.id">
				<router-link :to="`/pokemon/${poke.name}/${index}`">
        	{{ poke.name }}
      	</router-link>
			</li>
		</ul>
		<button v-if="$route.params.punto!='vista'" @click="useFavoritos.vaciar">vaciar</button>
	</div>
	<h3 v-else>No se tienen Favoritos</h3>
</template>

<script>
	import { ref } from 'vue';
	import { useFavoritosStore } from '@/store/favoritos.js';
	export default {
		data() {
			return {
				useFavoritos: useFavoritosStore(),
				data: true
			};
		},
		methods: {

		},
		created() {
			this.data = this.useFavoritos.favoritos.length;
			// console.log(this.data);
		},
		components: {
			useFavoritosStore
		}
	}
</script>

<style>
  @import "@/assets/styles/app.css";
</style>