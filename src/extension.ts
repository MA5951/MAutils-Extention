import * as vscode from 'vscode';
import * as fs from 'fs';

function initiateMa() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders && workspaceFolders.length > 0) {
        const workspaceFolder = workspaceFolders[0]; // Assumes single workspace folder

        const maFiles = [	
            {
                fileName: 'MaMotorCommand.java',
                content: '/* Your code for MaMotorCommand here */'
            },
            {
                fileName: 'swerveDrive.java',
                content: '/* Your code for swerveDrive here */'
            },
            // Add more files as needed
        ];

        maFiles.forEach(file => {
            fs.writeFileSync(
                vscode.Uri.joinPath(workspaceFolder.uri, file.fileName).fsPath,
                file.content,
                'utf-8'
            );
        });

        vscode.window.showInformationMessage('Ma files created successfully!');
    } else {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
    }
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.initiate-Ma', initiateMa);

    context.subscriptions.push(disposable);
}
