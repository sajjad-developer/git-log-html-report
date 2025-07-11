import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { afterEach, describe, expect, it } from "vitest";

describe("git-log-html-report CLI", () => {
  it("should generate commit.html and commit.log files", () => {
    execSync("node git-log-html-report.js", { stdio: "inherit" });

    expect(existsSync("commit.html")).toBe(true);
    expect(existsSync("commit.log")).toBe(true);
  });

  afterEach(() => {
    let deleted = false;

    if (existsSync("commit.html")) {
      unlinkSync("commit.html");
      deleted = true;
    }

    if (existsSync("commit.log")) {
      unlinkSync("commit.log");
      deleted = true;
    }

    if (deleted) {
      console.log(
        "\n🧹 Cleaned up: commit.html and commit.log deleted after test.\n"
      );
    } else {
      console.log("\n🧹 No generated files found for cleanup.\n");
    }
  });
});
