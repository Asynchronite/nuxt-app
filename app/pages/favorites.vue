<script setup lang="ts">
import type { Spring } from "~/types/spring";
 
definePageMeta({
  middleware: "auth",
});
 
const { data: favorites } = await useFetch("/api/user/favorites", {
  default: () => [],
});
 
const { data: allSprings } = await useFetch<Spring[]>("/api/springs", {
  default: () => [],
});
 
const favoriteSprings = computed(() => {
  const favoriteIds = new Set(
    favorites.value?.map((f: { springId: string }) => f.springId) ?? []
  );
  return allSprings.value?.filter((s) => favoriteIds.has(s.id)) ?? [];
});
</script>

<template>
  <div class="max-w-3xl mx-auto py-6">
    <h1 class="mb-6">Your Favorite Springs</h1>
    <div v-if="favoriteSprings.length === 0" class="text-muted">
      You haven't added any springs to your favorites yet.
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtCard
        v-for="spring in favoriteSprings"
        :key="spring.id"
        :to="`/springs/${spring.id}`"
      >
        <h2 class="mb-2">{{ spring.name }}</h2>
        <p class="text-muted">{{ spring.description }}</p>
      </NuxtCard>
    </div>
  </div>
</template>