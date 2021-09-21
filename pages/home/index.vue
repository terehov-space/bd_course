<template>
  <v-row>
    <v-col cols="12">
      <v-card class="logo py-4 d-flex justify-center">
        <WorkerTask />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import WorkerTask from '~/components/worker/tasks.vue'

export default {
  components: {
    WorkerTask
  },
  layout: 'admin'
}
</script>
