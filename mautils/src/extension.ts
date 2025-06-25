import * as vscode from 'vscode';

import { InitLib } from './functions/InitMAutilsLib';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "mautils" is now active!');


	const initLib = vscode.commands.registerCommand('mautils.initLib', InitLib);

	context.subscriptions.push(initLib);
}

// This method is called when your extension is deactivated
export function deactivate() {}
