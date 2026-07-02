<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
const toast = useToast();
const { loggedIn, user, clear } = useUserSession();

function successfulLogout() {
  toast.add({
    title: 'Logged Out',
    description: 'You have been logged out successfully.',
  });
}

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
  },
  {
    label: 'Browse',
    icon: 'i-lucide-search',
    to: '/springs',
  },
  ...(loggedIn.value
    ? [
        {
          label: 'Favorites',
          icon: 'i-lucide-heart',
          to: '/favorites',
        },
        {
          label: 'Visited',
          icon: 'i-lucide-user',
          to: '/visited',
        },
        {
          label: 'Log Out',
          icon: 'i-lucide-log-out',
          onSelect: async () => {
            await clear();
            await navigateTo('/');
            successfulLogout();
          },
        },
      ]
    : [
        {
          label: 'Log In',
          icon: 'i-lucide-log-in',
          to: '/login',
        },
      ]),
])
</script>

<template>
  <NuxtNavigationMenu
    :items="items"
    class="justify-center w-full"
    :ui="{ link: 'text-lg gap-2', linkLeadingIcon: 'size-6', item: 'py-3' }"
  />
</template>
