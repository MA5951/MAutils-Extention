import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';

import { ItemType, Item, data } from './model';

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

    const sourceDir = path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "robot files");

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

function createMAFile(uri: vscode.Uri) {
    let maFileTypes = new Array<string>();

    const maUtilsWorkspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!maUtilsWorkspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }

    const baseDir = maUtilsWorkspaceFolder.uri.fsPath;
    
    
    // function readFiles():string[] {
    fs.readdir(path.join(baseDir, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "example"), function (err, files) {
        if (err) {
            vscode.window.showErrorMessage('Unable to scan directory: ' + err);
        }
        
        const maFileTypes = new Array<string>();
        
        files.forEach(function (file) {
            if (path.extname(file) === '.java') {
                maFileTypes.push(path.basename(file, '.java'));
            }
        });

        vscode.window.showQuickPick(maFileTypes, {
            placeHolder: "Select MAutil File Type"
        }).then((selectedType) => {
            if (selectedType) {
                vscode.window.showInputBox({
                    prompt: `Enter the name of the new ${selectedType} file (without extension)`,
                    validateInput: (value) => {
                        if (!value || value.trim() === "") {
                            return "File name cannot be empty";
                        }
                        return null;
                    }
                }).then((fileName) => {
                    vscode.window.showInformationMessage(`${fileName}`);
                    if (fileName) {
                        const templateFliePath = path.join(baseDir, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "example", `${selectedType}.java`);
                        
                        if (fs.existsSync(templateFliePath)) {
                            const templateFileContent =  fs.readFileSync(templateFliePath, 'utf8');
                            const fileContent = templateFileContent.replace(/{{fileName}}/g, fileName);

                            const filePath = path.join(uri.fsPath, `${fileName}.java`);

                            if (!fs.existsSync(filePath)) {
                                fs.writeFileSync(filePath, fileContent);

                                vscode.window.showInformationMessage(`File '${fileName}.java' created successfully.`);
                            } else {
                                vscode.window.showErrorMessage(`File '${fileName}.java' already exists.`);
                            }
                        } else {
                            vscode.window.showErrorMessage(`Directory '${templateFliePath}' not found. Make sure the repository is cloned.`);
                        }
                    }
                });
            }
        });
    });
}

class MyTreeItem extends vscode.TreeItem {
    [x: string]: any;
    constructor(label: string, public readonly markdownPath: string, public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
        super(label, collapsibleState);
    }
}

class MyTreeDataProvider implements vscode.TreeDataProvider<MyTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<MyTreeItem | undefined | null> = new vscode.EventEmitter<MyTreeItem | undefined | null>();
    onDidChangeTreeData: vscode.Event<MyTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    selectedNode: MyTreeItem | undefined; // Add this line

    getTreeItem(element: MyTreeItem): vscode.TreeItem {
        return element;
    }

    getSelectedNode(): MyTreeItem | undefined {
        // Logic to get the currently selected node
        // This might involve keeping track of the selected node in your class
        return this.selectedNode;
    }

    getChildren(element?: MyTreeItem): vscode.ProviderResult<MyTreeItem[]> {
        if (!element) {
            // If no element is provided, return the root categories ("motors," "sensors," etc.)
            return this.getRootCategories();
        }

        // If element has children, return them
        if (element.children) {
            return element.children;
        }

        return [];
    }

    private getRootCategories(): MyTreeItem[] {
        // get the workspace folder
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const frcSpecificationFolder = workspaceFolders ? path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "frcSpecification") : '';

        class MyTreeItem extends vscode.TreeItem {
            constructor(label: string, public readonly markdownPath: string, public readonly collapsibleState: vscode.TreeItemCollapsibleState, public children?: MyTreeItem[]) {
                super(label, collapsibleState);
            }
        }

        const rootItems: MyTreeItem[] = [];

        // Add your categories here
        const motorsCategory = new MyTreeItem("motors", "", vscode.TreeItemCollapsibleState.Collapsed, [
            new MyTreeItem("motor1", path.join(frcSpecificationFolder, "motor", "motor1.md"), vscode.TreeItemCollapsibleState.None),
            new MyTreeItem("motor2", path.join(frcSpecificationFolder, "motor", "motor2.md"), vscode.TreeItemCollapsibleState.None),
            // Add more motors...
        ]);

        const sensorsCategory = new MyTreeItem("sensors", "", vscode.TreeItemCollapsibleState.Collapsed, [
            new MyTreeItem("sensor1", path.join(frcSpecificationFolder, "motor", "sensor1.md"), vscode.TreeItemCollapsibleState.None),
            new MyTreeItem("sensor2", path.join(frcSpecificationFolder, "motor", "sensor2.md"), vscode.TreeItemCollapsibleState.None),
            // Add more sensors...
        ]);

        // Add more categories...

        rootItems.push(motorsCategory, sensorsCategory /*, ... */);

        return rootItems;
    }

    private getRootItems(): MyTreeItem[] {
        // Implement logic to return the root items
        return [];
    }

    private getChildrenForElement(element: MyTreeItem): MyTreeItem[] {
        // Implement logic to return the children based on the element
        return [];
    }

    async resolveTreeItem(item: MyTreeItem): Promise<MyTreeItem> {
        return item;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(null);
    }

    showDetails(item: MyTreeItem): void {
        const panel = vscode.window.createWebviewPanel(
            'mautilsDetails',
            `Details for ${item.label}`,
            vscode.ViewColumn.One,
            { enableScripts: true }
        );
    
        if (item.markdownPath) {
            const content = fs.readFileSync(item.markdownPath, 'utf8');
            panel.webview.html = getWebViewContent(content);
        } else {
            panel.webview.html = `<div>No details available for ${item.label}</div>`;
        }
    }    
}

let treeDataProvider: MyTreeDataProvider;

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('MAutils-extention.extension.auto-initiate-Ma', autoInitiateMa);
    let disposable2 = vscode.commands.registerCommand('MAutils-extention.extension.clone-MAutils', cloneMAutils);
    let disposable3 = vscode.commands.registerCommand('MAutils-extention.extension.initiate-files-from-MAutils', initiateFilesFromMAutils);
    let disposable4 = vscode.commands.registerCommand('MAutils-extention.extension.pull-updates-to-MAutils', pullUpdatesToMAutils);
    let disposable5 = vscode.commands.registerCommand('extension.createMAFile', createMAFile);

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
    context.subscriptions.push(disposable4);
    context.subscriptions.push(disposable5);

    
    treeDataProvider = new MyTreeDataProvider();
    vscode.window.createTreeView('mautils', { treeDataProvider });

    context.subscriptions.push(
        vscode.commands.registerCommand('mautils.refresh', () => {
            treeDataProvider.refresh();
        })
    );

    treeDataProvider.onDidChangeTreeData((node) => {
        // Update the webview with the selected item's markdown content
        const selectedNode = treeDataProvider.getSelectedNode();
        if (selectedNode && selectedNode.markdownPath) {
            const content = fs.readFileSync(selectedNode.markdownPath, 'utf8');
            const webviewPanel = vscode.window.createWebviewPanel(
                'mautilsFRCSpecification',
                `MAutils FRC Specification - ${selectedNode.label}`,
                vscode.ViewColumn.Two,
                { enableScripts: true }
            );
            webviewPanel.webview.html = getWebViewContent(content);
        }
    });
}

function getWebViewContent(filePath: string): string {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>MAutils FRC Specification</title>
                <style>
                    /* Add your styles here */
                </style>
            </head>
            <body>
                <div id="content">
                    ${content}
                </div>

                <script>
                    // Your existing script...
                </script>
            </body>
            </html>`;
    } catch (error) {
        console.error(`Error reading file ${filePath}: ${(error as Error).message}`);
        return `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
            </head>
            <body>
                <div id="content">
                    <p>Error reading file ${filePath}</p>
                </div>
            </body>
            </html>`;
    }
}

// Usage:

const workspaceFolders = vscode.workspace.workspaceFolders;
const frcSpecificationFolder = workspaceFolders ? path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "frcSpecification") : '';
const motorFilePath = path.join(frcSpecificationFolder, "motor", "motor1.md");
const webviewContent = getWebViewContent(motorFilePath);