import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';



export function createMAsubsytem(uri: vscode.Uri) {
    let maFileTypes = new Array<string>();

    const maUtilsWorkspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (!maUtilsWorkspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }
    const baseDir = maUtilsWorkspaceFolder.uri.fsPath;

    
    // function readFiles():string[] {
    fs.readdir(path.join(baseDir, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "example", "SubsystemsType"), function (err, files) {
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
            placeHolder: "Select Subsystem Type"
        }).then((selectedType) => {
            if (selectedType) {
                vscode.window.showInputBox({
                    prompt: `Enter the name of the new ${selectedType} subsystem`,
                    validateInput: (value) => {
                        if (!value || value.trim() === "") {
                            return "Subsystem name cannot be empty";
                        }
                        return null;
                    }
                }).then((fileName) => {
                    vscode.window.showInformationMessage(`${fileName}`);
                    if (fileName) {
                        const subsytemFolderDir = path.join(baseDir, "src", "main", "java","frc", "robot", "subsystems", `${fileName}`);
                        const commandFolderDir = path.join(baseDir, "src", "main", "java","frc", "robot", "commands", "Automation" ,`${fileName}`);
                        fs.mkdir(subsytemFolderDir , { recursive: true }, e => {
                            if (e) {
                                console.error(e);
                            } else {
                                vscode.window.showErrorMessage('Unable to scan directory: ' + err);
                            }
                         });
                         fs.mkdir(commandFolderDir , { recursive: true }, e => {
                            if (e) {
                                console.error(e);
                            } else {
                                vscode.window.showErrorMessage('Unable to scan directory: ' + err);
                            }
                         });
                        const templateFliePath = path.join(baseDir, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "example", `${selectedType}.java`);
                        const constantstemplateFliePath = path.join(baseDir, "src", "main", "java", "com", "ma5951", "MAutils", "MA-extention-files", "example", `Constants.java`);
                        
                        if (fs.existsSync(templateFliePath) && fs.existsSync(constantstemplateFliePath) ){
                            const templateFileContent =  fs.readFileSync(templateFliePath, 'utf8');
                            const constantstemplateFileContent =  fs.readFileSync(constantstemplateFliePath, 'utf8');
                            const fileContent = templateFileContent.replace(/{{fileName}}/g, fileName);
                            const constantsfileContent = constantstemplateFileContent.replace(/{{fileName}}/g, fileName);

        
                            const filePath = path.join(baseDir, "src", "main", "java","frc", "robot", "subsystems", `${fileName}`, `${fileName}.java`);
                            const constantsfilePath = path.join(baseDir, "src", "main", "java","frc", "robot", "subsystems", `${fileName}`, `${fileName}Constants.java`);

                            if (!fs.existsSync(filePath)) {
                                fs.writeFileSync(filePath, fileContent);
                                fs.writeFileSync(constantsfilePath, constantsfileContent);

                                vscode.window.showInformationMessage(`Subsystem '${fileName}.java' created successfully.`);
                            } else {
                                vscode.window.showErrorMessage(`Subsystem '${fileName}.java' already exists.`);
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