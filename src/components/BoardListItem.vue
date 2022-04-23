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
          @dragenter.prevent
          @dragover.prevent
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
            <p>{{ task.description | descTruncated }}</p>
          </div>
          <div>
            <label class="caption grey--text">Estimated Time:</label>
            <p>{{ task.estTime }}</p>
          </div>
          <div v-if="task.attachements.length">
            <label class="caption grey--text">Attachements:</label>
            <p>{{ task.attachements.length }}</p>

            <p @click="showAttachements" class="blue--text text--darken-3">
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
    pickupTask(e, fromId) {
      e.dataTransfer.setData("fromId", fromId);
    },
    moveTask(e, toId) {
      const fromId = e.dataTransfer.getData("fromId");
      let tasks = [...this.$store.state.tasks];
      const fromIndex = tasks.findIndex((task) => task.id === Number(fromId));
      const toIndex = tasks.findIndex((task) => task.id === Number(toId));
      [tasks[fromIndex], tasks[toIndex]] = [tasks[toIndex], tasks[fromIndex]];
      this.changeOrder(tasks);
    },
    changeOrder(tasks) {
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