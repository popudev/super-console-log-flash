# Super Console Log

This extension provides a quick and convenient way to insert console log statements in various programming languages.

### Made by Popudev

## Features

- Automatically detects the programming language of the active file.
- Inserts console log statements tailored to the detected language.
- Supports JavaScript, Java, Rust, C++, and more.

## Usage

### Command palette

1. Open a file in Visual Studio Code.
2. Place the cursor at the desired location in your code.
3. Press `Ctrl + Shift + P` to open the command palette.
4. Type "Super Console Log Flash" and select the "Log" command.

### Keybinding

- Windows: `Control + Shift + L`
- Mac: `Command + Shift + L`

## Supported Languages

- JavaScript
- Rust
- Java
- C++
- More

## Extension Settings

- To customize the console log pattern, create a .vscode folder in your project and add a settings.json file. Below is an example of how you can define custom patterns for different programming languages:

```json
{
  "super-console-log-flash": {
    "pattern": {
      "javascript": "console.log(\"custom @name: \", @value);",
      "rust": "println!(\"@name: {:?}\", @value);"
    }
  }
}
```

## Contribution

If you have any ideas, suggestions, or issues, feel free to contribute or open an issue on GitHub.

## License

This extension is licensed under the MIT License.
