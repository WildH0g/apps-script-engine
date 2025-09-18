<h1 align="center">Welcome to Apps Script Engine 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.9-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Creates boilerplate code for kick-ass Apps Script projects, helping developers quickly set up and start building with Google Apps Script. It intelligently merges language-specific configuration files and applies npm scripts based on the chosen language (JavaScript or TypeScript), ensuring existing project files are not overwritten.

### 🏠 [Homepage](https://github.com/WildH0g/apps-script-engine)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Usage](#usage)
- [Author](#author)
- [Show Your Support](#show-your-support)

## Prerequisites

Ensure that you have `npm` and `git` installed by running:

```sh
npm --version
git --version
```

If you don't have these installed, follow the instructions here for [npm](https://www.npmjs.com/get-npm) and here for [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Install

This CLI script installs the [Apps Script Engine Template](https://github.com/WildH0g/apps-script-engine-template). Check out the template's [README](https://github.com/WildH0g/apps-script-engine-template/blob/main/README.md) for details on how to use it.

To install the template, run the following command with an optional directory name:

```sh
npx apps-script-engine [directory-name]
```

If no directory name is provided, it will default to `./apps-script-project`.

## Usage

To create a new Apps Script project in the current directory:

```sh
npx apps-script-engine
```

To create a new Apps Script project in a specific directory:

```sh
npx apps-script-engine my-project-directory
```

To create a new Apps Script project with TypeScript:

```sh
npx apps-script-engine my-ts-project --ts
```

After running the command, the script will generate the necessary boilerplate files in the specified directory.

## Developer Mode

For local development of the `apps-script-engine` CLI, you can use the `DEV_MODE_DIR` environment variable. If `DEV_MODE_DIR` is set to a local path, the CLI will intelligently copy the template files from this local directory, merging them with existing files without overwriting, instead of cloning from the remote Git repository. This is useful for testing changes to the template without pushing them to GitHub.

To use developer mode, create a `.env` file in the root of this CLI project and add:

```
DEV_MODE_DIR=/path/to/your/local/apps-script-engine-template
```

Replace `/path/to/your/local/apps-script-engine-template` with the absolute path to your local template repository.

## Author

👤 Dmitry Kostyuk

- Website: [https://wurkspaces.dev](https://wurkspaces.dev)
- LinkedIn: [@dmitry.kostyuk](https://linkedin.com/in/dmitry.kostyuk)
- Blog on [Medium](https://medium.com/@dmitry-kostyuk)

## Show Your Support

Give a ⭐️ if this project helped you!

---

This README was generated with ❤️ by readme-md-generator
