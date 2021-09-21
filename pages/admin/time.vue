<template>
  <v-row>
    <v-col cols="12">
      <v-card class="logo py-4 d-flex justify-center">
        <Time />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Time from '~/components/admin/time.vue'

export default {
  components: {
    Time
  },
  layout: 'admin'
}
</script>
