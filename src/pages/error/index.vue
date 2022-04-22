<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg5 class="text-center">
        <p class="text-h6 blue-grey--text text--darken-2">Oops!</p>
        <p
          class="
            text-h6
            font-weight-light
            blue-grey--text
            text--darken-2 text-uppercase
          "
        >
          404 Error
        </p>
        <p class="blue-grey--text text--darken-2">
          The page you are looking for does not exist
        </p>
        <v-btn class="mt-4" color="primary" depressed to="/">
          <v-icon class="mr-2" left> mdi-arrow-left </v-icon>
          Go Back Home
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "error",

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped>
</style>