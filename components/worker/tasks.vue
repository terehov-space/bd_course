<template>
  <v-row>
    <v-col cols="12" sm="12" class="d-flex justify-center align-center">
      <v-btn @click="getData">
        <v-icon>mdi-refresh</v-icon>
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
                  Описание
                </th>
                <th class="text-left">
                  Оценка
                </th>
                <th class="text-left">
                  Потрачено времени
                </th>
                <th class="text-left">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="task in tasks"
                :key="task.id"
              >
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.grade }}</td>
                <td>{{ task.hours }}</td>
                <td>
                  <v-btn @click="showTimeModal(task)">
                    <v-icon>mdi-clock-time-seven-outline</v-icon>
                  </v-btn>
                </td>
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
            Указать затраченное время
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="timeModal">
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    v-model="editableTime.comment"
                    label="Комментарий"
                    :rules="required"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="editableTime.hours"
                    label="Затраченное время"
                    :rules="required"
                    required
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
            @click="closeModal"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveTime"
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'WorkerTask',
  data () {
    return {
      tasks: null,
      showModal: false,
      editableTime: {
        comment: null,
        hours: null,
        workerId: null,
        taskId: null
      },
      required: [
        v => !!v || 'Поля обязательно для заполнения'
      ]
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      const data = await this.$axios.$post('/api/worker/tasks', { id: this.$store.state.worker.id })
      this.tasks = data
    },
    showTimeModal (task) {
      this.showModal = true

      this.editableTime.taskId = task.id
      this.editableTime.workerId = this.$store.state.worker.id
    },
    resetForm () {
      this.editableTime.taskId = null
      this.editableTime.workerId = null
      this.editableTime.hours = null
      this.editableTime.comment = null

      this.$refs.timeModal.resetValidation()
    },
    closeModal () {
      this.resetForm()

      this.showModal = false
    },
    async saveTime () {
      if (this.$refs.timeModal.validate()) {
        await this.$axios.post('/api/worker/time', this.editableTime)

        this.closeModal()
      }
    }
  }
}
</script>
