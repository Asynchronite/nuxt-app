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
  <div>
    <div>
      <h1>
        Your Favorites
      </h1>
      <p>
        {{ favoriteSprings.length }} saved spring{{
          favoriteSprings.length === 1 ? "" : "s"
        }}
      </p>
    </div>
 
    <div v-if="favoriteSprings.length" class="flex flex-wrap gap-4">
      <SpringCard v-for="spring in favoriteSprings" :key="spring.id" :spring="spring" />
    </div>
 
    <div v-else>
      <p>
        No favorites yet. Browse springs and save the ones that catch your eye.
      </p>
      <NuxtLink to="/springs">
        Browse Hot Springs &rarr;
      </NuxtLink>
    </div>
  </div>
</template>