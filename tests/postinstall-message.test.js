// tests/postinstall-message.test.js
import { execFileSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(__dirname, "../postinstall-message.js");

describe("postinstall-message.js", () => {
  let originalCIEnv; // Declare a variable to store the original CI environment state

  beforeEach(() => {
    // Store original CI env var state before each test
    originalCIEnv = process.env.CI;
    // Temporarily set CI to 'false' for the test runner's process
    process.env.CI = "false";
  });

  afterEach(() => {
    // Restore original CI env var state after each test
    process.env.CI = originalCIEnv; // Restore the original value
  });

  it("should run without errors and print key lines", () => {
    // Execute the postinstall-message.js script
    // Pass the modified environment explicitly to the child process
    // This ensures the child process (postinstall-message.js) sees CI: 'false'
    const output = execFileSync("node", [scriptPath], {
      env: { ...process.env, CI: "false" }, // Pass all current env vars, but explicitly set CI to 'false'
    }).toString();

    // Assert that the output matches the expected messages
    expect(output).toMatch(/Thank you for installing git-log-html-report/i);
    expect(output).toMatch(/git-log-html-report/);
    expect(output).toMatch(/Tip Me: https:\/\/eco-starfish-coder.com\/tip/);
  });
});
