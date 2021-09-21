<template>
  <v-row>
    <v-col cols="12" sm="12" class="d-flex justify-center align-center">
      <v-btn @click="getData">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-col>
    <template v-if="times">
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
                  Затраты
                </th>
                <th class="text-left">
                  Статус
                </th>
                <th class="text-left">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="time in times"
                :key="time.id"
              >
                <td>{{ time.title }}</td>
                <td>{{ time.worker }}</td>
                <td>{{ time.hours }}</td>
                <td>{{ time.statusTitle }}</td>
                <td>
                  <v-btn :disabled="time.statusId != 1" @click="accept(time)">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn :disabled="time.statusId != 1" @click="decline(time)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: 'Time',
  data () {
    return {
      times: null
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      const data = await this.$axios.$get('/api/admin/time')
      this.times = data
    },
    async accept (time) {
      await this.$axios.$put(`/api/admin/time/${time.id}`)

      await this.getData()
    },
    async decline (time) {
      await this.$axios.$delete(`/api/admin/time/${time.id}`)

      await this.getData()
    }
  }
}
</script>
