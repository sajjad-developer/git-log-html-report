// postinstall-message.js
import chalk from "chalk";

// Use a custom environment variable for conditional logic.
// This is more reliable as CI systems are less likely to override it.
// Also keep process.env.CI check as a fallback for general CI detection.
if (process.env.CI || process.env.GIT_LOG_HTML_REPORT_CI_TEST === "true") {
  process.exit(0);
}

console.log(
  chalk.cyan("✨ Thank you for installing git-log-html-report!") +
    "\n\n" +
    chalk.green("📦 To generate a styled HTML report from your Git history:") +
    "\n" +
    chalk.yellow("👉 Just run ") +
    chalk.bold("git-log-html-report") +
    chalk.yellow(" inside any Git repository.") +
    "\n\n" +
    chalk
      .bgHex("#00b9fe")
      .hex("#fff")
      .bold(" ☕ Tip Me: https://eco-starfish-coder.com/tip ") +
    "\n"
);
