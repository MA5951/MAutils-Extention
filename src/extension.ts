import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

function autoInitiateMa() {
    cloneMAutils();
    initiateFilesFromMAutils();
}

function cloneMAutils() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }

    const targetDir = path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "ma5951", "MAutils");

    if (fs.existsSync(targetDir)) {
        vscode.window.showWarningMessage(`Directory '${targetDir}' already exists. Skipping clone.`);
        return;
    }

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(path.dirname(targetDir))) {
        fs.mkdirSync(path.dirname(targetDir), { recursive: true });
    }

    // Now attempt to clone the repository
    cp.exec(`git clone https://github.com/MA5951/MAutils.git`, { cwd: path.dirname(targetDir) }, (err, stdout, stderr) => {
        if (err) {
            vscode.window.showErrorMessage(`Error cloning repository: ${err.message}`);
            return;
        }

        vscode.window.showInformationMessage(`MAutils repository cloned successfully to '${targetDir}'.`);
    });
}

function initiateFilesFromMAutils() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }

    const sourceDir = path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "ma5951", "MAutils", "MAlibRobotFiles");

    if (!fs.existsSync(sourceDir)) {
        vscode.window.showErrorMessage(`Source directory '${sourceDir}' not found. Make sure the repository is cloned.`);
        return;
    }

    function copyFiles(source: string, target: string) {
        fs.readdirSync(source).forEach(file => {
            const sourceFile = path.join(source, file);
            const targetFile = path.join(target, file);

            if (fs.lstatSync(sourceFile).isDirectory()) {
                fs.mkdirSync(targetFile, { recursive: true });
                copyFiles(sourceFile, targetFile); // Recursively copy subdirectories
            } else {
                fs.copyFileSync(sourceFile, targetFile);
                vscode.window.showInformationMessage(`File '${file}' copied to workspace.`);
            }
        });
    }

    copyFiles(sourceDir, workspaceFolders[0].uri.fsPath);
    vscode.window.showInformationMessage('Auto-initiation of MA complete.');
}

function pullUpdatesToMAutils() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }

    const targetDir = path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "ma5951", "MAutils");

    if (!fs.existsSync(targetDir)) {
        vscode.window.showErrorMessage(`Directory '${targetDir}' not found. Make sure the repository is cloned.`);
        return;
    }

    // Perform a git pull operation
    cp.exec('git pull', { cwd: targetDir }, (err, stdout, stderr) => {
        if (err) {
            vscode.window.showErrorMessage(`Error pulling updates: ${err.message}`);
            return;
        }

        vscode.window.showInformationMessage('Updates pulled successfully.');
    });
}

function HelloWorld() {
    vscode.window.showInformationMessage('Hello World!');
}

export function activate(context: vscode.ExtensionContext) {
    let disposable2 = vscode.commands.registerCommand('MAutils-extention.extension.Hello-world', HelloWorld);
    let disposable3 = vscode.commands.registerCommand('MAutils-extention.extension.auto-initiate-Ma', autoInitiateMa);
    let disposable4 = vscode.commands.registerCommand('MAutils-extention.extension.clone-MAutils', cloneMAutils);
    let disposable5 = vscode.commands.registerCommand('MAutils-extention.extension.initiate-files-from-MAutils', initiateFilesFromMAutils);
    let disposable = vscode.commands.registerCommand('MAutils-extention.extension.pull-updates-to-MAutils', pullUpdatesToMAutils);

    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable4);
    context.subscriptions.push(disposable5);
    context.subscriptions.push(disposable);
}
