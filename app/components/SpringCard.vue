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
    <div>
      <div>
        <h3>
          {{ spring.name }}
        </h3>
        <span>
          {{ spring.type }}
        </span>
      </div>
 
      <p>
        {{ spring.description.slice(0, 120) }}...
      </p>
 
      <div>
        <span>{{ spring.location.region }}, {{ spring.location.country }}</span>
        <span>{{ temperatureLabel }}</span>
        <span>{{ spring.elevation.toLocaleString() }} ft</span>
      </div>
    </div>
  </NuxtLink>
</template>