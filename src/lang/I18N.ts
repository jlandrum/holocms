import reactStringReplace from "react-string-replace";

export function i(key: string, ...replace: any[]) {
  var loadedLang: any = {};
  const lang = navigator.language.toLowerCase();

  if (!window.debugLanguages) {
    if (lang.startsWith('en')) {
      loadedLang = require('./enus.json');
    }  
  }

  const string = loadedLang[key] || key;
  if (replace) {
    return replace.reduce((p,c,i) => {
      return reactStringReplace(p, `%${i}%`, (m,i) => c);
    }, string);
  } else {
    return string;
  }
}