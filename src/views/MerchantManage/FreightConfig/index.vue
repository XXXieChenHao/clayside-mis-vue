<template>
  <div>
    <el-card class="box-card">
      <v-above />
    </el-card>
    <el-card class="box-card">
      <v-below />
    </el-card>
  
  </div>
</template>

<script>
import Above from './above.vue'
import Below from './below.vue'
export default {
  name: 'FreightConfig',
  components: {
    'v-above': Above,
    'v-below': Below
  }
}
</script>

<style>

</style>