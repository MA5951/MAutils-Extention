import * as vscode from 'vscode';

import {autoInitiateMa, cloneMAutils, initiateFilesFromMAutils, pullUpdatesToMAutils} from './functions/Old Files/MAutilsGithubFunctions';
import { createMAFile } from './functions/Old Files/createMAFile';
import { HardwareInfoProvider } from './functions/Old Files/hardwareInfo';
import { motors, sensors } from './data';
import { createMAsubsytem } from './functions/Old Files/createMAsubsystem';

export function activate(context: vscode.ExtensionContext) {
    // let autoInitiateMaDisposable = vscode.commands.registerCommand('MAutils-extention.extension.auto-initiate-Ma', autoInitiateMa);
    // let cloneMAutilsDisposable = vscode.commands.registerCommand('MAutils-extention.extension.clone-MAutils', cloneMAutils);
    // let initiateFilesFromMAutilsDisposable = vscode.commands.registerCommand('MAutils-extention.extension.initiate-files-from-MAutils', initiateFilesFromMAutils);
    // let pullUpdatesToMAutilsDisposable = vscode.commands.registerCommand('MAutils-extention.extension.pull-updates-to-MAutils', pullUpdatesToMAutils);
    // let createMAFileDisposable = vscode.commands.registerCommand('extension.createMAFile', createMAFile);
    // let createMAsubsystemDisposable = vscode.commands.registerCommand('extension.createMAsubsytem', createMAsubsytem);

    // context.subscriptions.push(autoInitiateMaDisposable);
    // context.subscriptions.push(cloneMAutilsDisposable);
    // context.subscriptions.push(initiateFilesFromMAutilsDisposable);
    // context.subscriptions.push(pullUpdatesToMAutilsDisposable);
    // context.subscriptions.push(createMAFileDisposable);
    // context.subscriptions.push(createMAsubsystemDisposable); //Old Files
    
    const hardwareInfoProvider = new HardwareInfoProvider(motors, sensors);
    vscode.window.createTreeView('hardwareInfo', { treeDataProvider: hardwareInfoProvider });

    context.subscriptions.push(
        vscode.commands.registerCommand('hardwareInfo.refresh', () => {
            hardwareInfoProvider.refresh();
        })
    );
}