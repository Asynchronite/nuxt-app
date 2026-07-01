<script setup lang="ts">
import type { Spring } from "~/types/spring";
 
const testSpring: Spring = {
  id: "breitenbush-hot-springs",
  name: "Breitenbush Hot Springs",
  description:
    "Tucked into the Willamette National Forest, Breitenbush has been drawing seekers and soakers since the 1920s. The communal tubs sit above a rushing river.",
  location: { region: "Pacific Northwest", country: "US", lat: 44.78, lng: -121.98 },
  temperature: { min: 98, max: 112 },
  type: "developed",
  features: ["clothing-optional", "forest-setting"],
  elevation: 2200,
  imageUrl: "/images/springs/breitenbush-hot-springs.jpg",
};
</script>
 
<template>
  <div>
    <h1>
      Browse Hot Springs
    </h1>
    <div>
      <SpringCard :spring="testSpring" />
    </div>
  </div>
</template>