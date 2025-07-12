// tests/postinstall-message.test.js
import { execFileSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it, vi } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const scriptPath = join(__dirname, "../postinstall-message.js");

describe("postinstall-message.js", () => {
  // Use vi.stubGlobal to mock the entire process object,
  // specifically its env property, for the duration of this test suite.
  // This ensures that when postinstall-message.js reads process.env.CI,
  // it gets the mocked value.
  vi.stubGlobal("process", {
    env: {
      ...process.env, // Keep existing environment variables
      CI: "false", // Explicitly set CI to 'false' for the test environment
    },
  });

  it("should run without errors and print key lines when not in CI", () => {
    // Execute the postinstall-message.js script.
    // It should now print its message because process.env.CI is mocked to 'false'.
    const output = execFileSync("node", [scriptPath]).toString();

    // Assert that the output matches the expected messages
    expect(output).toMatch(/Thank you for installing git-log-html-report/i);
    expect(output).toMatch(/git-log-html-report/);
    expect(output).toMatch(/Tip Me: https:\/\/eco-starfish-coder.com\/tip/);
  });

  // Add a test to ensure it *does not* print when CI is true
  it("should NOT print the welcome message when in CI", () => {
    // Execute the postinstall-message.js script with CI explicitly set to 'true'.
    // This tests the conditional logic within postinstall-message.js itself.
    const output = execFileSync("node", [scriptPath], {
      env: { ...process.env, CI: "true" },
    }).toString();

    // Assert that the output is empty
    expect(output).toBe("");
  });
});
