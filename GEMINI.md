# Project Overview

This project is a Node.js Command Line Interface (CLI) tool named "Apps Script Engine". Its primary purpose is to streamline the setup of Google Apps Script projects by generating boilerplate code from a predefined template repository (`https://github.com/WildH0g/apps-script-engine-template.git`). It leverages `git` for cloning the template and `npm` for managing dependencies and setting up development tools like Husky. Additionally, it intelligently copies language-specific configuration files, including nested directories like 'src/client/' and 'src/server/', merging them with existing project files without overwriting, and dynamically applies npm scripts from these configurations.

The CLI allows users to quickly initialize a new Apps Script project in a specified directory, removing the `.git` history from the cloned template and renaming the template's `README.md` to `INSTRUCTIONS.md`.

# Building and Running

## Installation and Usage of the CLI

To use the Apps Script Engine CLI to create a new Apps Script project, run the following command:

```bash
npx apps-script-engine [directory-name]
```

- If `[directory-name]` is omitted, the project will be created in `./apps-script-project`.

## Development Commands (for this CLI project)

The following `npm` scripts are available for development on the `apps-script-engine` CLI itself:

- `npm install`: Installs all project dependencies and dev dependencies.
- `npm run lint`: Runs ESLint to check for code style and quality issues.
- `npm run lint:fix`: Runs ESLint and attempts to automatically fix any identified issues.
- `npm run prettier`: Checks code formatting using Prettier.
- `npm run prettier:fix`: Formats the code using Prettier.
- `npm run format`: Executes both `prettier:fix` and `lint:fix` to ensure consistent code style and formatting.
- `npm run prepare`: Sets up Husky Git hooks, typically used for pre-commit checks.
- `npm run push:publish`: Pushes changes to the `origin main` branch and publishes the package to the npm registry.
- `npm test`: Placeholder for tests; currently outputs "Error: no test specified".

### Developer Mode

For local development and testing of the `apps-script-engine` CLI with a local template repository, you can utilize the `DEV_MODE_DIR` environment variable. When `DEV_MODE_DIR` is set to an absolute path of a local directory, the CLI will intelligently copy the template files from this specified local directory, merging them with existing files without overwriting, instead of performing a `git clone` from the remote `REPO` URL. This is particularly useful for iterating on template changes without needing to push them to a remote Git repository.

To enable developer mode, create a `.env` file in the root of this CLI project (e.g., `/home/wildhog/Documents/1. PROJECTS 📅/my-tools/gas-engine/cli/.env`) and add the `DEV_MODE_DIR` variable, pointing it to your local template directory:

```
DEV_MODE_DIR=/path/to/your/local/apps-script-engine-template
```

Ensure the path is absolute and correctly points to your local template repository.
# Development Conventions

- **Language:** JavaScript (ES Modules).
- **Linting:** ESLint is configured with `eslint:recommended` and `eslint-config-prettier` to enforce code quality and style.
- **Formatting:** Prettier is used for consistent code formatting, with specific rules defined in `prettier.config.cjs` (e.g., `trailingComma: 'es5'`, `tabWidth: 2`, `singleQuote: true`).
- **Git Hooks:** Husky is integrated to manage Git hooks, likely for running linting and formatting checks before commits.
- **Dependencies:** `dotenv` is used for environment variable management.
- **Project Structure:** The main logic resides in `index.js`.

# GEMINI.md

This `GEMINI.md` file serves as a dedicated context file for the Gemini CLI agent. It provides a comprehensive overview of the project, including its purpose, how to build and run it, development commands, and conventions. This file helps the agent understand the project's structure and requirements, enabling it to assist more effectively with tasks such as bug fixes, feature development, and code explanations.