<script setup lang="ts">
import type { Spring } from "~/types/spring";
 
const props = defineProps<{
  spring: Spring;
}>();
 
const temperatureLabel = computed(() => {
  return `${props.spring.temperature.min}–${props.spring.temperature.max}°F`;
});
</script>

<template>
  <NuxtLink :to="`/springs/${spring.id}`">
    <NuxtCard class="bg-gray-600 rounded-2xl p-4 mb-4">
      <div>
        <h3 class="underline flex items-center gap-1">
          {{ spring.name }}
          <NuxtIcon name="i-lucide-external-link" class="size-4" />
        </h3>
        <div>
          <BadgesSpringTypeBadge :type="spring.type" class="mr-1.5"/>
          <BadgesSpringRegionBadge :region="spring.location.region.toLowerCase()" />
        </div>
      </div>
 
      <p>
        {{ spring.description.slice(0, 120) }}...
      </p>
    </NuxtCard>
  </NuxtLink>
</template>