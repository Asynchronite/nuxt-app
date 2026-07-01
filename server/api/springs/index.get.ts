import type { Spring } from "~/types/spring";
import springs from "../../data/springs.json";

export default defineEventHandler(async (event) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return springs as Spring[];
})