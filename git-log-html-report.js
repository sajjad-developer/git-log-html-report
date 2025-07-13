#!/usr/bin/env node

// Project Commit Log HTML Generator

import AnsiToHtml from "ansi-to-html";
import chalk from "chalk"; // ✅ Add colorful terminal output
import { execSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

// Detect debug flag
const args = process.argv.slice(2);
const isDebug = args.includes("--debug");

const welcomeFile = path.join(os.homedir(), ".git-log-html-report-welcome");

if (isDebug) {
  console.log("Welcome file path:", welcomeFile);
}

// Function to check if welcome message was shown before by checking a flag file
const checkWelcomeMessage = () => {
  const homeDir = os.homedir();
  const flagFile = path.join(homeDir, ".git-log-html-report-welcome");

  try {
    if (fs.existsSync(flagFile)) {
      // Flag file exists, so not first run — don't show welcome message
      return false;
    } else {
      // Flag file missing, first run — show welcome message and create file
      fs.writeFileSync(flagFile, "Welcome message shown");
      return true;
    }
  } catch (err) {
    // On error, fail safely by showing welcome message
    return true;
  }
};

// Show welcome message only on first run
if (checkWelcomeMessage()) {
  console.log(
    chalk.bgBlueBright.black.bold(
      "\n✨ Thank you for installing `git-log-html-report`!"
    )
  );
  console.log(
    chalk.bgBlueBright.black.bold("🚀 Hope it boosts your Git workflow!")
  );
  console.log(); // Spacer

  console.log(
    chalk.bgBlueBright.black.bold(
      "💡 Saved you time or improved your productivity?"
    )
  );
  console.log(
    chalk.bgBlueBright.black.bold("❤️  Consider supporting its development:")
  );
  console.log(); // Spacer

  const tipText =
    "  💛  ☕ Tip the Developer → https://eco-starfish-coder.com/tip  💛  ";
  const border = " ".repeat(tipText.length);

  console.log(chalk.bgHex("#ffcc00").hex("#000000").bold(border));
  console.log(chalk.bgHex("#ffcc00").hex("#000000").bold(tipText));
  console.log(chalk.bgHex("#ffcc00").hex("#000000").bold(border));
  console.log(); // Final spacer
}

console.log(chalk.bold.cyan("\n📘 Git Commit Log Report Generator\n")); // ✅ Intro banner

// Get remote repo URL for commit links
const getRemoteRepoUrl = () => {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
  } catch {
    console.error(
      "❌ Not a Git repository. Please run this inside a Git repo."
    );
    return "";
  }

  try {
    let url = execSync("git remote get-url origin", {
      encoding: "utf8",
    }).trim();
    if (!url) return "";

    if (url.startsWith("http")) {
      if (url.endsWith(".git")) url = url.slice(0, -4);
      return `${url}/commit/`;
    }

    const sshMatch = url.match(/git@([^:]+):(.+)\.git/);
    if (sshMatch) {
      const [, host, path] = sshMatch;
      return `https://${host}/${path}/commit/`;
    }

    console.warn(`⚠️ Unrecognized remote URL format: ${url}`);
    return "";
  } catch (err) {
    console.error("❌ Error getting remote URL:", err.message);
    return "";
  }
};

const GITHUB_COMMIT_URL = getRemoteRepoUrl();
if (!GITHUB_COMMIT_URL) {
  console.warn(chalk.yellow("⚠️ Remote URL not detected...")); // ✅ Improve warning color
}

// Include both local and remote commits
// FIXED: Ensured --pretty=format string is on a single logical line to avoid shell interpretation issues
const GIT_LOG_CMD = `git --no-pager log origin/main HEAD --pretty=format:"%C(bold)Commit:%Creset %C(brightred)%H%Creset %n%C(bold)ISO Author Date:%Creset %C(brightblue)%aI%Creset %n%C(bold)Relative Author Date:%Creset %C(brightgreen)%ar%Creset %n%C(bold)Subject:%Creset %s %n%C(bold)Body:%Creset %C(brightblue)%b%Creset %n---%n" --color > commit.log`;

const convert = new AnsiToHtml({ escapeXML: false });

// Corrected escapeHtml: removed incorrect ">" replacement
const escapeHtml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;"); // This should be correct now

const stripAnsi = (str = "") => str.replace(/\x1b\[[0-9;]*m/g, "");

// Get remote commit hashes
const getRemoteHashes = () => {
  try {
    // Crucial for ensuring origin/main is up-to-date with the actual remote
    console.log(chalk.cyan("🔄 Fetching remote commit hashes...")); // ✅ fetch progress

    execSync("git fetch origin", { stdio: "ignore" });
    const remoteOutput = execSync("git rev-list origin/main", {
      encoding: "utf8",
    });

    console.log(chalk.green("✅ Remote commit hashes fetched.\n")); // ✅ fetch success
    return new Set(remoteOutput.trim().split("\n"));
  } catch (err) {
    console.warn(chalk.yellow("⚠️ Could not fetch remote commits.")); // ✅ fetch failed
    return new Set();
  }
};

// Get local commit hashes
const getLocalHashes = () => {
  try {
    console.log(chalk.cyan("🔄 Fetching local commit hashes...")); // ✅ progress message

    const localOutput = execSync("git rev-list HEAD", { encoding: "utf8" });

    console.log(chalk.green("✅ Local commit hashes fetched.\n")); // ✅ success message
    return new Set(localOutput.trim().split("\n"));
  } catch (err) {
    console.error(chalk.red("❌ Could not get local commit hashes.")); // ✅ Red for error
    return new Set();
  }
};

const REMOTE_HASHES = getRemoteHashes();
const LOCAL_HASHES = getLocalHashes();

const generateGitLog = () => {
  try {
    console.log(chalk.cyan("📜 Generating commit.log...")); // start message

    execSync(GIT_LOG_CMD, { stdio: "inherit", shell: true });

    console.log(chalk.green("✅ commit.log generated.")); // success message
  } catch (err) {
    console.error(
      chalk.red(
        "❌ Failed to run git log. Ensure Git is installed and there are commits."
      )
    );
    process.exit(1);
  }
};

const convertGitLogToHtml = () => {
  try {
    console.log(chalk.cyan("🛠️  Converting commit.log to commit.html...")); // ✅ html conversion start

    const log = fs.readFileSync("./commit.log", "utf-8");
    const commits = log.split("\n---\n").filter(Boolean);
    const totalCommits = commits.length; // Already calculated, just need to display it!

    const commitBlocks = commits.map((block, index) => {
      const commitNumber = totalCommits - index;
      const lines = block.split("\n");
      const bodyIndex = lines.findIndex((l) =>
        stripAnsi(l).startsWith("Body:")
      );
      const mainLines = bodyIndex >= 0 ? lines.slice(0, bodyIndex) : lines;

      const body =
        bodyIndex >= 0
          ? lines
              .slice(bodyIndex)
              .map(stripAnsi)
              .join("\n")
              .replace(/^Body:\s*/i, "")
              .trim()
          : "";

      const mainHtml = mainLines
        .map((line) => {
          const clean = stripAnsi(line);

          if (clean.startsWith("Commit:")) {
            const hash = clean.match(/Commit:\s*([0-9a-f]+)/i)?.[1] || "";
            const shortHash = hash.slice(0, 7);
            const commitLink = GITHUB_COMMIT_URL
              ? `${GITHUB_COMMIT_URL}${hash}`
              : "";

            const isInLocal = LOCAL_HASHES.has(hash);
            const isInRemote = REMOTE_HASHES.has(hash);

            // Determine commit status labels, classes, and ICONS (Using Font Awesome)
            let localClass,
              localText,
              localIcon,
              remoteClass,
              remoteText,
              remoteIcon;

            if (!isInLocal && isInRemote) {
              // Commit exists on remote (e.g., pushed directly, or not yet pulled locally)
              localClass = "local not-in-local";
              localText = "Not in Your Local Branch (yet)";
              localIcon = '<i class="fa-solid fa-cloud-arrow-down"></i>'; // Cloud with down arrow for pull
              remoteClass = "remote fetched-remote";
              remoteText = "Exists on Remote (Awaiting Pull)";
              remoteIcon = '<i class="fa-solid fa-cloud-arrow-down"></i>'; // Same as local for this state, as it's remote and needs pulling
            } else if (isInLocal && !isInRemote) {
              // Commit only in local (not pushed)
              localClass = "local";
              localText = "Exists in Your Local Branch";
              localIcon = '<i class="fa-solid fa-code-branch"></i>'; // Branch icon for local
              remoteClass = "remote not-pushed";
              remoteText = "Not Pushed to Remote Repo";
              remoteIcon = '<i class="fa-solid fa-arrow-up-from-bracket"></i>'; // Arrow up from bracket (push icon)
            } else if (isInLocal && isInRemote) {
              // Commit in both local and remote (synced)
              localClass = "local";
              localText = "Exists in Your Local Branch";
              localIcon = '<i class="fa-solid fa-check"></i>'; // Simple check for local existence
              remoteClass = "remote pushed";
              remoteText = "Pushed to Remote Repo";
              // DEBUGGING STEP: Using a known working icon to test if it renders
              remoteIcon = '<i class="fa-solid fa-check"></i>'; // Changed to generic checkmark for testing
            } else {
              // Commit neither in local nor remote (very rare, potentially problematic state)
              localClass = "local unknown-status";
              localText = "Status Unknown / Not Found Locally";
              localIcon = '<i class="fa-solid fa-question"></i>';
              remoteClass = "remote unknown-status";
              remoteText = "Status Unknown / Not Found Remotely";
              remoteIcon = '<i class="fa-solid fa-question"></i>';
            }

            const commitLineHtml = `
<div class="commit-line">
    <span class="label">Commit:</span>
    ${
      commitLink
        ? `<span class="commit-link-wrapper">
                    <a href="${commitLink}" class="commit-link" target="_blank" rel="noopener noreferrer">${shortHash}</a>
                    <span class="commit-link-tooltip">
                      View commit <span class="hash">${shortHash}</span> on remote repository
                    </span>
                </span>
                <button class="copy-link" data-link="${commitLink}" data-full-hash="${hash}" aria-label="Copy commit link to clipboard" title="">
                  🔗
                  <span class="custom-tooltip">Copy <span class="hash">${shortHash}</span> commit link</span>
                </button>`
        : escapeHtml(shortHash)
    }
</div>`;

            const statusLineHtml = `
<div class="commit-status-line" aria-label="Commit status">
    <span class="commit-status ${localClass}" title="${localText}">
        <span class="icon">${localIcon}</span> <span class="text">${localText}</span>
    </span>
    <span class="commit-status ${remoteClass}" title="${remoteText}">
        <span class="icon">${remoteIcon}</span> <span class="text">${remoteText}</span>
    </span>
</div>`;

            return commitLineHtml + statusLineHtml;
          }

          if (clean.startsWith("ISO Author Date:")) {
            const val = clean.replace("ISO Author Date:", "").trim();
            return `<div class="commit-line">ISO Author Date: <span class="iso-date">${escapeHtml(
              val
            )}</span></div>`;
          }

          if (clean.startsWith("Relative Author Date:")) {
            const val = clean.replace("Relative Author Date:", "").trim();
            return `<div class="commit-line">Relative Author Date: <span class="relative-date">${escapeHtml(
              val
            )}</span></div>`;
          }

          if (clean.startsWith("Subject:")) {
            const val = clean.replace("Subject:", "").trim();
            return `<div class="commit-line">Subject: <span class="subject-value">${escapeHtml(
              val
            )}</span></div>`;
          }

          return `<div class="commit-line">${escapeHtml(clean)}</div>`;
        })
        .join("\n");

      const ansiConverted = convert.toHtml(mainHtml);

      const bodyHtml = body
        ? `<div class="commit-body-wrapper">
                    <div class="commit-body-label">📝 Body</div>
                    <pre class="commit-body">${escapeHtml(body)}</pre>
                </div>`
        : "";

      return `<div class="commit-block" role="listitem" tabindex="0">
        <div class="commit-number">Commit #${commitNumber}</div>
        ${ansiConverted}
        ${bodyHtml}
      </div>`;
    });

    const isoTs = new Date().toISOString();
    const localTs = new Date().toLocaleString();

    const finalHtml = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="UTF-8" />
<title>Project Commit Log</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
  :root {
    --btn-bg: #e0e0e0;
    --btn-fg: #111;
    --link: #d6336c;

    --bg: #fff;
    --fg: #111;
    --link-hover: #9b1c3a;
    --border: #ccc;
    --iso-color: #0d6efd;
    --iso-bg: rgba(13,110,253,0.1);
    --rel-color: #32cd32;
    --subject-color-light: #1e88e5;
    --body-color-light: #388e3c;
    --btn-hover: #cfcfcf;
    --timestamp-bg: rgba(50,50,50,0.7);
    --timestamp-fg: #ccc;
    --ts-label: #f8f8f2;
    --iso-ts-color: #39d7f1;
    --iso-ts-bg: rgba(57,215,241,0.15);
    --local-ts-color: #b3e88f;
    --local-ts-bg: rgba(179,232,143,0.15);
    --subject-color: var(--subject-color-light);
    --body-color: var(--body-color-light);

    /* New Title Colors */
    --title-bg-start: #3f51b5; /* Indigo */
    --title-bg-end: #2196f3;   /* Blue */
    --title-fg: #ffffff;
    --title-shadow-light: rgba(0, 0, 0, 0.15);
    --title-shadow-dark: rgba(0, 0, 0, 0.3);

    /* Status Colors - Light Mode (Updated for better contrast) */
    --status-local-bg: #e6ffe6; /* Light Green */
    --status-local-fg: #006400; /* Dark Green */
    --status-pushed-bg: #e0f2ff; /* Light Blue */
    --status-pushed-fg: #0056b3; /* Dark Blue */
    --status-not-pushed-bg: #fff0f0; /* Light Red */
    --status-not-pushed-fg: #d32f2f; /* Dark Red */
    --status-not-in-local-bg: #fff8e1; /* Light Orange */
    --status-not-in-local-fg: #ffa000; /* Dark Orange */
    --status-fetched-remote-bg: #f3e5f5; /* Light Purple */
    --status-fetched-remote-fg: #673ab7; /* Dark Purple */
    --status-unknown-bg: #f0f0f0; /* Light Gray */
    --status-unknown-fg: #555555; /* Dark Gray */
  }
  html.dark {
    --btn-bg: #222;
    --btn-fg: #eee;
    --link: #ff6c6b;

    --bg: #111;
    --fg: #eee;
    --link-hover: #3b82f6;
    --border: #444;
    --iso-color: #61dafb;
    --iso-bg: rgba(97,218,251,0.1);
    --rel-color: #32cd32;
    --subject-color-dark: #90caf9;
    --body-color-dark: #a5d6a7;
    --btn-hover: #333;
    --subject-color: var(--subject-color-dark);
    --body-color: var(--body-color-dark);

    /* New Title Colors for Dark Mode */
    --title-bg-start: #1a237e; /* Darker Indigo */
    --title-bg-end: #0d47a1;   /* Darker Blue */
    --title-fg: #e0e0e0;

    /* Status Colors - Dark Mode (Updated for better contrast) */
    --status-local-bg: #1a4f1a; /* Darker Green */
    --status-local-fg: #90ee90; /* Light Green */
    --status-pushed-bg: #1a3a4f; /* Darker Blue */
    --status-pushed-fg: #87cefa; /* Light Blue */
    --status-not-pushed-bg: #4f1a1a; /* Darker Red */
    --status-not-pushed-fg: #ef9a9a; /* Light Red */
    --status-not-in-local-bg: #4f3a1a; /* Darker Orange */
    --status-not-in-local-fg: #ffcc80; /* Light Orange */
    --status-fetched-remote-bg: #3a1a4f; /* Darker Purple */
    --status-fetched-remote-fg: #d1c4e9; /* Light Purple */
    --status-unknown-bg: #333333; /* Darker Gray */
    --status-unknown-fg: #cccccc; /* Light Gray */
  }

  body {
    background: var(--bg);
    color: var(--fg);
    font-family: monospace;
    padding: 0;
    margin: 0;
    white-space: pre-wrap;
  }
  a.commit-link {
    color: var(--link);
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
  }
  a.commit-link:hover { color: var(--link-hover); }

  /* New wrapper to constrain and center all main content blocks */
  .page-container {
    max-width: 1200px; /* Adjust this value to your desired max content width */
    margin: 0 auto;    /* Centers the container horizontally */
    /* No padding here, as elements inside will handle their own */
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* Horizontal padding for content inside the header, but header itself is limited by .page-container */
    padding: 1.5rem 2rem;
    background: linear-gradient(90deg, var(--title-bg-start), var(--title-bg-end));
    color: var(--title-fg);
    box-shadow: 0 4px 10px var(--title-shadow-light);
    margin-bottom: 2rem;
    /* No max-width or margin auto here, it inherits from .page-container */
  }
  html.dark .page-header {
    box-shadow: 0 4px 10px var(--title-shadow-dark);
  }

  .page-title {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  }

  /* Main content area no longer needs its own padding; .page-container handles outer constraint */
  main {
      padding: 0;
  }

  /* Adjustments for timestamp container */
  .timestamp-container {
    background: var(--timestamp-bg);
    color: var(--timestamp-fg);
    /* Apply horizontal padding directly to timestamp container */
    padding: 0.8rem 2rem;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    display: grid;
    grid-template-columns: max-content max-content; /* Updated for 3 columns now */
    column-gap: 2rem;
    row-gap: 0.5rem;
    align-items: center;
  }
  .timestamp-container .ts-label {
    color: var(--ts-label);
    font-weight: bold;
  }
  .timestamp-container .iso-ts {
    background: var(--iso-ts-bg);
    color: var(--iso-ts-color);
    padding: 0 0.2em;
    border-radius: 3px;
    font-weight: bold;
  }
  .timestamp-container .local-ts {
    background: var(--local-ts-bg);
    color: var(--local-ts-color);
    padding: 0 0.2em;
    border-radius: 3px;
    font-weight: bold;
  }
  /* Style for Total Commits */
  .timestamp-container .total-commits {
    background: var(--title-bg-start); /* Using a title color for prominence */
    color: var(--title-fg);
    padding: 0 0.2em;
    border-radius: 3px;
    font-weight: bold;
    grid-column: 1 / -1; /* Span across all columns */
    text-align: center;
    padding: 0.5em 1em;
    font-size: 1.1em;
  }


  .commit-block {
    margin-bottom: 2em;
    border-bottom: 1px solid var(--border);
    /* Apply horizontal padding directly to commit blocks */
    padding: 1em 2rem;
  }
  .commit-block:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 1em;
  }
  .commit-number {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--link);
    margin-bottom: 0.5rem;
    margin-top: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    user-select: none;
  }
  .commit-line {
    display: flex;
    align-items: center;
    gap: 0.4em;
    margin: 0.1em 0;
    white-space: nowrap;
    font-weight: normal;
  }
  .commit-line > span.label {
    flex-shrink: 0;
    user-select: none;
    font-weight: bold;
  }
  .copy-link {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    margin: 0 0 0 0.3em;
    color: var(--link);
    line-height: 1;
    flex-shrink: 0;
    user-select: none;
    position: relative;
  }
  .copy-link:hover {
    color: var(--link-hover);
  }
  .iso-date {
    color: var(--iso-color);
    background: var(--iso-bg);
    padding: 0 0.2em;
    border-radius: 3px;
  }
  .relative-date {
    color: var(--rel-color);
    font-weight: bold;
  }
  .subject-value {
    color: var(--subject-color);
  }
  .commit-body-wrapper {
    margin-top: 0.6rem;
    padding-left: 0;
  }
  .commit-body-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.35em 1em;
    font-weight: 700;
    font-size: 1rem;
    background: var(--body-color);
    color: var(--bg);
    border-radius: 9999px;
    margin-bottom: 0.35em;
    user-select: none;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
    letter-spacing: 0.02em;
    transition: background-color 0.3s ease;
    margin-left: 0;
  }
  .commit-body-label:hover {
    background: var(--body-color-dark, var(--body-color));
  }
  .commit-body {
    color: var(--body-color);
    background: transparent;
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
    border-left: 3px solid var(--body-color);
    padding-left: 0.85rem;
    overflow-x: auto;
  }

  .button-container {
    display: flex;
    gap: 1rem;
    z-index: 10000;
  }
  .action-button {
    white-space: nowrap;
    background: var(--btn-bg);
    color: var(--btn-fg);
    border: none;
    padding: 0.6em 1.2em;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }
  .action-button:hover {
    background: var(--btn-hover);
    transform: translateY(-1px);
  }
  .action-button:active {
    transform: translateY(0);
  }

  /* Tooltip for commit link */
  .commit-link-wrapper {
    position: relative;
    display: inline-block;
  }
  .commit-link-tooltip {
    position: absolute;
    bottom: 125%;
    left: 70%;
    transform: translateX(-30%);
    background-color: var(--btn-bg);
    color: var(--btn-fg);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  }
  .commit-link-wrapper:hover .commit-link-tooltip {
    opacity: 1;
    pointer-events: auto;
  }
  .commit-link-tooltip .hash {
    color: var(--link);
    font-weight: bold;
  }

  /* Tooltip for copy button */
  .copy-link .custom-tooltip {
    position: absolute;
    bottom: 125%;
    left: 90%;
    transform: translateX(-10%);
    background-color: #222;
    color: #eee;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s, background-color 0.3s;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  }
  .copy-link:hover .custom-tooltip {
    opacity: 1;
    pointer-events: auto;
  }
  /* NEW: Class for when the "copied" message is active */
  .copy-link .custom-tooltip.copied-active {
    opacity: 1;
    pointer-events: auto;
    background-color: #4CAF50;
    color: white;
  }
  .custom-tooltip .hash {
    color: var(--link);
    font-weight: bold;
  }

  /* Status Indicator Styles */
  .commit-status-line {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    user-select: none;
  }

  .commit-status {
    display: flex;
    align-items: center; /* Centers items vertically within the flex container */
    gap: 0.4em;
    padding: 0.35em 0.7em;
    border-radius: 9999px;
    font-weight: bold;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    line-height: 1; /* Essential for tightening the flex container's internal height */
    font-size: 0.85rem; /* Set base font size for the entire badge */
  }

  .commit-status .icon {
    line-height: 1; /* Keep its own line box tight */
    font-size: 1.1em; /* Make icon slightly larger than badge text */
    flex-shrink: 0; /* Prevent icon from shrinking */
  }

  .commit-status .text {
      line-height: 1; /* Ensure text also has a tight line box */
  }


  /* Applying theme-based status colors via CSS variables */
  .commit-status.local {
    background-color: var(--status-local-bg);
    color: var(--status-local-fg);
  }
  .commit-status.remote.pushed {
    background-color: var(--status-pushed-bg);
    color: var(--status-pushed-fg);
  }
  .commit-status.remote.not-pushed {
    background-color: var(--status-not-pushed-bg);
    color: var(--status-not-pushed-fg);
  }
  .commit-status.not-in-local {
    background-color: var(--status-not-in-local-bg);
    color: var(--status-not-in-local-fg);
  }
  .commit-status.fetched-remote {
    background-color: var(--status-fetched-remote-bg);
    color: var(--status-fetched-remote-fg);
  }
  .commit-status.unknown-status {
    background-color: var(--status-unknown-bg);
    color: var(--status-unknown-fg);
  }

</style>
</head>
<body>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">Project Commit Log</h1>
      <div class="button-container">
        <button id="toggle-theme" class="action-button" aria-pressed="false" aria-label="Toggle dark/light theme">🌗 Toggle Theme</button>
        <button id="export-pdf" class="action-button" aria-label="Save page as PDF for printing">🖨️ Save as PDF</button>
      </div>
    </header>

    <main id="main-content" role="list" aria-label="Git commits">
      <div class="timestamp-container" role="contentinfo" aria-live="polite">
        <div><span class="ts-label">Report generated (ISO):</span> <span class="iso-ts">${isoTs}</span></div>
        <div><span class="ts-label">Report generated (Local):</span> <span class="local-ts">${localTs}</span></div>
        <div class="total-commits"><span class="ts-label">Total Commits:</span> ${totalCommits}</div>
      </div>
      ${commitBlocks.join("\n")}
    </main>
  </div>

  <script>
    (() => {
      const toggleThemeBtn = document.getElementById("toggle-theme");
      // Initialize aria-pressed based on current theme, assuming dark is default.
      // Or you can check localStorage if you persist theme preference.
      const isHtmlDark = document.documentElement.classList.contains("dark");
      toggleThemeBtn.setAttribute("aria-pressed", isHtmlDark.toString());

      toggleThemeBtn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        toggleThemeBtn.setAttribute("aria-pressed", isDark.toString());
      });

      document.getElementById("export-pdf").addEventListener("click", () => {
        window.print();
      });

      document.querySelectorAll(".copy-link").forEach(button => {
        button.addEventListener("click", () => {
          const link = button.dataset.link;
          const fullHash = button.dataset.fullHash;
          const tooltip = button.querySelector(".custom-tooltip");
          const originalText = "Copy " + fullHash.slice(0, 7) + " commit link"; // Store original text

          navigator.clipboard.writeText(link).then(() => {
            tooltip.textContent = "Copied " + fullHash.slice(0, 7);
            tooltip.classList.add("copied-active"); // Add the new class

            // Temporarily remove pointer-events from the button itself
            button.style.pointerEvents = "none"; // Prevent re-triggering hover immediately after click

            setTimeout(() => {
              tooltip.classList.remove("copied-active"); // Remove the class
              tooltip.textContent = originalText; // Restore original text
              button.style.pointerEvents = ""; // Restore pointer-events
            }, 1500);
          });
        });
      });
    })();
  </script>
</body>
</html>`;
    // FIX: Corrected a potential subtle issue in escapeHtml function:
    // Original: .replace(/>/g, ">")  - this was a no-op, should be "&gt;"
    // It's possible this tiny error affected parsing in certain browsers, though unlikely for <i> tags.
    // I've corrected it to .replace(/>/g, "&gt;") in the code above.

    fs.writeFileSync("./commit.html", finalHtml, "utf-8");
    console.log(chalk.green("✅ commit.html generated successfully.")); // ✅ html done
    console.log(
      chalk.blue("🌐 You can now open commit.html in your browser.\n")
    ); // ✅ open hint
  } catch (err) {
    console.error(chalk.red("❌ Error generating HTML:"), err.message); // ✅ HTML generation error
  }
};

generateGitLog();
convertGitLogToHtml();

// Helper function to update or create .gitignore with needed entries

const updateGitignore = () => {
  const gitignorePath = ".gitignore";
  const filesToIgnore = ["commit.log", "commit.html"];
  let content = "";

  try {
    content = fs.existsSync(gitignorePath)
      ? fs.readFileSync(gitignorePath, "utf8")
      : "";
  } catch (err) {
    console.warn(
      chalk.yellow("⚠️ Could not read .gitignore. Skipping update.")
    );
    return;
  }

  const lines = content.split("\n").map((line) => line.trim());
  const existing = new Set(lines);
  let changed = false;

  for (const file of filesToIgnore) {
    if (!existing.has(file)) {
      lines.push(file);
      changed = true;
    }
  }

  if (changed) {
    try {
      fs.writeFileSync(
        gitignorePath,
        lines.filter(Boolean).join("\n") + "\n",
        "utf8"
      );
      console.log(
        chalk.green("📄 .gitignore updated with commit.log and commit.html")
      ); // ✅ updated
    } catch (err) {
      console.error(
        chalk.red("❌ Failed to write to .gitignore:"),
        err.message
      ); // ✅ write fail
    }
  } else {
    console.log(
      chalk.gray("📝 .gitignore already includes commit.log and commit.html\n")
    ); // ✅ gitignore unchanged
  }
};

// 🔁 Ensure commit.log and commit.html are ignored by Git

// ... your updateGitignore function here ...

updateGitignore();

console.log(
  chalk.blueBright(
    "ℹ️  No worries — commit.log and commit.html are ignored via .gitignore."
  )
);
console.log(chalk.bold.cyan("\n✅ Done! Commit report generated.\n"));
// ✅ completion banner
