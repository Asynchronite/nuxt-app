<script setup lang="ts">
import FoundBadge from '~/components/badges/search/FoundBadge.vue';
import LoadingStateBadge from '~/components/badges/search/LoadingStateBadge.vue';
import NotFoundBadge from '~/components/badges/search/NotFoundBadge.vue';

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
    </div>
 
    <!-- Loading state -->
    <div v-if="status === 'pending'">
      <LoadingStateBadge />
    </div>
 
    <!-- Results -->
    <div v-else-if="springs?.length">
      <p class="mb-1.5">
        <FoundBadge :count="springs.length" />
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SpringCard v-for="spring in springs" :key="spring.id" :spring="spring" />
      </div>
    </div>
 
    <!-- Empty state -->
    <div v-else>
      <NotFoundBadge />
    </div>
  </div>
</template>