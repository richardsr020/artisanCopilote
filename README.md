Parfait ! Voici ton **`README.md` complet** mis à jour avec tes informations :

---

````markdown
# 🚀 ArtisanCopilote — AI Developer Assistant for VS Code

**Your personal AI-powered coding companion — beyond Copilot!**  
This extension helps you write, improve, refactor, and understand code faster by combining intelligent code completion, chat-based AI interactions, workspace file analysis, terminal commands, and smart code reviews.

---

## 📌 Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Commands](#commands)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## ✨ Features

✅ **Intelligent Code Completion**  
Context-aware code suggestions as you type, powered by a large language model.

✅ **AI Chat Interface**  
Ask questions in natural language, get explanations, generate code snippets, debug errors, or get help with documentation.

✅ **Workspace File & Folder Analysis**  
The AI can parse your entire workspace, understand your file structure, and use that context to improve suggestions.

✅ **Terminal Command Execution**  
Run commands in the integrated terminal without leaving VS Code. Automate builds, tests, or deployments.

✅ **Smart Code Review**  
Get AI-generated feedback on code quality, best practices, bugs, and style consistency.

✅ **Multi-Platform Support** *(Roadmap)*  
Planned future support for Visual Studio, JetBrains IDEs, Eclipse IDE, Xcode, and GitHub Mobile.

✅ **Highly Configurable**  
Easily enable/disable features, choose supported languages, and adjust API keys and model settings.

---

## ⚙️ How It Works

This extension connects to a backend AI API (like OpenAI or any LLM provider).  
When you:
- ✍️ Type code → It offers inline completions.
- 📝 Highlight code → It can explain, refactor, or optimize it.
- 💬 Use Chat → It can answer dev questions, search your workspace context, and even create files/folders.
- ⚡ Run Commands → It executes commands directly in VS Code’s terminal.

---

## 🚀 Installation

1. Make sure **Node.js** and **npm** are installed.
2. Install Yeoman and the VS Code extension generator:
   ```bash
   npm install -g yo generator-code
````

3. Clone this repository:

   ```bash
   git clone https://github.com/richardsr020/artisanCopilote.git
   ```
4. Open the project:

   ```bash
   cd artisanCopilote
   code .
   ```
5. Install dependencies:

   ```bash
   npm install
   ```
6. Press `F5` to launch the Extension Development Host.

---

## 🧑‍💻 Usage

### ✨ Code Completion

* Start typing to see inline suggestions.
* Accept suggestions with `Tab` or `Enter`.

### 💬 AI Chat

* Open the Command Palette (`Ctrl+Shift+P`) → `ArtisanCopilote: Open Chat`
* Ask any question — get explanations, code snippets, or bug fixes.

### 📂 Workspace Management

* Use natural commands like:

  * `Create file utils/helpers.js`
  * `Rename file index.js to main.js`
  * `Analyze workspace structure`

### ⚡ Terminal Commands

* In chat, say:
  `Run: npm install`
  `Run: git commit -m "feat: add new module"`
  The command executes in VS Code’s terminal.

### 🔍 Code Review

* Right-click a file or selection → `ArtisanCopilote: Review Code`
  Get suggestions on bugs, improvements, and best practices.

---

## ⚙️ Configuration

Add your API key and settings in `settings.json`:

```json
{
  "artisanCopilote.apiKey": "<YOUR_API_KEY>",
  "artisanCopilote.model": "gpt-4o",
  "artisanCopilote.enableCodeReview": true,
  "artisanCopilote.enableTerminal": true
}
```

---

## ⌨️ Commands

| Command                          | Description                       |
| -------------------------------- | --------------------------------- |
| `ArtisanCopilote: Open Chat`     | Open the AI chat                  |
| `ArtisanCopilote: Explain Code`  | Explain selected code             |
| `ArtisanCopilote: Refactor Code` | Suggest refactoring for selection |
| `ArtisanCopilote: Review Code`   | Review file or selection          |
| `ArtisanCopilote: Run Command`   | Run terminal command              |

---

## 🛣️ Roadmap

* [x] Code completion engine
* [x] AI chat interface
* [x] Workspace file & folder management
* [x] Terminal commands execution
* [x] Smart code review
* [ ] Multi-IDE support (JetBrains, Eclipse, Xcode)
* [ ] Mobile support (GitHub Mobile)
* [ ] Fine-tuning for multiple languages

---

## 🤝 Contributing

Your contributions are welcome!

1. Fork the repo: [richardsr020/artisanCopilote](https://github.com/richardsr020/artisanCopilote)
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Author:** Richard Mils
**GitHub:** [richardsr020](https://github.com/richardsr020)
**Email:** [richardmils02@gmail.com](mailto:richardmils02@gmail.com)

Happy coding! 🚀

