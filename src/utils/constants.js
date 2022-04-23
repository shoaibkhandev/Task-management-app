export const DUMMY_BOARDS = [
    { id: 1, title: 'Task 1', description: "Task 1 description", labels: ['Important', 'New'], estTime: '01:05', attachements: [], stage: 1 },
    { id: 2, title: 'Task 2', description: "Task 2 description", labels: [], estTime: '10:04', attachements: [], stage: 1 },
    { id: 3, title: 'Task 3', description: "Task 3 description", labels: [], estTime: '08:00', attachements: [], stage: 1 },
    { id: 4, title: 'Done', description: "Task 2 description", labels: ['Important', 'Bug', 'Updated'], estTime: '21:55', attachements: [], stage: 3 },
]

export const STAGES = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Processing' },
    { id: 3, name: 'Done' }
]

export const CHIP_LABELS = ['Important', 'Bug', 'Task', 'Story', 'New', 'In Progress', 'Done']

export const LABELS_COLORS = ["primary", "blue", "green", "red", "yellow", "orange"]