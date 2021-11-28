<template>
  <div v-for="i in totalToDisplay" :key="i" class="container">
    <nb-skeleton variant="circle"></nb-skeleton>
    <nb-skeleton variant="rect"></nb-skeleton>
    <nb-skeleton count="2"></nb-skeleton>
  </div>
</template>

<script>
export default {
  props: { totalToDisplay: Number }
}
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
