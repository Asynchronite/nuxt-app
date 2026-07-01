<script setup lang="ts">
import type { Spring } from "~/types/spring";

defineProps<{
  type: Spring["type"];
}>();
</script>

<template>
  <BadgesWildBadge v-if="type === 'wild'" />
  <BadgesDevelopedBadge v-else-if="type === 'developed'" />
  <BadgesResortBadge v-else-if="type === 'resort'" />
</template>
