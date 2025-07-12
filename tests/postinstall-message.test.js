// tests/postinstall-message.test.js
import { execFileSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { afterEach, beforeEach, describe, expect, it } from "vitest"; // Import beforeEach and afterEach

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(__dirname, "../postinstall-message.js");

describe("postinstall-message.js", () => {
  let originalCIEnv;

  beforeEach(() => {
    // Store original CI env var state
    originalCIEnv = process.env.CI;
    // Temporarily set CI to 'false' for the test to ensure postinstall-message.js runs
    process.env.CI = "false";
  });

  afterEach(() => {
    // Restore original CI env var state after the test
    process.env.CI = originalCIEnv;
  });

  it("should run without errors and print key lines", () => {
    const output = execFileSync("node", [scriptPath]).toString();

    expect(output).toMatch(/Thank you for installing git-log-html-report/i);
    expect(output).toMatch(/git-log-html-report/);
    expect(output).toMatch(/Tip Me: https:\/\/eco-starfish-coder.com\/tip/);
  });
});
