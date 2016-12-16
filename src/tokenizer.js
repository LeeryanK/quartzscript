(function(qsc) {
  /** START EXPORTS **/
  
  var TokenTypes = qsc.TokenTypes;
  
  /** END IMPORTS **/
  
  function tokenize(code) {
    var emptyState = {type: null};
    var state = emptyState;
    var tokens = {};
    for (var index = 0; index < code.length; index++) {
      var char = code.charAt(index);
      switch (state.type) {
        case TokenTypes.WORD:
          if (/[a-zA-Z0-9]/.test(char)) {
              state.content += char;
          } else {
            tokens.push(state);
            // Redo character check
            state = emptyState;
            index--;
          }
          break;
        case TokenTypes.NUMBER:
          if ('0' === state.content && /[box]/.test(char)) {
            state.content = '';
            state.radix = ({
              b: 2,
              o: 8,
              x: 16
            })[char];
          } else if (({
            2: /[01]/,
            8: /[0-7]/,
            10: /\d/,
            16: /[0-9a-fA-F]/
          })[state.radix].test(char)) {
            state.content += char;
          } else {
            tokens.push(state);
            // Redo character check
            state = emptyState;
            index--;
          }
          break;
        case TokenTypes.PUNC_SEQ:
          if (/[~`!@#\$%\^&\*\(\)\_\-=\+\{\[\}\]\|\\:;"'<,>\.\?\/]/.test(char)) {
            state.content += char;
          } else {
            tokens.push(state);
            // Redo character check
            state = emptyState;
            index--;
          }
          break;
        case TokenTypes.MEANINGLESS_WHITESPACE_SEQ:
          if (/\w/.test(char)) {
            state.content += char;
          } else {
            tokens.push(state);
            // Redo character check
            state = emptyState;
            index--;
          }
          break;
        case null:
          if (/[a-zA-Z]/.test(char)) {
            state = {type: TokenTypes.WORD, content: char};
          } else if (/\d/.test(char)) {
            state = {type: TokenTypes.NUMBER, content: char, radix: 10};
          } else if (/[~`!@#\$%\^&\*\(\)\_\-=\+\{\[\}\]\|\\:;"'<,>\.\?\/]/.test(char)) {
            state = {type: TokenTypes.PUNC_SEQ, content: char};
          } else if ('\n' === char) {
            tokens.push({type: TokenTypes.NEWLINE});
          } else if (/\w/.test(char)) {
            state = {type: TokenTypes.MEANINGLESS_WHITESPACE_SEQ, content: char};
          } else {
            qsc.error.illegalToken({content: char});
            // qsc.error.illegalToken should throw an error, but if it doesn't:
            tokens.push({type: TokenTypes.ILLEGAL, content: char});
            return tokens;
          }
          break;
                        }
    }
      
    if (state !== emptyState) {
      tokens.push(state);
    }
    
    return tokens;
  }
  
  /** START EXPORTS **/
  
  qsc.tokenize = tokenize;
  
  /** END EXPORTS **/
})(QuartzscriptCompiler);
