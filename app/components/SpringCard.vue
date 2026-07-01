<script setup lang="ts">
import type { Spring } from "~/types/spring";
 
const props = defineProps<{
  spring: Spring;
}>();
 
const temperatureLabel = computed(() => {
  return `${props.spring.temperature.min}–${props.spring.temperature.max}°F`;
});
</script>