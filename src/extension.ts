import { ExtensionContext, commands, window, workspace } from 'vscode';
import * as utils from './utils';

const moo = require('moo')

const DISPLAY_NAME = 'Native-ASCII Converter';

// For ZenScript, comment prefix is double slashes.
const COMMENT_PREFIX = '//';

export function activate(context: ExtensionContext) {

  // Register VSCode Text Editor commands

  context.subscriptions.push(
    commands.registerTextEditorCommand(
      'extension.convertNativeToAscii', handle(convertNativeToAscii))
  );

  context.subscriptions.push(
    commands.registerTextEditorCommand(
      'extension.convertAsciiToNative', handle(convertAsciiToNative))
  );

  registerListeners();
}

export function deactivate() {}

// New implementation with Moo by @raylras
let lexer = moo.compile({
  string:  /"[^"]*"/,
  code: { match: /[^"']+/, lineBreaks: true },
})
// Unicode Conversion for current active file.
const convertNativeToAscii = () : void => {
  const lowerCase = utils.getConfigParameter('letter-case');
  lexer.reset(utils.getFullText());
  let newText = '';
  let token;
  while (token = lexer.next()) {
    if (token.type === 'string') {
        newText = newText + utils.nativeToAscii(token.text, lowerCase);
    } else {
        newText = newText + token.text;
    }
  }
  utils.setFullText(newText);
};
// This part of code is licensed under WTFPL by @raylras.

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
        window.showErrorMessage(`[${DISPLAY_NAME}] ${e.message}`);
      }
    }
  };
};

// Text file event listener
const registerListeners = () : void => {

  // Convert when file saved
  workspace.onWillSaveTextDocument(event => {
    if (utils.getConfigParameter('auto-conversion-on-save')
        && utils.isActiveDocumentZenScriptFile()) {
      handle(convertNativeToAscii)();
    }
  });

  // Convert when file avtivated
  window.onDidChangeActiveTextEditor(textEditor => {

    if (window.activeTextEditor
        && utils.getConfigParameter('auto-conversion-on-activate')
        && utils.isActiveDocumentZenScriptFile()) {
      handle(convertAsciiToNative)();
    }
  });
};
