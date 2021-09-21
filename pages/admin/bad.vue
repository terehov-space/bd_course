<template>
  <v-row>
    <v-col cols="12">
      <v-card class="logo py-4 d-flex justify-center">
        <TimeBad />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TimeBad from '~/components/admin/timebad.vue'

export default {
  components: {
    TimeBad
  },
  layout: 'admin'
}
</script>
