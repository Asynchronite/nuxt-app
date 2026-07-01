<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">
          Hot Springs Finder
        </NuxtLink>
        <div>
          <NuxtLink to="/springs">
            Browse
          </NuxtLink>
          <!-- Auth links will go here -->
        </div>
      </nav>
    </header>
 
    <main>
      <slot />
    </main>
 
    <footer>
      Hot Springs Finder &mdash; Built with Nuxt
    </footer>
  </div>
</template>