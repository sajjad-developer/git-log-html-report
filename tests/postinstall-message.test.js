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
    // Temporarily set CI to 'false' for the test to ensure postinstall-message.js runs
    // This allows the test to always receive output from postinstall-message.js
    process.env.CI = "false";
  });

  afterEach(() => {
    // Restore original CI env var state after each test
    process.env.CI = originalCIEnv; // Restore the original value
  });

  it("should run without errors and print key lines", () => {
    // Execute the postinstall-message.js script
    const output = execFileSync("node", [scriptPath]).toString();

    // Assert that the output matches the expected messages
    expect(output).toMatch(/Thank you for installing git-log-html-report/i);
    expect(output).toMatch(/git-log-html-report/);
    expect(output).toMatch(/Tip Me: https:\/\/eco-starfish-coder.com\/tip/);
  });
});
