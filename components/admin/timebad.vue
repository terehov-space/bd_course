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
                  Исполнитель
                </th>
                <th class="text-left">
                  Отклоленные часы
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="time in times"
                :key="time.id"
              >
                <td>{{ time.worker }}</td>
                <td>{{ time.hours }}</td>
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
      const data = await this.$axios.$get('/api/admin/time/bad')
      this.times = data
    }
  }
}
</script>
