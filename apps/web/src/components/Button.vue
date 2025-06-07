<template>
    <button
        
        class="
        cursor-pointer bg-gradient-to-t 
        from-neutral-900 to-neutral-800 
        hover:opacity-75 transition duration-150
        text-white
        py-2 px-6 
        rounded-md 
        ring-2 ring-white/25"
        @click="navigate"
    >
		{{ txt }}
	</button>
</template>

<script lang="ts">
import { Options, PropOptions, Vue } from 'vue-class-component';

@Options({
  props: {
    txt: {
        type: String as PropOptions<string>,
        required: true,
        default: 'Button'
    },
    link: {
        type: String as PropOptions<string>,
        required: false,
        default: '#'
    },
    type: {
        type: String as PropOptions<string>,
        required: false,
        default: ''
    }
  },
})

export default class Button extends Vue {
  txt!: string;
  link!: string;

  navigate() {
    //@ts-ignore
    this.$router.push(this.link);
  }
}
</script>