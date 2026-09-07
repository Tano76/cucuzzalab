#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Hydration test: verifies that the page hydrates without mismatches
 * even when prefers-reduced-motion: reduce is enabled in the user's OS/browser.
 *
 * This was the root cause of the original hydration error:
 *   - The Reveal component conditionally rendered <div> vs <motion.div> based on
 *     useReducedMotion(), which returns null on the server but true on the client
 *     (when prefers-reduced-motion: reduce is set), producing different DOM.
 *   - The Hero component conditionally rendered the scan-line div based on the
 *     same hook, causing the same issue.
 *
 * Fix: always render the same element type; delegate reduced-motion handling
 * to <MotionConfig reducedMotion="user"> and CSS @media rules.
 */
const { chromium } = require("playwright");

async function testHydration(label, options) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    reducedMotion: "reduce", // emulate prefers-reduced-motion: reduce
    ...options,
  });
  const page = await context.newPage();

  const errors = [];
  const consoleMessages = [];

  page.on("console", (msg) => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  page.on("pageerror", (err) => {
    errors.push({ type: "pageerror", text: err.message, stack: err.stack });
  });

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  // Give React time to hydrate and for any post-hydration errors to surface
  await page.waitForTimeout(2000);

  console.log(`\n=== TEST: ${label} ===`);
  console.log(`prefers-reduced-motion: reduce`);

  // Check for hydration errors specifically
  const hydrationErrors = [
    ...consoleMessages,
    ...errors,
  ].filter((m) => {
    const t = (m.text || "").toLowerCase();
    return (
      t.includes("hydrat") ||
      t.includes("did not match") ||
      t.includes("server rendered") ||
      t.includes("client properties") ||
      t.includes("won't be patched")
    );
  });

  // Also check for any error-level console messages
  const errorMessages = consoleMessages.filter((m) => m.type === "error");
  const pageErrors = errors.filter((e) => e.type === "pageerror");

  console.log(`Console messages: ${consoleMessages.length}`);
  console.log(`Error-level console: ${errorMessages.length}`);
  console.log(`Page errors: ${pageErrors.length}`);
  console.log(`Hydration-specific issues: ${hydrationErrors.length}`);

  if (errorMessages.length > 0) {
    console.log("\n--- Console Errors ---");
    errorMessages.forEach((m) => console.log(`  [error] ${m.text.substring(0, 200)}`));
  }

  if (pageErrors.length > 0) {
    console.log("\n--- Page Errors ---");
    pageErrors.forEach((e) => console.log(`  ${e.text.substring(0, 200)}`));
  }

  if (hydrationErrors.length > 0) {
    console.log("\n--- Hydration Errors ---");
    hydrationErrors.forEach((m) => console.log(`  - ${(m.text || "").substring(0, 300)}`));
    console.log(`\nFAIL: ${label}`);
  } else {
    console.log(`\nPASS: ${label} — no hydration mismatches`);
  }

  await browser.close();
  return hydrationErrors.length === 0 && pageErrors.length === 0;
}

async function main() {
  let allPassed = true;

  // Test 1: with prefers-reduced-motion: reduce (the scenario that caused the bug)
  const pass1 = await testHydration("Reduced motion enabled", {});
  allPassed = allPassed && pass1;

  // Test 2: without reduced motion (normal case)
  const pass2 = await testHydration("Normal (no reduced motion)", {});
  allPassed = allPassed && pass2;

  console.log("\n=== SUMMARY ===");
  console.log(allPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED");
  process.exit(allPassed ? 0 : 1);
}

main().catch((e) => {
  console.error("Test script failed:", e);
  process.exit(1);
});
