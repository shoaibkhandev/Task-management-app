<template>
  <v-card class="mb-4" outlined>
    <transition-group name="fade" mode="out-in">
      <div :key="`task-${task.id}`">
        <v-card
          :color="color"
          elevation="0"
          class="
            d-flex
            justify-space-between
            align-center
            rounded-b-0
            pa-3
            grabbable
          "
          draggable
          @dragstart="pickupTask($event, task.id)"
          @drop.stop="moveTask($event, task.id)"
        >
          <h1 class="subtitle-1 font-weight-bold">{{ task.title }}</h1>
          <Controls :task="task" />
        </v-card>
        <div class="px-3 pt-4">
          <div>
            <label class="caption grey--text">Name:</label>
            <p>{{ task.title }}</p>
          </div>
          <div>
            <label class="caption grey--text">Description:</label>
            <p>{{ task.description | truncatedDescription }}</p>
          </div>
          <div>
            <label class="caption grey--text">Estimated Time:</label>
            <p>{{ task.estTime }}</p>
          </div>
          <div v-if="task.attachements.length">
            <label class="caption grey--text">Attachements:</label>
            <p>{{ task.attachements.length }}</p>

            <p @click="showAttachements" class="cursor-pointer blue--text text--darken-3">
              View Attachements
            </p>

            <TaskAttachementsModal
              class="mb-4"
              :attachements="task.attachements"
            />
          </div>
          <Labels v-if="task.labels.length" :labels="task.labels" />
        </div>
      </div>
    </transition-group>
  </v-card>
</template>

<script>
const components = {
  Controls: () => import("@/components/BoardListItemControls.vue"),
  Labels: () => import("@/components/TaskLabels.vue"),
  TaskAttachementsModal: () => import("@/components/TaskAttachementsModal.vue"),
};
export default {
  components,
  props: {
    task: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    color() {
      switch (this.task.stage) {
        case 1:
          return "red lighten-5";
        case 2:
          return "blue lighten-5";
        case 3:
          return "green lighten-5";
        default:
          return "blue lighten-5";
      }
    },
  },
  methods: {
    pickupTask(e, moveTaskId) {
      e.dataTransfer.setData("moveTaskId", moveTaskId);
    },
    moveTask(e, taskId) {
      const moveTaskId = Number(e.dataTransfer.getData("moveTaskId"));

      let tasks = [...this.$store.state.tasks];
      const sourceIndex = tasks.findIndex((task) => task.id === moveTaskId);
      const destinationIndex = tasks.findIndex((task) => task.id === taskId);

      if (tasks[sourceIndex].stage !== tasks[destinationIndex].stage) {
        const [sourceTask] = tasks.splice(sourceIndex, 1);
        const destinationIndex = tasks.findIndex((task) => task.id === taskId);
        sourceTask.stage = tasks[destinationIndex].stage;
        tasks.splice(destinationIndex, 0, sourceTask);
        this.$store.commit("UPDATE_TASKS", tasks);
        return;
      }

      [tasks[sourceIndex], tasks[destinationIndex]] = [tasks[destinationIndex],tasks[sourceIndex]];
      this.$store.commit("UPDATE_TASKS", tasks);

    },
    showAttachements() {
      this.$store.commit("TOGGLE_ATTACHEMENTS_MODAL", true);
    },
  },
};
</script>

<style scoped>
.grabbable {
  cursor: grabbing;
}
</style>