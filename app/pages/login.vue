<script setup lang="ts">
const { loggedIn } = useUserSession();
 
// Redirect if already logged in
if (loggedIn.value) {
  navigateTo("/springs");
}
 
const route = useRoute();
const hasError = computed(() => route.query.error === "auth");
</script>
 
<template>
  <div>
    <h1>Log In</h1>
    <p>
      Sign in with GitHub to save favorites, track visited springs, and leave
      reviews.
    </p>
 
    <p v-if="hasError">
      Something went wrong with authentication. Please try again.
    </p>
 
    <NuxtButton
        :avatar="{
            src: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
            loading: 'lazy',
        }"
        size="md"
        color="neutral"
        variant="solid"
        to="/auth/github"
        external
    >
        Sign in with GitHub
    </NuxtButton>
  </div>
</template>