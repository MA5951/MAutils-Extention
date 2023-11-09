# MAutils Extension

## Overview
The MAutils Extension is a Visual Studio Code extension made by FRC team Makers Assemble 5951 designed to streamline the development process for FRC robotics teams using the Wpilib Java library along with our custom library called "MAutils". This extension provides convenient commands to clone the MAutils repository, initiate files, and pull updates.

## Installation
You can install the MAutils Extension by searching for "MAutils" on the Visual Studio Code Marketplace.

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or pressing Ctrl+Shift+X (Windows/Linux) or 3. Cmd+Shift+X (Mac).
3. Search for "MAutils" in the search bar.
Find the extension in the search results and click the "Install" button.

## Features
* **Clone MAutils:** This command allows you to clone the MAutils repository into the specified directory within your workspace.
* **Initiate Files from MAutils:** This command copies files from the "MAlibRobotFiles" directory within the MAutils repository into your workspace. It also supports copying files from subdirectories.
* **Pull Updates to MAutils:** This command performs a git pull operation within the MAutils directory to fetch and apply updates from the repository.
* **Auto Initiate MA:** This command combines the functionality of cloning the MAutils repository and initiating files in one step.

## Usage
**1. Clone MAutils:**
* Open Visual Studio Code.
* Open a workspace.
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select "Clone MAutils". This will clone the MAutils repository into the specified directory.

**2. Initiate Files from MAutils:**
* Open Visual Studio Code.
* Open a workspace.
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select "Initiate Files from MAutils". This will copy files from the "MAlibRobotFiles" directory within the MAutils repository into your workspace.

**3. Pull Updates to MAutils:**
* Open Visual Studio Code.
* Open a workspace.
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select "Pull Updates to MAutils". This will perform a git pull operation within the MAutils directory to fetch and apply updates.

**4. Auto Initiate MA:**
* Open Visual Studio Code.
* Open a workspace.
* Use the command palette (Ctrl+Shift+P or Cmd+Shift+P on Mac) and select "Auto Initiate MA". This command combines cloning the MAutils repository and initiating files in one step.

## Requirements
* Visual Studio Code
* Git (must be installed and accessible from the command line)

## Known Issues
* None at the moment.

## Contributing
If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/MA5951/MAutils-Extention).

## License
This extension is licensed under the [MIT License](https://github.com/MA5951/MAutils-Extention/blob/master/LICENSE).

