<template>
  <v-row>
    <v-col cols="12">
      <v-card class="logo py-4 d-flex justify-center">
        <Tasks />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Tasks from '~/components/admin/tasks.vue'

export default {
  components: {
    Tasks
  },
  layout: 'admin'
}
</script>
