// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const completionProvider = {
		provideCompletionItems: (document, position, token, context) => {
			return [{
				label: "item1",
			}, {
				label: "item2"
			}]
		}
	};

	const documentHighlightProvider = {
		provideDocumentHighlights: (document, position, token) => {
			return [
				new vscode.DocumentHighlight(new vscode.Range(1, 2, 3, 4), vscode.DocumentHighlightKind.Text),
				new vscode.DocumentHighlight(new vscode.Range(5, 6, 7, 8), vscode.DocumentHighlightKind.Text),
			]
		}
	};

	const hardcodedLocationProvider = (pos) => (document, _position, _token) => {
		return new vscode.Location(document.uri, pos);
	};

	const definitionProvider = {
		provideDefinition: hardcodedLocationProvider(new vscode.Position(0, 0))
	};
	const declarationProvider = {
		provideDeclaration: hardcodedLocationProvider(new vscode.Position(1, 1))
	};
	const typeDefinitionProvider= {
		provideTypeDefinition: hardcodedLocationProvider(new vscode.Position(2, 2))
	};

	const implementationProvider = {
		provideImplementation: hardcodedLocationProvider(new vscode.Position(3, 3))
	};

	const disposable0 = vscode.languages.registerCompletionItemProvider("plaintext", completionProvider, ["."])
	const disposable1 = vscode.languages.registerDefinitionProvider("plaintext", definitionProvider);
	const disposable2 = vscode.languages.registerDeclarationProvider("plaintext", declarationProvider);
	const disposable3 = vscode.languages.registerTypeDefinitionProvider("plaintext", typeDefinitionProvider);
	const disposable4 = vscode.languages.registerImplementationProvider("plaintext", implementationProvider);
	const disposable5 = vscode.languages.registerDocumentHighlightProvider("plaintext", documentHighlightProvider);

	context.subscriptions.push(disposable0);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
	context.subscriptions.push(disposable5);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}