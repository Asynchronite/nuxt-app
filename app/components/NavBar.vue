<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Home',
    icon: 'i-lucide-home',
    to: '/'
  },
  {
    label: 'Browse',
    icon: 'i-lucide-search',
    to: '/springs'
  }
])
</script>

<template>
  <NuxtNavigationMenu
    :items="items"
    class="justify-center w-full"
    :ui="{ link: 'text-lg gap-2', linkLeadingIcon: 'size-6', item: 'py-3' }"
  />
</template>
