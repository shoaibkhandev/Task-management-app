<template>
  <v-navigation-drawer width="400px" :value="sidebar" fixed right clipped>
    <v-list-item>
      <v-icon left @click="closeModal"> mdi-close-circle </v-icon>
      <v-list-item-title>Filters</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>
    <v-form ref="form" class="ma-3" style="height: calc(100vh - 140px)">
      <v-select
        v-model="filters.field"
        item-text="name"
        item-value="slug"
        :items="items"
        label="Task Fields*"
      ></v-select>

      <v-text-field
        v-model="filters.search"
        :rules="searchRules"
        label="Search for task*"
        clearable
      ></v-text-field>

      <v-menu
        v-model="startTimePicker"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="filters.startTime"
            label="Start Time*"
            prepend-icon="mdi-calendar"
            readonly
            :rules="startTimeRules"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-model="filters.startTime"
          :max="filters.endTime"
          format="ampm"
          @input="startTimePicker = false"
        ></v-time-picker>
      </v-menu>

      <v-menu
        v-model="endTimePicker"
        :close-on-content-click="false"
        transition="scale-transition"
        :nudge-right="40"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="filters.endTime"
            label="End Time*"
            prepend-icon="mdi-calendar"
            readonly
            :rules="endTimeRules"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-model="filters.endTime"
          :min="filters.startTime"
          format="ampm"
          @input="endTimePicker = false"
        ></v-time-picker>
      </v-menu>
    </v-form>
    <v-divider></v-divider>

    <v-col cols="12" class="d-flex justify-space-between" style="height: 50px">
      <v-btn color="primary" @click="submit" text>Apply</v-btn>
      <v-btn color="red darken-1" text> Reset </v-btn>
    </v-col>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    sidebar: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      filters: {
        field: "title",
        search: null,
        startTime: null,
        endTime: null,
      },
      endTimePicker: false,
      startTimePicker: false,
      items: [
        { name: "Title", slug: "title" },
        { name: "Description", slug: "description" },
        { name: "Label", slug: "label" },
      ],
      startTimeRules: [(v) => !!v || "Start time is required"],
      endTimeRules: [(v) => !!v || "End time is required"],
      searchRules: [(v) => !!v || "search is required"],
    };
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      this.$store.dispatch("tasksFilters", this.filters);
      this.closeModal();
    },
    closeModal() {
      this.$refs.form.reset();
      this.$emit("update:sidebar", false);
    },
  },
};
</script>

<style>
</style>