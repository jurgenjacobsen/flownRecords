<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    name: "OrganizationsView",
    components: {}
})

export default class OrganizationsView extends Vue {
  get orgId(): string | undefined {
    return this.$route.params.id as string;
  }

  mounted() {
    console.log("Org ID:", this.orgId);
  }
}
</script>

<template>
    <h1>
        Organizations
    </h1>
    <p>
        {{ orgId }}
    </p>
</template>