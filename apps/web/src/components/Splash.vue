<template>
    <div class="text-center">
    <div class="mt-20">
      <div class="text-3xl font-bold text-white/25 h-[1.875rem]">
        {{ uppertext }}
      </div>
      <h1 class="text-8xl font-bold mt-2">
        Flown Records
      </h1>
      <div>
        <h3 class="font-semibold text-white/50 mt-2">
          Powered by
        </h3>
        <img src="" alt="" v-if="!icon">
      </div>
    </div>

   </div>
</template>


<script lang="ts">
import { Options, PropOptions, Vue } from 'vue-class-component';

@Options({
  props: {
    title: {
      type: String as PropOptions<string>,
      default: 'Flown Records',
    },
    uppertext: {
      type: String as PropOptions<string>,
      default: 'Welcome to',
    },
    icon: {
      type: Boolean as PropOptions<boolean>,
    }
  },
})





export default class Splash extends Vue {
  title!: string;
  uppertext!: string;
  icon!: boolean;
}
</script>