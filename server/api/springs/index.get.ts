import type { Spring } from "~/types/spring";
import springs from "../../data/springs.json";

export default defineEventHandler((event) => {
  const query = getQuery(event);
 
  let results = springs as Spring[];
 
  // Filter by region
  if (query.region && typeof query.region === "string") {
    results = results.filter(
      (s) =>
        s.location.region.toLowerCase() ===
        query.region!.toString().toLowerCase()
    );
  }
 
  // Filter by type
  if (query.type && typeof query.type === "string") {
    results = results.filter((s) => s.type === query.type!.toString().toLowerCase());
  }
 
  // Search by name or description
  if (query.search && typeof query.search === "string") {
    const term = query.search.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
    );
  }
 
  return results;
});