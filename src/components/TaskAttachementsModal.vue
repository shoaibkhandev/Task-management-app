<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent> </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    attachements: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:dialog", false);
    },
  },
};
</script>

<style>
</style>