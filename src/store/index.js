import Vue from 'vue'
import Vuex from 'vuex'
import { DUMMY_BOARDS, STAGES, CHIP_LABELS } from "../utils/constants";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: DUMMY_BOARDS,
    stages: STAGES,
    chipLabels: CHIP_LABELS,
    taskDetailsModal: false
  },
  getters: {
    NoOfPendingTasks(state) {
      return state.tasks.filter(task => task.stage === 1).length
    },
    NoOfProcessingTasks(state) {
      return state.tasks.filter(task => task.stage === 2).length
    },
    NoOfDoneTasks(state) {
      return state.tasks.filter(task => task.stage === 3).length
    },
    totalTasks(state) {
      return state.tasks.length
    },
    percentageOfDoneTasks(_, getters) {
      if (!getters.totalTasks) return 0
      return Math.round((getters.NoOfDoneTasks / getters.totalTasks) * 100)
    },
  },
  mutations: {
    ADD_NEW_TASK(state, task) {
      state.tasks.push(task)
    },
    UPDATE_TASKS(state, tasks) {
      state.tasks = tasks
    },
    TOGGLE_TASK_DETAILS_MODAL(state, bool) {
      state.taskDetailsModal = bool
    }
  },
  actions: {
    deleteTask({ state, commit }, taskId) {
      const tasks = state.tasks.filter(task => task.id !== taskId)
      commit('UPDATE_TASKS', tasks)
    },
    forwardTask({ state, commit }, taskId) {
      const tasks = state.tasks.map((task) => {
        if (task.id == taskId) return { ...task, stage: task.stage == 3 ? 3 : task.stage + 1 };
        else return task;
      });
      commit('UPDATE_TASKS', tasks)
    },
    backwardTask({ state, commit }, taskId) {
      const tasks = state.tasks.map((task) => {
        if (task.id == taskId) return { ...task, stage: task.stage == 1 ? 1 : task.stage - 1 };
        else return task;
      });
      commit('UPDATE_TASKS', tasks)
    }
  },
  modules: {
  }
})
