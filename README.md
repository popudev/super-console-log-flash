# Super Console Log - VSCode Extension

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
3. Press `Ctrl+Shift+P` to open the command palette.
4. Type "Super Console Log" and select the "Log" command.

### Keybinding

- Windows: `Control + Shift + L`
- Mac: `Command + Shift + L`

### Inserting a Basic Log Statement

- If the cursor is not on a valid identifier, a basic log statement will be inserted.

```js
console.log();
```

```rust
println!();
```

### Inserting a Log Statement with Variable

- If the cursor is on a valid identifier, a log statement with the variable name will be inserted.

```js
console.log("variableName: ", variableName);
```

```rust
println!("variableName: {:#?}", variableName);
```

## Supported Languages

- JavaScript
- Java
- Rust
- C++

## Extension Settings

## Contribution

If you have any ideas, suggestions, or issues, feel free to contribute or open an issue on GitHub.

## License

This extension is licensed under the MIT License.
