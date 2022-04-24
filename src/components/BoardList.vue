<template>
  <v-col cols="12" md="4">
    <v-card
      draggable="false"
      @dragover.prevent
      @drop.stop="moveTask($event)"
      outlined
      max-height="600px"
      class="overflow-auto"
    >
      <div class="px-3 pt-5">
        <h1 class="title text-center mb-2">
          {{ name }} - ({{ board.length }}/{{ totalTasks }}) ({{
            tasksPercentage
          }})
        </h1>
        <h1
          class="body-2 font-weight-bold text-center my-5"
          v-if="!board.length"
        >
          No task here
        </h1>
        <BoardListItem
          v-for="(task, index) in board"
          :task="task"
          :key="`task-item-${index}`"
        />
      </div>
    </v-card>
  </v-col>
</template>

<script>
const components = {
  BoardListItem: () => import("@/components/BoardListItem.vue"),
};
export default {
  components,
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    id: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    board() {
      return this.$store.state.tasks.filter((task) => {
        return task.stage === this.id;
      });
    },
    tasksPercentage() {
      if (!this.board.length) return 0;
      return `${Math.round((this.board.length / this.totalTasks) * 100)}%`;
    },
  },
  methods: {
    moveTask(e) {
      const moveTaskId = Number(e.dataTransfer.getData("moveTaskId"));
      
      let tasks = [...this.$store.state.tasks];
      const sourceIndex = tasks.findIndex((task) => task.id === moveTaskId);
      tasks[sourceIndex].stage = this.id;

      this.$store.commit("UPDATE_TASKS", tasks);
    },
  },
};
</script>

<style>
</style>