// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "super-console-log" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("super-console-log.log", async () => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const languageId = editor.document.languageId;

    if (editor.selection.isEmpty) {
      const position = editor.selection.active;
      const textContent = editor.document.getText();

      const currentLine = textContent.split("\n")[position.line];
      if (currentLine.trim()) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");
      }

      const valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_";
      const index = position.character;

      function findNext(original: string, final: string, i: number, change: -1 | 1): string {
        if (typeof original[i] === "undefined") return final;
        if (!valid.includes(original[i])) return final;

        return findNext(original, final + original[i], i + change, change);
      }

      if (!valid.includes(currentLine[index])) {
        let logStatement = "";
        switch (languageId) {
          case "javascript":
            logStatement = `console.log();`;
            break;
          case "java":
            logStatement = `System.out.println();`;
            break;
          case "rust":
            logStatement = `println!();`;
            break;
          case "cpp":
            logStatement = `std::cout <<  << std::endl;`;
            break;

          default:
            logStatement = `console.log();`;
            break;
        }

        editor.edit((editBuilder) => {
          editBuilder.insert(editor.selection.active, logStatement);
        });
      } else {
        const left = findNext(currentLine.slice(0, index), "", index - 1, -1)
          .split("")
          .reverse()
          .join("");
        const right = findNext(currentLine.slice(index + 1), "", 0, 1);
        const result = `${left}${currentLine[index]}${right}`;

        let logStatement = "";
        switch (languageId) {
          case "javascript":
            logStatement = `console.log("${result}: ", ${result});`;
            break;
          case "java":
            logStatement = `System.out.println("{result}: "+ ${result});`;
            break;
          case "rust":
            logStatement = `println!("${result}: {:#?}", ${result});`;
            break;
          case "cpp":
            logStatement = `std::cout << "${result}: " << ${result} << std::endl;`;
            break;

          default:
            logStatement = `console.log("${result}: ", ${result});`;
            break;
        }

        editor.edit((editBuilder) => {
          editBuilder.insert(editor.selection.active, logStatement);
        });
      }
    } else {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      await vscode.commands.executeCommand("editor.action.insertLineAfter");

      let logStatement = "";
      switch (languageId) {
        case "javascript":
          logStatement = `console.log("${text}: ", ${text});`;
          break;
        case "java":
          logStatement = `System.out.println("${text}: " + ${text});`;
          break;
        case "rust":
          logStatement = `println!("${text}: {:#?}", ${text});`;
          break;
        case "cpp":
          logStatement = `std::cout << "${text}: " << ${text} << std::endl;`;
          break;
        default:
          logStatement = `console.log("${text}: ", ${text});`;
          break;
      }

      editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, logStatement);
      });
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
