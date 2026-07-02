<script setup lang="ts">
import type { Spring } from "~/types/spring";

const route = useRoute();
const { loggedIn } = useUserSession();

const toast = useToast();

const { data: spring, error } = await useFetch<Spring>(
  `/api/springs/${route.params.id}`
);

const { data: userVisited } = await useFetch("/api/user/visited", {
  default: () => [],
});

const { data: reviews, refresh: refreshReviews } = await useFetch(
  `/api/springs/${route.params.id}/reviews`,
  { default: () => [] }
);
 
const reviewBody = ref("");
 
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Spring not found",
  });
}

const { data: userFavorites } = await useFetch("/api/user/favorites", {
  default: () => [],
});
 
const isFavorite = computed(() =>
  userFavorites.value?.some(
    (f: { springId: string }) => f.springId === spring.value?.id
  )
);
 
async function toggleFavorite() {
  if (!spring.value) return;
  await $fetch<{ success: boolean }>(`/api/user/favorites/${spring.value.id}`, {
    method: isFavorite.value ? "DELETE" : "POST",
  });

  //@ts-ignore // odbija suradjivat jebiga
  userFavorites.value = await $fetch("/api/user/favorites");
}

async function submitReview() {
  if (!spring.value || !reviewBody.value.trim()) return;
  await $fetch(`/api/springs/${spring.value.id}/reviews`, {
    method: "POST",
    body: { body: reviewBody.value },
  });
  reviewBody.value = "";

  toast.add({
    title: "Review submitted",
    description: "Thank you for sharing your experience!",
  })

  await refreshReviews();
}
 
const isVisited = computed(() =>
  userVisited.value?.some(
    (v: { springId: string }) => v.springId === spring.value?.id
  )
);
 
async function toggleVisited() {
  if (!spring.value) return;
  await $fetch(`/api/user/visited/${spring.value.id}`, {
    method: isVisited.value ? "DELETE" : "POST",
  });
  userVisited.value = await $fetch("/api/user/visited");
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
    
    <div>
      <h2>Reviews</h2>
    
      <form v-if="loggedIn" @submit.prevent="submitReview" >
        <NuxtTextarea v-model="reviewBody" color="info" variant="subtle"  placeholder="Share your experience at this spring..." />
        <NuxtButton type="submit" :disabled="!reviewBody.trim()" class="flex flex-col gap-2 mb-4 mt-3">
          Submit Review
        </NuxtButton>
      </form>
    
      <div v-if="reviews?.length">
        <div v-for="review in reviews" :key="review.id">
          <div>
            <span>
              {{ review.author }}
            </span>
            <span>
              {{ new Date(review.createdAt).toLocaleDateString() }}
            </span>
          </div>
          <p>{{ review.body }}</p>
        </div>
      </div>
      <p v-else>
        No reviews yet. Be the first to share your experience.
      </p>
    </div>

    <div v-if="loggedIn">
      <NuxtButton
        @click="toggleFavorite"
        :variant="isFavorite ? 'solid' : 'outline'"
        color="primary"
        class="mt-4"
      >
        {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
      </NuxtButton>

      <NuxtButton
        @click="toggleVisited"
        :variant="isVisited ? 'solid' : 'outline'"
        color="success"
        class="mt-4 ml-2"
      >
        {{ isVisited ? 'Remove from Visited' : 'Add to Visited' }}
      </NuxtButton>
    </div>
  </div>
</template>