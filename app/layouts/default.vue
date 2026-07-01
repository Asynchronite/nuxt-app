<template>
  <div class="flex min-h-screen flex-col">
    <header>
      <nav>
        <NavBar />
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <VueFooter />
  </div>
</template>
