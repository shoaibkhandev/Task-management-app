<template>
  <div class="my-6" align="end">
    <v-btn
      @click="sidebar = !sidebar"
      color="blue darken-3"
      class="me-2"
      outlined
    >
      <v-icon left> mdi-feature-search-outline </v-icon>
      Search & Filter
    </v-btn>
    <FilterNavigationDrawer :sidebar.sync="sidebar" />
    <v-btn @click="dialog = true" color="blue darken-3" outlined>
      <v-icon left> mdi-plus </v-icon>
      Add Task
    </v-btn>
    <NewTaskModal :dialog.sync="dialog" />
  </div>
</template>

<script>
const components = {
  NewTaskModal: () => import("@/components/NewTaskModal.vue"),
  FilterNavigationDrawer: () => import("@/components/FilterNavigationDrawer.vue"),
};
export default {
  components,
  data: () => ({
    search: null,
    dialog: false,
    sidebar: false,
    searchFor: "Title",
    items: ["Title", "Description", "Label"],
  }),
};
</script>

<style>
</style>