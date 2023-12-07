import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

enum InsertLocation {
    StartOfFunction,
    EndOfFunction,
    StartOfClass,
    EndOfClass,
    AfterSpecificFunction,
    AfterSpecificClass,
    AfterSpecificLine,
}

function findClosingBraceIndex(content: string, startIndex: number): number {
    let braceCount = 0;
    let index = startIndex;

    while (index < content.length) {
        if (content[index] === '{') {
            braceCount++;
        } else if (content[index] === '}') {
            braceCount--;

            if (braceCount === 0) {
                return index;
            }
        }
        index++;
    }
    return -1;
}

export function insertCodeIntoFile(filePath: string, targetName: string, codeLines: string[], insertLocation: InsertLocation, afterLocation?: string): void {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} not found.`);
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const targetIndex = fileContent.indexOf(targetName);

        if (targetIndex === -1) {
            throw new Error(`Target ${targetName} not found in ${filePath}`);
        }

        let insertionPoint: number;

        switch (insertLocation) {
            case InsertLocation.StartOfFunction:
                insertionPoint = fileContent.indexOf('{', targetIndex) + 1;
                break;

            case InsertLocation.EndOfFunction:
                insertionPoint = findClosingBraceIndex(fileContent, targetIndex);
                break;

            case InsertLocation.StartOfClass:
                insertionPoint = fileContent.indexOf('{', targetIndex) + 1;
                break;

            case InsertLocation.EndOfClass:
                insertionPoint = findClosingBraceIndex(fileContent, targetIndex);
                break;

            case InsertLocation.AfterSpecificFunction:
                const specificFunctionIndex = fileContent.indexOf(afterLocation!);
                insertionPoint = findClosingBraceIndex(fileContent, specificFunctionIndex);
                break;

            case InsertLocation.AfterSpecificClass:
                const specificClassIndex = fileContent.indexOf(afterLocation!);
                insertionPoint = findClosingBraceIndex(fileContent, specificClassIndex);
                break;

            case InsertLocation.AfterSpecificLine:
                insertionPoint = fileContent.indexOf(afterLocation!) + afterLocation!.length;
                break;

            default:
                vscode.window.showErrorMessage('Invalid insert location');
                return;
        }

        if (insertionPoint === undefined || insertionPoint < 0 || insertionPoint > fileContent.length) {
            throw new Error('Invalid insertion point calculation.');
        }

        const updatedContent =
            fileContent.slice(0, insertionPoint) +
            '\n' + codeLines.join('\n') +
            fileContent.slice(insertionPoint);

        fs.writeFileSync(filePath, updatedContent);
        vscode.window.showInformationMessage(`Code inserted into ${targetName} successfully.`);

    } catch (error) {
        vscode.window.showErrorMessage("Error inserting code into file");
    }
}

// Example usage:
const filePath = '/path/to/your/example.java';
const targetName = 'PortMap';
const afterLocation = 'ExampleSubsystem';
const codeToInsert = [
    'public static class NewSubsystem {',
    '    // Code for the new subsystem',
    '}',
];

insertCodeIntoFile(filePath, targetName, codeToInsert, InsertLocation.AfterSpecificClass, afterLocation);
// in this example, the code will be inserted in "example.java" in the "portmap" class right after the "ExampleSubsystem" class that is in the "PortMap" class