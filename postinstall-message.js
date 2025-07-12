// postinstall-message.js
import chalk from "chalk";

// Check if the CI environment variable is set to a truthy value.
// This is a common practice to detect automated environments like GitHub Actions,
// Packagephobia, etc.
if (process.env.CI) {
  // If in a CI environment, exit silently.
  // This prevents unnecessary output during automated installs and prevents
  // Packagephobia from failing due to unexpected output or behavior.
  process.exit(0);
}

// If not in a CI environment, print the welcome message as intended for local users.
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
