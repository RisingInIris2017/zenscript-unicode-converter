import * as vscode from 'vscode';


// Retrieve the entire contents of the active text file
export const getFullText = () : string => {
  return getDocument().getText();
};

// Replace the entire contents of the active text file
export const setFullText = (newText : string) : void => {
  
  const document = getDocument();
  const invalidRange = new vscode.Range(0, 0, document.lineCount, 0);
  const fullRange = document.validateRange(invalidRange);

  const editor = getEditor();
  editor.edit(builder => builder.replace(fullRange, newText));

  // The selection will be in a halfway selected state, so deselect it.
  editor.selection = new vscode.Selection(0, 0, 0, 0);
};

// Encode to Unicode format
export const nativeToAscii = (text : string, lowerCase : boolean = true) : string => {

  return text.split('')
    .map(char => {
      const code = char.charCodeAt(0);

      if (code <= 0x7f) {
        // ASCII characters are retained.
        return char;
      }

      // 8-bit characters are 0-padded.
      const escaped = escape(char).replace('%', code <= 0xff ? '\\u00' : '\\');

      return lowerCase ? escaped.toLocaleLowerCase() : escaped;
    })
    .join('');
};

// Decode from Unicode format
export const asciiToNative = (text : string) : string => {
  return unescape(text.replace(/\\(?=u[0-9A-Za-z])/g, '%'));
};

// Get the active text editor
export const getEditor = () : vscode.TextEditor => {
  if (vscode.window.activeTextEditor) {
    return vscode.window.activeTextEditor;
  }

  throw new Error('Text editor is not active.');
};

// Retrieve the document in the active text editor
export const getDocument = () : vscode.TextDocument => {
  const editor = getEditor();
  if (editor.document) {
    return editor.document;
  }

  throw new Error('Text document is not active.');
};

// Get the newline character of the active document.
export const getEol = () : string => {
  return getDocument().eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
};

// Check the language of the file.
// Here we should check if its a ZenScript source file.
export const isActiveDocumentZenScriptFile = () : boolean => {
  const useFilesAssociations = getConfigParameter('use-files.associations');
  const document = getDocument();

  if (useFilesAssociations) {
    return document.languageId === 'zenscript';
  } else {
    return document.fileName.endsWith('.zs');
  }
};

// Read config for parameters.
export const getConfigParameter = (name : string) : any => {
  const config = vscode.workspace.getConfiguration('zenscript-unicode-converter');
  return config.get(name);
};
