<template>
  <v-row>
    <BoardList
      v-for="(board, index) in $store.state.stages"
      :key="`board-${index}`"
      :name="board.name"
      :id="board.id"
    />
  </v-row>
</template>

<script>
const components = {
  BoardList: () => import("@/components/BoardList.vue"),
};
export default {
  components,
};
</script>

<style>
</style>