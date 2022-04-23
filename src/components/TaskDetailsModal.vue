<template>
  <v-row justify="center">
    <v-dialog
      :value="$store.state.taskDetailsModal"
      persistent
      max-width="600px"
    >
      <v-form
        v-if="$store.state.taskDetailsModal"
        ref="form"
        @submit.prevent="submit"
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5">View/Edit Task</span>
            <v-icon large @click="deleteTask" color="red darken-2">
              mdi-delete-forever
            </v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.title"
                    :rules="titleRules"
                    label="Title*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="formData.description"
                    :rules="descriptionRules"
                    label="Description*"
                  ></v-text-field>
                </v-col>
                <v-col v-if="formData.stage" cols="12">
                  <label class="caption grey--text">Board:</label>
                  <p class="mb-0">{{ stageName }}</p>
                </v-col>
                <v-col cols="12">
                  <label class="caption grey--text">Estimated Time:</label>
                  <p class="mb-0">{{ formData.estTime }}</p>
                </v-col>

                <v-col cols="12" v-if="formData.attachements.length">
                  <label class="caption grey--text">Attachements:</label>
                  <p>{{ formData.attachements.length }}</p>

                  <p
                    @click="showAttachements"
                    class="blue--text text--darken-3 mb-0"
                  >
                    View Attachements
                  </p>
                </v-col>

                <v-col v-if="formData.labels.length" cols="12">
                  <Labels :labels="formData.labels" />
                </v-col>

                <TaskAttachementsModal
                  class="mb-4"
                  :attachements="formData.attachements"
                />

                <v-col cols="12">
                  <v-file-input
                    v-model="formData.newAttachements"
                    accept="image/*"
                    chips
                    counter
                    multiple
                    show-size
                    small-chips
                    truncate-length="15"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModal">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text type="submit"> Update </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
const components = {
  Labels: () => import("@/components/TaskLabels.vue"),
  TaskAttachementsModal: () => import("@/components/TaskAttachementsModal.vue"),
};
export default {
  components,
  data() {
    return {
      formData: {
        title: null,
        description: null,
        stage: null,
        estTime: null,
        labels: [],
        attachements: [],
        newAttachements: [],
      },
      datePicker: false,
      titleRules: [(v) => !!v || "title is required"],
      descriptionRules: [(v) => !!v || "description is required"],
    };
  },
  computed: {
    taskDetails() {
      return this.$store.state.tasks.find(
        (task) => task.id == this.$route.query.taskId
      );
    },
    stageName() {
      return this.$store.state.stages.find(
        (stage) => stage.id == this.formData.stage
      ).name;
    },
  },
  mounted() {
    this.formData = { ...this.taskDetails };
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;

      const params = {
        ...this.formData,
        attachements: [
          ...(this.formData.attachements || []),
          ...(this.formData.newAttachements || []),
        ],
        newAttachements: [],
      };
      const tasks = this.$store.state.tasks.map((task) => {
        if (task.id == this.$route.query.taskId) return { ...params };
        else return task;
      });

      this.$store.commit("UPDATE_TASKS", tasks);

      this.closeModal();
    },
    showAttachements() {
      this.$store.commit("TOGGLE_ATTACHEMENTS_MODAL", true);
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.formData.id);
      this.closeModal();
    },
    closeModal() {
      this.$refs.form.reset();
      this.$store.commit("TOGGLE_TASK_DETAILS_MODAL", false);
      this.$router.replace("/");
    },
  },
};
</script>

<style>
</style>