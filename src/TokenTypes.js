(function(qsc) {
  var TokenTypes = {
    WORD: 0,
    NUMBER: 1,
    PUNC_SEQ: 2,
    
    NEWLINE: 3,
    MEANINGLESS_WHITESPACE_SEQ: 4
  };
  
  qsc.TokenTypes = TokenTypes;
})(QuartzscriptCompiler);
