<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="800px">
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <span class="text-h5">Add new Task</span>
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
                <v-col cols="12">
                  <v-select
                    v-model="formData.stage"
                    :items="$store.state.stages"
                    item-text="name"
                    item-value="id"
                    label="Select board*"
                    :rules="stageRules"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="formData.labels"
                    :items="$store.state.chipLabels"
                    label="Lables"
                    chips
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="datePicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData.estTime"
                        label="Estimated Time*"
                        prepend-icon="mdi-calendar"
                        readonly
                        :rules="estTimeRules"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="formData.estTime"
                      format="ampm"
                      @input="datePicker = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>

                <v-col
                  cols="4"
                  v-for="(attachement, index) in attachements"
                  :key="`attachement-${index}`"
                >
                  <v-card>
                    <v-img height="150px" :src="attachement.src"></v-img>
                    <div class="d-flex justify-space-between align-center pa-2">
                      <div class="text-center text-subtitle-1">
                        {{ attachement.name }}
                      </div>
                      <v-icon
                        @click="removeAttachement(index)"
                        color="red darken-2"
                      >
                        mdi-delete-forever
                      </v-icon>
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12">
                  <v-file-input
                    v-model="formData.attachements"
                    accept="image/*"
                    @change="previewImages"
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
            <v-btn color="blue darken-1" text type="submit"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
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
  },
  data() {
    return {
      formData: {
        title: null,
        description: null,
        stage: null,
        estTime: null,
        labels: [],
        attachements: [],
      },
      attachements: [],
      datePicker: false,
      valid: true,
      titleRules: [(v) => !!v || "title is required"],
      stageRules: [(v) => !!v || "select a board"],
      descriptionRules: [(v) => !!v || "description is required"],
      estTimeRules: [(v) => !!v || "estimated time is required"],
    };
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      const params = {
        ...this.formData,
        id: this.$store.state.tasks.length + 1,
      };
      this.$store.commit("ADD_NEW_TASK", params);
      this.closeModal();
    },
    closeModal() {
      this.$refs.form.reset();
      this.$emit("update:dialog", false);
    },
    removeAttachement(index) {
      this.formData.attachements.splice(index, 1);
      this.attachements.splice(index, 1);
    },
    previewImages() {
      this.attachements = this.formData.attachements.map((file) => {
        return {
          src: URL.createObjectURL(file),
          name: file.name,
        };
      });
    },
  },
};
</script>

<style>
</style>