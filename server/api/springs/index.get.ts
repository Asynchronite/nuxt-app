import type { Spring } from "~/types/spring";
import springs from "../../data/springs.json";

export default defineEventHandler((event) => {
    return springs as Spring[];
})