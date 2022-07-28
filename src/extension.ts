import * as vscode from 'vscode';
import * as utils from './utils';

const DISPLAY_NAME = 'Native-ASCII Converter';

// For ZenScript, comment prefix is double slashes.
const COMMENT_PREFIX = '//';

export function activate(context: vscode.ExtensionContext) {

  // Register VSCode Text Editor commands

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'extension.convertNativeToAscii', handle(convertNativeToAscii))
  );

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'extension.convertAsciiToNative', handle(convertAsciiToNative))
  );

  registerListeners();
}

export function deactivate() {}

// Unicode Conversion for current active file.
const convertNativeToAscii = () : void => {
  const lowerCase = utils.getConfigParameter('letter-case');
  const commentConversion = utils.getConfigParameter('comment-conversion');

  const newText = utils.getFullText()
    .split(/\r?\n/g)
    .map(line => {
      if (!commentConversion && line.startsWith(COMMENT_PREFIX)) {
        return line;
      } else {
        return utils.nativeToAscii(line, lowerCase);
      }
    })
    .join(utils.getEol());

  utils.setFullText(newText);
};

// Convert ASCII to Unicode for current active file.
const convertAsciiToNative = () : void => {
  const newText = utils.asciiToNative(utils.getFullText());
  utils.setFullText(newText);
};

// Error Handler
const handle = (func : Function) => {
  return () => {
    try {
      func();
    } catch (e) {
      console.error(DISPLAY_NAME, e);
      if (e.message) {
        vscode.window.showErrorMessage(`[${DISPLAY_NAME}] ${e.message}`);
      }
    }
  };
};

// Text file event listener
const registerListeners = () : void => {

  // Convert when file saved
  vscode.workspace.onWillSaveTextDocument(event => {
    if (utils.getConfigParameter('auto-conversion-on-save')
        && utils.isActiveDocumentZenScriptFile()) {
      handle(convertNativeToAscii)();
    }
  });

  // Convert when file avtivated
  vscode.window.onDidChangeActiveTextEditor(textEditor => {

    if (vscode.window.activeTextEditor
        && utils.getConfigParameter('auto-conversion-on-activate')
        && utils.isActiveDocumentZenScriptFile()) {
      handle(convertAsciiToNative)();
    }
  });
};
