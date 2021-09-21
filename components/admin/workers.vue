<template>
  <v-row>
    <v-col cols="12" sm="12" class="d-flex justify-center align-center">
      <v-btn @click="getData">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn @click="newWorker">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <template v-if="users">
      <v-col cols="12" sm="12">
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  Имя
                </th>
                <th class="text-left">
                  Фамилия
                </th>
                <th class="text-left">
                  Телефон
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
                @click="editWorker(user)"
              >
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.phone }}</td>
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
              Изменить работника
            </template>
            <template v-else>
              Новый работник
            </template>
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="editableWorker">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editableWorker.lastName"
                    label="Фамилия"
                    :rules="required"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editableWorker.firstName"
                    label="Имя"
                    :rules="required"
                    required
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editableWorker.phone"
                    label="Телефон"
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
            @click="closeWorkerModal"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveWorker"
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
  name: 'Workers',
  data () {
    return {
      users: null,
      showModal: false,
      editableWorker: {
        firstName: null,
        lastName: null,
        phone: null,
        id: null
      },
      edit: false,
      valid: true,
      required: [
        v => !!v || 'Поля обязательно для заполнения',
        v => (v && v.length >= 2) || 'Поле должно состоять минимум из 2ух символов'
      ]
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      const data = await this.$axios.$get('/api/admin/workers')
      this.users = data
    },

    validate () {
      return this.$refs.editableWorker.validate()
    },

    async saveWorker () {
      if (this.$refs.editableWorker.validate()) {
        this.showModal = false
        let error = false
        if (this.editableWorker.id) {
          const data = await this.$axios.$put('/api/admin/workers', this.editableWorker)

          error = data.error
        } else {
          const data = await this.$axios.$post('/api/admin/workers', this.editableWorker)

          error = data.error
        }

        if (error) {
          alert(error)
          this.showModal = true
        } else {
          await this.getData()

          this.resetForm()
        }
      }
    },

    resetForm () {
      this.editableWorker.id = null
      this.editableWorker.firstName = null
      this.editableWorker.lastName = null
      this.editableWorker.phone = null

      this.$refs.editableWorker.resetValidation()
    },

    closeWorkerModal () {
      this.resetForm()

      this.showModal = false
    },

    editWorker (worker) {
      this.edit = true
      this.editableWorker = Object.assign({}, worker)

      this.showModal = true
    },

    newWorker () {
      this.edit = false

      this.showModal = true
    }
  }
}
</script>
