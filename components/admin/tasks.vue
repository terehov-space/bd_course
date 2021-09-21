<template>
  <v-row>
    <v-col cols="12" sm="12" class="d-flex justify-center align-center">
      <v-btn @click="getData">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn @click="newTask">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <template v-if="tasks">
      <v-col cols="12" sm="12">
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  Задача
                </th>
                <th class="text-left">
                  Исполнитель
                </th>
                <th class="text-left">
                  Оценка
                </th>
                <th class="text-left">
                  Потрачено времени
                </th>
                <th class="text-left">
                  Оценка деятельности
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="task in tasks"
                :key="task.id"
                @click="editTask(task)"
              >
                <td>{{ task.title }}</td>
                <td>{{ task.worker }}</td>
                <td>{{ task.grade }}</td>
                <td>{{ task.hours }}</td>
                <td>{{ task.performance }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </template>
    <v-dialog
      v-model="showModal"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">
            <template v-if="edit">
              Изменить задачу
            </template>
            <template v-else>
              Новая задача
            </template>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="editableTask">
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editableTask.title"
                    label="Название"
                    :rules="required"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="editableTask.description"
                    label="Описание"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editableTask.grade"
                    label="Оценка"
                    :rules="required"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="editableTask.workerId"
                    :items="workers"
                    item-text="title"
                    item-value="id"
                    label="Исполнитель"
                    :rules="requiredSelect"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="closeTaskModal"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveTask"
          >
            <template v-if="edit">
              Изменить
            </template>
            <template v-else>
              Добавить
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Tasks',
  data () {
    return {
      tasks: null,
      workers: null,
      showModal: false,
      editableTask: {
        title: null,
        description: null,
        grade: null,
        workerId: null,
        id: null
      },
      edit: false,
      valid: true,
      required: [
        v => !!v || 'Поля обязательно для заполнения'
      ],
      requiredSelect: [
        v => !!v || 'Поля обязательно для заполнения'
      ]
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      const data = await this.$axios.$get('/api/admin/tasks')
      this.tasks = data
    },

    async getUsers () {
      const data = await this.$axios.$get('/api/admin/tasks/workers')
      this.workers = data
    },

    validate () {
      return this.$refs.editableTask.validate()
    },

    async saveTask () {
      this.showModal = false
      let error = false
      if (this.editableTask.id) {
        const data = await this.$axios.$put('/api/admin/tasks', this.editableTask)

        error = data.error
      } else {
        const data = await this.$axios.$post('/api/admin/tasks', this.editableTask)

        error = data.error
      }

      if (error) {
        alert(error)
        this.showModal = true
      } else {
        await this.getData()

        this.resetForm()
      }
    },

    resetForm () {
      this.editableTask.id = null
      this.editableTask.title = null
      this.editableTask.description = null
      this.editableTask.grade = null
      this.editableTask.workerId = null

      this.$refs.editableTask.resetValidation()
    },

    closeTaskModal () {
      this.resetForm()

      this.showModal = false
    },

    async editTask (task) {
      await this.getUsers()
      this.edit = true
      this.editableTask = Object.assign({}, task)

      this.showModal = true
    },

    async newTask () {
      await this.getUsers()
      this.edit = false

      this.showModal = true
    }
  }
}
</script>
