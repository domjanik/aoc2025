const day = process.argv[2];

if (!day) {
  console.error("Please provide a day number as an argument.");
  process.exit(1);
}

(async () => {
  try {
    await import(`./${day}/index.ts`);
  } catch (err) {
    console.error(`Failed to run day ${day}:`, err);
    process.exit(1);
  }
})();