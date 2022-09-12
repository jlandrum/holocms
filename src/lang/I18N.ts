export function i(key: string) {
  const lang = require('./enus.json');
  return lang[key] || key;
}