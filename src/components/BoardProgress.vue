<template>
  <v-card outlined>
    <div class="py-5 px-5">
      <h1 class="title text-center font-weight-bold mb-2">Progress</h1>
      <v-progress-linear
        :value="percentageOfDoneTasks"
        color="green lighten-2"
        height="26"
        rounded
      >
        <strong
          >{{ percentageOfDoneTasks }} % Done {{ NoOfDoneTasks }} out of
          {{ totalTasks }}</strong
        >
      </v-progress-linear>
    </div>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>