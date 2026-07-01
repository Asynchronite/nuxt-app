<script setup lang="ts">
const { data: springs, status } = await useFetch("/api/springs", {
  lazy: true,
  server: false,
});
</script>

<template>
  <div>
    <div>
      <h1>
        Browse Hot Springs
      </h1>
      <p>
        {{ springs?.length ?? 0 }} springs found
      </p>
    </div>
 
    <!-- Loading state -->
    <div v-if="status === 'pending'">
      Loading springs...
    </div>
 
    <!-- Results -->
    <div v-else-if="springs?.length">
      <SpringCard v-for="spring in springs" :key="spring.id" :spring="spring" />
    </div>
 
    <!-- Empty state -->
    <div v-else>
      No springs match your filters. Try broadening your search.
    </div>
  </div>
</template>