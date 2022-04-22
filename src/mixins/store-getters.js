import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'NoOfDoneTasks',
            'totalTasks',
            'percentageOfDoneTasks'
        ])
    }
}