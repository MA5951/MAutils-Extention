import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';
import * as vscode from 'vscode';


export function InitLib() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }

    const libDir = path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "MAutils");

    addLib(libDir);

}

export function addLib(libDir: string) {

    if (fs.existsSync(libDir)) {
        vscode.window.showWarningMessage(`Directory '${libDir}' already exists. Skipping clone.`);
        return;
    }

    if (!fs.existsSync(path.dirname(libDir))) {
        fs.mkdirSync(path.dirname(libDir), { recursive: true });
    }

    cp.exec(`git clone --branch FilesForExtension --single-branch https://github.com/MA5951/MAutilsPro.git`, { cwd: path.dirname(libDir) }, (err, stdout, stderr) => {
        if (err) {
            vscode.window.showErrorMessage(`Error cloning repository: ${err.message}`);
            return;
        }

        vscode.window.showInformationMessage(`MAutils repository cloned successfully to '${libDir}'.`);
    });


}