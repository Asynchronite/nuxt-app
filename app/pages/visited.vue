<script setup lang="ts">
import type { Spring } from "~/types/spring";
 
definePageMeta({
  middleware: "auth",
});
 
const { data: visited } = await useFetch("/api/user/visited", {
  default: () => [],
});
 
const { data: allSprings } = await useFetch<Spring[]>("/api/springs", {
  default: () => [],
});
 
const visitedSprings = computed(() => {
  const visitedIds = new Set(
    visited.value?.map((v: { springId: string }) => v.springId) ?? []
  );
  return allSprings.value?.filter((s) => visitedIds.has(s.id)) ?? [];
});
 
const stats = computed(() => {
  const springs = visitedSprings.value;
  if (!springs.length) return null;
 
  const regions = new Set(springs.map((s) => s.location.region));
  const types = springs.reduce(
    (acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
 
  return {
    total: springs.length,
    regions: regions.size,
    hottest: Math.max(...springs.map((s) => s.temperature.max)),
    types,
  };
});
</script>

<template>
  <div>
    <div>
      <h1>
        Your Visited Springs
      </h1>
      <p>
        {{ visitedSprings.length }} spring{{
          visitedSprings.length === 1 ? "" : "s"
        }}
        visited
      </p>
    </div>

    <div v-if="stats" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      <div>
        <p>{{ stats.total }}</p>
        <p>Springs Visited</p>
      </div>
      <div>
        <p>{{ stats.regions }}</p>
        <p>Regions</p>
      </div>
      <div>
        <p>{{ stats.hottest }}°F</p>
        <p>Hottest Visited</p>
      </div>
      <div>
        <p>
          {{ stats.types.wild || 0 }}
        </p>
        <p>Wild Springs</p>
      </div>
    </div>

    <div v-if="visitedSprings.length" class="flex flex-wrap gap-4">
      <SpringCard v-for="spring in visitedSprings" :key="spring.id" :spring="spring" />
    </div>

    <div v-else>
      <p>
        No visited springs yet. Browse springs and mark the ones you've been to.
      </p>
      <NuxtLink to="/springs">
        Browse Hot Springs &rarr;
      </NuxtLink>
    </div>
  </div>
</template>