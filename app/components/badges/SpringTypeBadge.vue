<script setup lang="ts">
import type { Spring } from "~/types/spring";

defineProps<{
  type: Spring["type"];
}>();
</script>

<template>
  <BadgesSpringTypesWildBadge v-if="type === 'wild'" />
  <BadgesSpringTypesDevelopedBadge v-else-if="type === 'developed'" />
  <BadgesSpringTypesResortBadge v-else-if="type === 'resort'" />
</template>
