<script setup lang="ts">
const route = useRoute();
 
const { data: spring, error } = await useFetch(
  `/api/springs/${route.params.id}`
);
 
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Spring not found",
  });
}
</script>

<template>
  <div v-if="spring" class="max-w-3xl mx-auto py-6">
    <NuxtButton
      to="/springs"
      icon="i-lucide-arrow-left"
      variant="ghost"
      color="neutral"
      class="mb-4"
    >
      Back to all springs
    </NuxtButton>

    <div class="flex items-center gap-3">
      <h1 class="mb-0">
        {{ spring.name }}
      </h1>
      <BadgesSpringTypeBadge :type="spring.type" />
    </div>
    <p class="text-muted">
      {{ spring.description }}
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <NuxtCard>
        <div class="flex items-center gap-2 text-sm text-muted mb-1">
          <NuxtIcon name="i-lucide-map-pin" class="size-4" />
          Location
        </div>
        <p class="font-semibold mb-0">
          {{ spring.location.region }}, {{ spring.location.country }}
        </p>
      </NuxtCard>
      <NuxtCard>
        <div class="flex items-center gap-2 text-sm text-muted mb-1">
          <NuxtIcon name="i-lucide-thermometer" class="size-4" />
          Temperature
        </div>
        <p class="font-semibold mb-0">
          {{ spring.temperature.min }}–{{ spring.temperature.max }}°F
        </p>
      </NuxtCard>
      <NuxtCard>
        <div class="flex items-center gap-2 text-sm text-muted mb-1">
          <NuxtIcon name="i-lucide-mountain" class="size-4" />
          Elevation
        </div>
        <p class="font-semibold mb-0">
          {{ spring.elevation.toLocaleString() }} ft
        </p>
      </NuxtCard>
    </div>

    <div>
      <h2>
        Features
      </h2>
      <div class="flex flex-wrap gap-2">
        <NuxtBadge
          v-for="feature in spring.features"
          :key="feature"
          variant="subtle"
          color="neutral"
        >
          {{ feature }}
        </NuxtBadge>
      </div>
    </div>
  </div>
</template>