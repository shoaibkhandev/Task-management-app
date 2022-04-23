<template>
  <v-chip-group class="mb-4" column>
    <v-chip
      text-color="white"
      :color="colors[index]"
      v-for="(tag, index) in labels"
      :key="tag"
    >
      {{ tag }}
    </v-chip>
  </v-chip-group>
</template>

<script>
import { lablesColors } from "../inputs";
export default {
  props: {
    labels: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      colors: lablesColors
    };
  },
};
</script>

<style>
</style>