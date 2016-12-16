(function(qsc) {
  var TokenTypes = {
    WORD: 0,
    NUMBER: 1,
    PUNC_SEQ: 2,
    
    NEWLINE: 3,
    MEANINGLESS_WHITESPACE: 4,
    
    LP: 5,
    RP: 6,
    LS: 7,
    RS: 8,
    LC: 9,
    RC: 10
  };
  
  qsc.TokenTypes = TokenTypes;
})(QuartzscriptCompiler);
