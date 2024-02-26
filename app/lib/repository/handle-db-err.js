export function handleDbErr(error) {
  console.error("Database Error:", error);
  throw new Error("Failed to fetch data");
}
