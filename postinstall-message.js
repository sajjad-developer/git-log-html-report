// postinstall-message.js
import chalk from "chalk";

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
