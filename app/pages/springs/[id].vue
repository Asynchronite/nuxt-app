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
  <div v-if="spring">
    <NuxtLink to="/springs">
      &larr; Back to all springs
    </NuxtLink>
 
    <div>
      <div>
        <h1>
          {{ spring.name }}
        </h1>
        <BadgesSpringTypeBadge :type="spring.type" />
      </div>
      <p>
        {{ spring.description }}
      </p>
    </div>
 
    <div>
      <div>
        <p>
          Location
        </p>
        <p>
          {{ spring.location.region }}, {{ spring.location.country }}
        </p>
      </div>
      <div>
        <p>
          Temperature
        </p>
        <p>
          {{ spring.temperature.min }}–{{ spring.temperature.max }}°F
        </p>
      </div>
      <div>
        <p>
          Elevation
        </p>
        <p>
          {{ spring.elevation.toLocaleString() }} ft
        </p>
      </div>
    </div>
 
    <div>
      <h2>
        Features
      </h2>
      <div>
        {{ spring.features.join(", ") }}
      </div>
    </div>
  </div>
</template>