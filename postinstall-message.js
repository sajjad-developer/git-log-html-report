// postinstall-message.js
import chalk from "chalk";

// Detect if running in a CI environment (like Packagephobia's sandbox)
// process.env.CI is a common environment variable set in many CI/CD systems.
// process.env.NODE_ENV === 'test' is another common check.
// Packagephobia might set its own specific env var, but CI is a good general one.
if (process.env.CI || process.env.PACKAGEPHOBIA_TEST) {
  // PACKAGEPHOBIA_TEST is hypothetical, but CI is often set
  // console.log(chalk.gray("Skipping postinstall message in CI/automated environment."));
  process.exit(0); // Exit successfully without printing the message
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
