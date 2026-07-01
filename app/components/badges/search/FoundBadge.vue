<script setup lang="ts">
const { count } = defineProps<{
  count: number;
}>();
</script>

<template>
  <NuxtBadge icon="i-lucide-search-check" size="md" color="success" variant="solid">
    Found {{ count }} {{ count === 1 ? 'result' : 'results' }}
  </NuxtBadge>
</template>
