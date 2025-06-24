"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitLib = InitLib;
exports.addLib = addLib;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cp = __importStar(require("child_process"));
const vscode = __importStar(require("vscode"));
function InitLib() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace before running this command.');
        return;
    }
    const libDir = path.join(workspaceFolders[0].uri.fsPath, "src", "main", "java", "com", "MAutils");
    addLib(libDir);
}
function addLib(libDir) {
    if (fs.existsSync(libDir)) {
        vscode.window.showWarningMessage(`Directory '${libDir}' already exists. Skipping clone.`);
        return;
    }
    if (!fs.existsSync(path.dirname(libDir))) {
        fs.mkdirSync(path.dirname(libDir), { recursive: true });
    }
    cp.exec(`git clone https://github.com/MA5951/MAutilsPro.git`, { cwd: path.dirname(libDir) }, (err, stdout, stderr) => {
        if (err) {
            vscode.window.showErrorMessage(`Error cloning repository: ${err.message}`);
            return;
        }
        vscode.window.showInformationMessage(`MAutils repository cloned successfully to '${libDir}'.`);
    });
}
//# sourceMappingURL=InitMAutilsLib.js.map