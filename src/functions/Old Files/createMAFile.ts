import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function createMAFile(uri: vscode.Uri) {
    let maFileTypes = new Array<string>();

    const maUtilsWorkspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!maUtilsWorkspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }

    const baseDir = maUtilsWorkspaceFolder.uri.fsPath;
    console.log(baseDir);
    
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
                            vscode.window.showErrorMessage(`Directory '${templateFliePath}' not found. Make sure the repository is cloned and in the right directory.`);
                        }
                    }
                });
            }
        });
    });
}