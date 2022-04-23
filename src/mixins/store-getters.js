import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'noOfDoneTasks',
            'totalTasks',
            'percentageOfDoneTasks'
        ])
    }
}