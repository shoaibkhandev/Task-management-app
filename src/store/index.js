import Vue from 'vue'
import Vuex from 'vuex'
import { tasks, chipLabels } from "../inputs";
import { STAGES } from "../utils/constants";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks,
    stages: STAGES,
    chipLabels,
    taskDetailsModal: false,
    attachementsModal: false
  },
  getters: {
    noOfPendingTasks(state) {
      return state.tasks.filter(task => task.stage === 1).length
    },
    noOfProcessingTasks(state) {
      return state.tasks.filter(task => task.stage === 2).length
    },
    noOfDoneTasks(state) {
      return state.tasks.filter(task => task.stage === 3).length
    },
    totalTasks(state) {
      return state.tasks.length
    },
    percentageOfDoneTasks(_, getters) {
      if (!getters.totalTasks) return 0
      return Math.round((getters.noOfDoneTasks / getters.totalTasks) * 100)
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
    },
    TOGGLE_ATTACHEMENTS_MODAL(state, bool) {
      state.attachementsModal = bool
    }
  },
  actions: {
    deleteTask({ state, commit }, taskId) {
      const tasks = state.tasks.filter(task => task.id !== taskId)
      commit('UPDATE_TASKS', tasks)
    },
    forwardTask({ state, commit }, taskId) {
      const tasks = state.tasks.map((task) => {
        if (task.id == taskId) return { ...task, stage: Math.min(task.stage + 1, 3) };
        else return task;
      });
      commit('UPDATE_TASKS', tasks)
    },
    backwardTask({ state, commit }, taskId) {
      const tasks = state.tasks.map((task) => {
        if (task.id == taskId) return { ...task, stage: Math.max(task.stage - 1, 1) };
        else return task;
      });
      commit('UPDATE_TASKS', tasks)
    },
    tasksFilters({ state, commit }, filter) {
      const { field, search, startTime, endTime } = filter

      const [startHours, startMinutes] = startTime.split(':')
      const [endHours, endMinutes] = endTime.split(':')

      let tasks = state.tasks.filter(task => {
        const [hours, minutes] = task.estTime.split(':')
        return (hours >= startHours && hours <= endHours && minutes >= startMinutes && minutes <= endMinutes)
      })

      switch (field) {
        case 'title': {
          tasks = tasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
          break;
        }
        case 'description': {
          tasks = tasks.filter(task => task.description.toLowerCase().includes(search.toLowerCase()))
          break;
        }
        case 'label': {
          tasks = tasks.filter(task => task.labels.some(item => item.toLocaleLowerCase().includes(search.toLowerCase())))
          break;
        }
      }

      commit('UPDATE_TASKS', tasks)
    }
  },
  modules: {
  }
})
