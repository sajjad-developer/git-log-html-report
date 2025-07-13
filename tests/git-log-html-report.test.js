import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { afterEach, describe, expect, it } from "vitest";

describe("git-log-html-report CLI", () => {
  afterEach(() => {
    const files = ["commit.html", "commit.log"];
    let cleaned = false;

    for (const file of files) {
      if (existsSync(file)) {
        unlinkSync(file);
        cleaned = true;
      }
    }

    if (cleaned) {
      console.log("\n🧹 Cleaned up: commit.html and commit.log deleted.\n");
    } else {
      console.log("\n🧹 No generated files to clean up.\n");
    }
  });

  it("should generate commit.html and commit.log files", () => {
    // Run the CLI script
    execSync("node git-log-html-report.js", { stdio: "inherit" });

    // Assertions
    expect(existsSync("commit.html")).toBe(true);
    expect(existsSync("commit.log")).toBe(true);
  });
});
