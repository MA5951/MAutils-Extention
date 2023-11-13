# MAutils Extension

## Overview
The MAutils Extension is a Visual Studio Code extension made by FRC team Makers Assemble 5951 designed to streamline the development process for FRC robotics teams using the Wpilib Java library along with our custom library called "MAutils". This extension provides convenient commands to clone the MAutils repository, initiate files, and pull updates.

## Installation
You can install the MAutils Extension by searching for "MAutils" on the Visual Studio Code Marketplace.

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or pressing Ctrl+Shift+X (Windows/Linux) or 3. Cmd+Shift+X (Mac).
3. Search for "MAutils" in the search bar.
Find the extension in the search results and click the "Install" button.

## Features - MAutils not required
* **Hardware Info:** This is not a command but it is actually a always active feature, with the extension installed, you will see a button on the bottom left of your screen that says "Hardware Info", this button will open a side bar with a tree view for info on FRC motors and sensors. This feature is still in development and will be updated as we add more info. 

## Features - MAutils required
* **Clone MAutils:** This command allows you to clone the MAutils repository into the specified directory within your workspace.
* **Initiate Files from MAutils:** This command copies files from the "MAlibRobotFiles" directory within the MAutils repository into your workspace. It also supports copying files from subdirectories.
* **Pull Updates to MAutils:** This command performs a git pull operation within the MAutils directory to fetch and apply updates from the repository.
* **Auto Initiate MA:** This command combines the functionality of cloning the MAutils repository and initiating files in one step.
* **Create MA File**: Quickly create new MAutil files using predefined templates.

## Usage
**1. Hardware Info:**
* Click on the `Hardware Info` button on the bottom left of your screen.

**2. Clone MAutils:**
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select `MAutils: Clone MAutils`. This will clone the MAutils library into the current project.

**3. Initiate Files from MAutils:**
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select `MAutils: Initiate Files from MAutils`. This will copy files from the "MAlibRobotFiles" directory within the MAutils repository into your workspace.

**4. Pull Updates to MAutils:**
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select `MAutils: Pull Updates to MAutils`. This will perform a git pull operation within the MAutils directory to fetch and apply updates.

**5. Auto Initiate MA:**
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select `MAutils: Auto Initiate MA`. This command combines cloning the MAutils repository and initiating files in one step.

**6. To create a new MAutil file:**

* Right-click on a folder in the Explorer panel.
* Select `Create MA File`.
* Choose the type of MAutil file you want to create and provide a name.

* **add a new file to the example list:** in the `MA-extention-files` folder in the MAutils library, open the folder `exaple` and add a new file with the name of the exaple and change the main class name from the name of the file to `{{fileName}}`.

## Requirements
* Visual Studio Code
* Git (must be installed and accessible from the command line)

## Known Issues
* None at the moment.

If you find any issues please open an issue on the [GitHub repository](https://github.com/MA5951/MAutils-Extention).

## License
This extension is licensed under the [MIT License](https://github.com/MA5951/MAutils-Extention/blob/master/LICENSE).

# Contributing
If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/MA5951/MAutils-Extention).

For specific instructions on how add data or features follow the instructions below.

If you want to know more check out the [Visual Studio Code Extension API](https://code.visualstudio.com/api) and [Extension Guides](https://code.visualstudio.com/api/extension-guides/overview).

## How to package the extension yourself if you want to make changes
1. Packaging the extension
* Install the latest version of node.js
* Clone the repository
* update the version number in the package.json file if you want to publish it to the [marketplace](https://marketplace.visualstudio.com/vscode) or as a github release.
* Open a terminal in the extension folder (can be the integrated terminal in VSCode).
* Run `npm install` to install the dependencies.
* Run `npm install -g vsce` to install the Visual Studio Code Extension Manager.
* Run `vsce package` to create the .vsix file.
* You can now install the extension by opening the .vsix file in Visual Studio Code

2. Publishing the extension
* publish it to the [marketplace](https://marketplace.visualstudio.com/vscode) by uploading the .vsix made by packaging the extension.
* commit and push your changes to the [GitHub repository](https://github.com/MA5951/MAutils-Extention) and create a pull request.
* [make a new release on the github repository](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

## Creating a new command
* Clone the [GitHub repository](https://github.com/MA5951/MAutils-Extention).
* Install node.js.
* Open the repository in VSCode.
* Run `npm install` in the terminal.

* Make a new file in the `src/functions` folder with the name of the command you want to make, for example `newCommand.ts`.
* Import vs code, like this `import * as vscode from 'vscode';`.
* In the new file make a new exported function with the name of the command you want to make, for example `newCommand`.
* In the new function add the code you want to run when the command is called.
* In the `extension.ts` file in the `src` folder import the new function with the name of the command you want to make, for example `import { newCommand } from './functions/newCommand';`.
* In the `extension.ts` file in the `src` folder add the new command to the `activate` function, that will look like this: 
```ts
let newCommandDisposable = vscode.commands.registerCommand('extension.newCommand', newCommand);

context.subscriptions.push(newCommandDisposable);
```
* now go in to the `package.json` file in the `src` folder and add the new command to the `contributes.commands` array, that will look like this:
```json
{
    "command": "extension.newCommand",
    "title": "New Command"
}
```
* now you can run the extension by pressing `F5` or by clicking the `Run` button in the debug tab.
* now you can test the extension by running the command you just made in the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and selecting `New Command`.

## Adding data to the hardware info feature
* **How to add a new motor or sensor to the list:** clone the repository for the extension, open the `data.ts` file in the `src` folder, now you will see two arrays `motors` and `sensors` you can create new objects in the arrays with the following format:
```ts
new MotorItem('{motor name}', [
    new HardwareProperty('{property 1}', '{property 1 value}'),
    new HardwareProperty('{property 2}', '{property 2 value}')
    // add as many properties as you want
])
```
In the same way you can add new sensors to the `sensors` array.
You can also add new properties to existing items by making a `new HardwareProperty('{property}', '{property value}')`.

* **adding another catagory to the list** is more comlicated, you will need to first go into the `hardwareInfo.ts`, now first make a new class for the catagory, that sould look like this, through the example of the `motors` catagory switch `motors` with the name of the catagory you want to add:
```ts
export class MotorsItem {
    label: string;
    properties: HardwareProperty[];

    constructor(label: string, properties: HardwareProperty[]) {
        this.label = label;
        this.properties = properties;
    }
}
```
then in the `HardwareInfoProvider` class add a new array with the name of the catagory and the type of the array is the class you just made, like this: `Motors: MotorsItem[];` then add the array to the `constructor` function still in the `HardwareInfoProvider` class that will look like this `this.Motors = Motors`. now you need to add the catagory to the `getChildren` function in the `HardwareInfoProvider` class, that will look like this:
```ts
if (element.label === 'Motors') {
    // Child level: Motors
    return this.motors.map(motor => new vscode.TreeItem(motor.label, vscode.TreeItemCollapsibleState.Collapsed));
}

// Child level: Motor Properties or Sensor Properties
const motor = this.motors.find(m => m.label === element.label);
if (motor) {
    return motor.properties.map(prop => new vscode.TreeItem(`${prop.label}: ${prop.value}`, vscode.TreeItemCollapsibleState.None));
}
```
And now finaly you can go in to the `data.ts` file and add an array of the type of your new catagory, that will look like this:
```ts
export const motors: MotorItem[] = [
    new MotorItem('Motor1', [
        new HardwareProperty('rpm', '1000'),
        new HardwareProperty('voltage', '12')
    ]),
    new MotorItem('Motor2', [
        new HardwareProperty('rpm', '2000'),
        new HardwareProperty('voltage', '16')
    ])
    // Add other motors...
];
```
