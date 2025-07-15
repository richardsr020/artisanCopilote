import * as vscode from 'vscode';
import { OpenAIApi, Configuration } from 'openai';

// Placeholder for AI API key (to be set via configuration)
let openaiApiKey: string | undefined;

export function activate(context: vscode.ExtensionContext) {
  // Load API key from configuration
  const config = vscode.workspace.getConfiguration('artisancopilote');
  openaiApiKey = config.get<string>('openaiApiKey');

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('artisancopilote.start', () => {
      vscode.window.showInformationMessage('ArtisanCopilote is now active!');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('artisancopilote.chat', async () => {
      await chatWithAI();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('artisancopilote.codeComplete', async () => {
      await provideCodeCompletion();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('artisancopilote.terminalCommand', async () => {
      await runTerminalCommand();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('artisancopilote.workspaceManager', async () => {
      await manageWorkspace();
    })
  );
}

export function deactivate() {}

// --- Command Implementations ---

async function chatWithAI() {
  const userInput = await vscode.window.showInputBox({ prompt: 'Posez votre question à l’IA:' });
  if (!userInput || !openaiApiKey) {
    vscode.window.showErrorMessage('Clé API OpenAI manquante ou entrée vide.');
    return;
  }
  const openai = new OpenAIApi(new Configuration({ apiKey: openaiApiKey }));
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userInput }],
    });
    const aiMessage = completion.data.choices[0]?.message?.content || 'Aucune réponse.';
    vscode.window.showInformationMessage(aiMessage);
  } catch (error) {
    vscode.window.showErrorMessage('Erreur OpenAI: ' + error);
  }
}

async function provideCodeCompletion() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !openaiApiKey) {
    vscode.window.showErrorMessage('Aucun éditeur actif ou clé API manquante.');
    return;
  }
  const document = editor.document;
  const position = editor.selection.active;
  const codeBefore = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
  const openai = new OpenAIApi(new Configuration({ apiKey: openaiApiKey }));
  try {
    const completion = await openai.createCompletion({
      model: 'code-davinci-002',
      prompt: codeBefore,
      max_tokens: 64,
      temperature: 0.2,
      stop: ['\n\n'],
    });
    const suggestion = completion.data.choices[0]?.text || '';
    editor.edit(editBuilder => {
      editBuilder.insert(position, suggestion);
    });
  } catch (error) {
    vscode.window.showErrorMessage('Erreur OpenAI: ' + error);
  }
}

async function runTerminalCommand() {
  const command = await vscode.window.showInputBox({ prompt: 'Commande à exécuter dans le terminal intégré:' });
  if (!command) {
    vscode.window.showErrorMessage('Commande vide.');
    return;
  }
  const terminal = vscode.window.createTerminal('ArtisanCopilote Terminal');
  terminal.show();
  terminal.sendText(command);
}

async function manageWorkspace() {
  const options = ['Lister fichiers', 'Créer fichier', 'Renommer fichier', 'Supprimer fichier'];
  const choice = await vscode.window.showQuickPick(options, { placeHolder: 'Que voulez-vous faire dans le workspace ?' });
  if (!choice) return;
  const wsFolders = vscode.workspace.workspaceFolders;
  if (!wsFolders) {
    vscode.window.showErrorMessage('Aucun workspace ouvert.');
    return;
  }
  const rootPath = wsFolders[0].uri.fsPath;
  switch (choice) {
    case 'Lister fichiers': {
      const files = await vscode.workspace.findFiles('**/*');
      vscode.window.showQuickPick(files.map(f => f.fsPath), { canPickMany: false, placeHolder: 'Fichiers du workspace' });
      break;
    }
    case 'Créer fichier': {
      const fileName = await vscode.window.showInputBox({ prompt: 'Nom du nouveau fichier:' });
      if (!fileName) return;
      const uri = vscode.Uri.file(`${rootPath}/${fileName}`);
      await vscode.workspace.fs.writeFile(uri, new Uint8Array());
      vscode.window.showInformationMessage(`Fichier créé: ${fileName}`);
      break;
    }
    case 'Renommer fichier': {
      const files = await vscode.workspace.findFiles('**/*');
      const fileToRename = await vscode.window.showQuickPick(files.map(f => f.fsPath), { placeHolder: 'Fichier à renommer' });
      if (!fileToRename) return;
      const newName = await vscode.window.showInputBox({ prompt: 'Nouveau nom:' });
      if (!newName) return;
      const newUri = vscode.Uri.file(`${rootPath}/${newName}`);
      await vscode.workspace.fs.rename(vscode.Uri.file(fileToRename), newUri);
      vscode.window.showInformationMessage(`Fichier renommé en: ${newName}`);
      break;
    }
    case 'Supprimer fichier': {
      const files = await vscode.workspace.findFiles('**/*');
      const fileToDelete = await vscode.window.showQuickPick(files.map(f => f.fsPath), { placeHolder: 'Fichier à supprimer' });
      if (!fileToDelete) return;
      await vscode.workspace.fs.delete(vscode.Uri.file(fileToDelete));
      vscode.window.showInformationMessage(`Fichier supprimé: ${fileToDelete}`);
      break;
    }
  }
}
