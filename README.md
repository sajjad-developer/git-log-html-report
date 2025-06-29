# Git Log HTML Report

Generate colorful, user-friendly HTML reports from your Git commit logs with rich features to help you visualize and share your repository history.

## Features

- **ISO and Local Timestamp Display**  
  Shows both the exact ISO 8601 commit timestamp and a local time display that updates automatically based on the viewer’s timezone.

- **Theme Toggle (Dark/Light)**  
  Easily switch between dark and light themes with a toggle button. The theme preference is saved for your convenience.

- **PDF Save / Print Support**  
  Export the generated commit log page as a PDF or print it directly from the browser using the built-in export button.

- **Corresponding Commit Number**  
  Each commit in the report is numbered in descending order, showing the position in the commit history.

- **Clickable Short Commit Hash Links with Copy-to-Clipboard Button**  
  Commit hashes link directly to your remote repository (e.g., GitHub) and include a handy copy-to-clipboard button with visual and screen reader feedback.

- **Comprehensive Commit Details**  
  Each commit entry includes:  
  - ISO Author Date (precise commit timestamp)  
  - Relative Author Date (e.g., "3 days ago")  
  - Commit Subject (title/message summary)  
  - Commit Body (detailed commit message, if present)

- **Accessibility Features**  
  Enhanced screen reader support including ARIA live regions for copy button feedback, ensuring the report is usable by everyone.

## Installation

```bash
npm install -g git-log-html-report
```

## Usage

Run the tool inside any Git repository to generate `commit.html` and `commit.log` files with all the above features.

```bash
git-log-html-report
```

Open `commit.html` in your browser to explore your commit history with an interactive UI.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or pull request.

## License

MIT © Md Sajjad Hossen
