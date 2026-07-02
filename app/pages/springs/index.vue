<script setup lang="ts">
  import FoundBadge from '~/components/badges/search/FoundBadge.vue';
  import LoadingStateBadge from '~/components/badges/search/LoadingStateBadge.vue';
  import NotFoundBadge from '~/components/badges/search/NotFoundBadge.vue';

  const search = ref("");
  const debouncedSearch = ref("");
  const region = ref("");
  const type = ref("");

  let searchDebounceTimer: ReturnType<typeof setTimeout>;
  watch(search, (value) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      debouncedSearch.value = value;
    }, 400);
  });

  const queryParams = computed(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch.value) params.search = debouncedSearch.value;
    if (region.value) params.region = region.value;
    if (type.value) params.type = type.value;
    return params;
  });
  
  const regions = [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Latin America",
    "Antarctica",
  ];
  
  const types = ["Wild", "Developed", "Resort"];

  const { data: springs, status } = await useFetch("/api/springs", {
    query: queryParams,
    lazy: true,
    server: false,
  });
</script>

<template>
  <div>
    <div>
      <h1>
        Browse Hot Springs
      </h1>
    </div>

    <div class="flex mb-2">
      <NuxtInput v-model="search" type="text" placeholder="Search by name" class="mr-1"/>

      <NuxtButton icon="i-lucide-trash" size="md" color="error" variant="ghost" @click="search = ''; region = ''; type = ''">
        Clear filters
      </NuxtButton>
    </div>

    <div class="flex mb-2">
      <NuxtSelectMenu v-model="region" placeholder="All regions" :items="regions" class="mr-1.5" />
 
      <NuxtSelectMenu v-model="type" placeholder="All types" :items="types" />
    </div>
 
    <!-- Loading state -->
    <div v-if="status === 'pending' || status === 'idle'">
      <LoadingStateBadge />
    </div>
 
    <!-- Results -->
    <div v-else-if="springs?.length">
      <p class="mb-1.5">
        <FoundBadge :count="springs.length" />
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <LazySpringCard v-for="spring in springs" :key="spring.id" :spring="spring" />
      </div>
    </div>
 
    <!-- Empty state -->
    <div v-else>
      <NotFoundBadge />
    </div>
  </div>
</template>