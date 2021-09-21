<template>
  <v-row>
    <v-col cols="12">
      <v-card class="logo py-4 d-flex justify-center">
        <Workers />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Workers from '~/components/admin/workers.vue'

export default {
  components: {
    Workers
  },
  layout: 'admin'
}
</script>
