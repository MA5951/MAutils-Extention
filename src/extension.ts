import * as vscode from 'vscode';
import * as fs from 'fs';

function initiateMa() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders && workspaceFolders.length > 0) {
        const workspaceFolder = workspaceFolders[0]; // Assumes single workspace folder

        const maFiles = [	
            {
                fileName: 'src/MaMotorCommand.java',
                // get the content from MAlib-files/src/MaMotorCommand.java //TODO
                content: '/* Your code for MaMotorCommand here */'
            },
            {
                fileName: 'swerveDrive.java',
                content: '/* Your code for swerveDrive here */'
            },
            // Add more files as needed
        ];

        maFiles.forEach(file => {
            //check if folder file is in exists if not create the folder than the file in it
            for (let i = 0; i < file.fileName.split('/').length - 1; i++) {
                if (!fs.existsSync(vscode.Uri.joinPath(workspaceFolder.uri, file.fileName.split('/')[i]).fsPath)) {
                    fs.mkdirSync(vscode.Uri.joinPath(workspaceFolder.uri, file.fileName.split('/')[i]).fsPath);
                }
            }

            if (!fs.existsSync(vscode.Uri.joinPath(workspaceFolder.uri, file.fileName).fsPath)) {
                //create file
                fs.writeFileSync(
                    vscode.Uri.joinPath(workspaceFolder.uri, file.fileName).fsPath,
                    file.content,
                    'utf-8'
                );
            }
        });

        vscode.window.showInformationMessage('Ma files created successfully!');
    } else {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
    }
}

function HelloWorld() {
    vscode.window.showInformationMessage('Hello World!');
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('MAutils-extention.extension.initiate-Ma', initiateMa);
    let disposable2 = vscode.commands.registerCommand('MAutils-extention.extension.Hello-world', HelloWorld);

    context.subscriptions.push(disposable);
}
