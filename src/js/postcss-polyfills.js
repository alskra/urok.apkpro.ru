import cssBlankPseudo from 'css-blank-pseudo/browser';
import 'focus-visible';
import focusWithin from 'focus-within';
import cssHasPseudo from 'css-has-pseudo/browser';

cssBlankPseudo(document);
focusWithin(document);
cssHasPseudo(document);

// Fix for `css-has-pseudo`
// eslint-disable-next-line no-extend-native
Array.prototype.toLowerCase = function toLowerCase() {
  return this.join().toLowerCase();
};
