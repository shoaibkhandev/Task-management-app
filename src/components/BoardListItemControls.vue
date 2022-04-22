<template>
  <div>
    <v-icon v-if="task.stage !== 3" class="mr-4" @click="forwardTask">
      mdi-clipboard-arrow-right
    </v-icon>
    <v-icon v-if="task.stage === 3" class="mr-4" @click="backwardTask">
      mdi-clipboard-arrow-left
    </v-icon>
    <v-icon class="mr-4" @click="editTask"> mdi-pencil </v-icon>
    <v-icon class="mr-4" @click="deleteTask"> mdi-delete-forever </v-icon>
    <v-icon @click="openDetails"> mdi-eye </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task.id);
    },
    forwardTask() {
      this.$store.dispatch("forwardTask", this.task.id);
    },
    backwardTask() {
      this.$store.dispatch("backwardTask", this.task.id);
    },
    editTask() {
      this.$router.replace({ query: { taskId: this.task.id } });
    },
    openDetails() {
      this.$router.replace({ query: { taskId: this.task.id } });
    },
  },
};
</script>

<style>
</style>