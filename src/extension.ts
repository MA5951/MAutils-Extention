import * as vscode from 'vscode';

import {autoInitiateMa, cloneMAutils, initiateFilesFromMAutils, pullUpdatesToMAutils} from './functions/MAutilsGithubFunctions';
import { createMAFile } from './functions/createMAFile';
import { HardwareInfoProvider } from './functions/hardwareInfo';
import { motors, sensors } from './data';

export function activate(context: vscode.ExtensionContext) {
    let autoInitiateMaDisposable = vscode.commands.registerCommand('MAutils-extention.extension.auto-initiate-Ma', autoInitiateMa);
    let cloneMAutilsDisposable = vscode.commands.registerCommand('MAutils-extention.extension.clone-MAutils', cloneMAutils);
    let initiateFilesFromMAutilsDisposable = vscode.commands.registerCommand('MAutils-extention.extension.initiate-files-from-MAutils', initiateFilesFromMAutils);
    let pullUpdatesToMAutilsDisposable = vscode.commands.registerCommand('MAutils-extention.extension.pull-updates-to-MAutils', pullUpdatesToMAutils);
    let createMAFileDisposable = vscode.commands.registerCommand('extension.createMAFile', createMAFile);

    context.subscriptions.push(autoInitiateMaDisposable);
    context.subscriptions.push(cloneMAutilsDisposable);
    context.subscriptions.push(initiateFilesFromMAutilsDisposable);
    context.subscriptions.push(pullUpdatesToMAutilsDisposable);
    context.subscriptions.push(createMAFileDisposable);

    const hardwareInfoProvider = new HardwareInfoProvider(motors, sensors);
    vscode.window.createTreeView('hardwareInfo', { treeDataProvider: hardwareInfoProvider });

    context.subscriptions.push(
        vscode.commands.registerCommand('hardwareInfo.refresh', () => {
            hardwareInfoProvider.refresh();
        })
    );
}