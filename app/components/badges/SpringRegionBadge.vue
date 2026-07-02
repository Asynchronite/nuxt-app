<script setup lang="ts">
import type { Spring } from "~/types/spring";

defineProps<{
  region: Spring["location"]["region"] | "";
}>();
</script>

<template>
  <BadgesSpringRegionsEuropeBadge v-if="region === 'europe'" />
  <BadgesSpringRegionsNorthAmericaBadge v-else-if="region === 'north america'" />
  <BadgesSpringRegionsAsiaPacificBadge v-else-if="region === 'asia-pacific'" />
  <BadgesSpringRegionsLatinAmericaBadge v-else-if="region === 'latin america'" />
  <BadgesSpringRegionsAntarcticaBadge v-else-if="region === 'antarctica'" />
</template>
