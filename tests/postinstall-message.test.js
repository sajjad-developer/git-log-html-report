// tests/postinstall-message.test.js
import { execFileSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(__dirname, "../postinstall-message.js");

describe("postinstall-message.js", () => {
  // Test 1: Verify output when NOT in an automated test environment
  it("should print the welcome message when not in automated test environment", () => {
    const env = {
      ...process.env,
      GIT_LOG_HTML_REPORT_CI_TEST: "false", // explicitly false
    };

    // IMPORTANT: Remove CI variable completely to simulate non-CI environment
    delete env.CI;

    const output = execFileSync("node", [scriptPath], {
      env,
    }).toString();

    expect(output).toMatch(/Thank you for installing git-log-html-report/i);
    expect(output).toMatch(/git-log-html-report/);
    expect(output).toMatch(/Tip Me: https:\/\/eco-starfish-coder.com\/tip/);
  });

  // Test 2: Verify no output when in an automated test environment
  it("should NOT print the welcome message when in automated test environment", () => {
    const env = {
      ...process.env,
      GIT_LOG_HTML_REPORT_CI_TEST: "true",
      CI: "true",
    };

    const output = execFileSync("node", [scriptPath], {
      env,
    }).toString();

    expect(output).toBe("");
  });
});
