// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "super-console-log-flash" is now active!');

  const isValidCharacter = (char: string) => /[a-zA-Z0-9_]/.test(char);

  const findSurroundingCharacters = (input: string, index: number) => {
    let left = "";
    for (let i = 0; i < index; i++) {
      const character = input[index - i - 1];
      if (!isValidCharacter(character)) break;
      left += character;
    }

    let right = "";
    for (let i = 0; i < input.length - index - 1; i++) {
      const character = input[index + i + 1];
      if (!isValidCharacter(character)) break;
      right += character;
    }

    return `${left.split("").reverse().join("")}${input[index]}${right}`;
  };

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("super-console-log-flash.log", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const config = vscode.workspace.getConfiguration("super-console-log-flash");
    const languageId = editor.document.languageId;

    const patternConfig = config.get("pattern", {} as any)[languageId];

    if (!patternConfig) {
      vscode.window.showErrorMessage("Error: No pattern configuration for this language.");
      return;
    }

    if (editor.selection.isEmpty) {
      const position = editor.selection.active;
      const textContent = editor.document.getText();
      const currentLine = textContent.split("\n")[position.line];

      if (currentLine.trim()) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");
      }

      const index = position.character;

      let variable = "";

      if (isValidCharacter(currentLine[index])) {
        variable = findSurroundingCharacters(currentLine, index);
      }

      const logStatement = patternConfig.replace(/@name/g, variable || "log").replace(/@value/g, variable);

      editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, logStatement);
      });

      if (variable) return;

      const currentPosition = editor.selection.active;
      const newPosition = currentPosition.translate(0, logStatement.indexOf(")"));
      editor.selection = new vscode.Selection(newPosition, newPosition);

      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);
    await vscode.commands.executeCommand("editor.action.insertLineAfter");

    const logStatement = patternConfig.replace(/@name/g, text).replace(/@value/g, text);

    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, logStatement);
    });

    return;
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
