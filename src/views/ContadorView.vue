<template>
	<div>
		<h2>Home counter: {{useCounter.count}}</h2>

		<h2>Double: {{ useCounter.double}} </h2>
		<button v-on:click="useCounter.reduct">Reducir</button>
		<button v-on:click="useCounter.increment">Incrementar</button>
	</div>
</template>

<script>
	import { useCounterStore } from '@/store/counter.js'

	export default {
		data() {
			return { 
				useCounter: useCounterStore()
			};
		},
		methods: {
	    Lectura(value) {
	      // Llama a la función 'lectura' del store y pasa el valor como argumento
	      this.useCounter.lectura(value);
	    },
	  },
		created() {
			// console.log(this.useCounter)
		},
		components: {
			useCounterStore
		}
	}
</script>