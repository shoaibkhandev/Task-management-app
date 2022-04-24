<template>
  <div>
    <Progress />
    <Filters />
    <Board />
    <TaskDetailsModal />
  </div>
</template>

<script>
const components = {
  Progress: () => import("@/components/BoardProgress.vue"),
  Filters: () => import("@/components/BoardFilters.vue"),
  Board: () => import("@/components/AppBoard.vue"),
  TaskDetailsModal: () => import("@/components/TaskDetailsModal.vue"),
};
export default {
  components,
  watch: {
    "$route.query": {
      immediate: true,
      handler: function (query) {
        if (query.taskId) {
          this.$store.commit("TOGGLE_TASK_DETAILS_MODAL", true);
        }
      },
    },
  },
};
</script>

<style>
.cursor-pointer {
  cursor: pointer;
}
</style>