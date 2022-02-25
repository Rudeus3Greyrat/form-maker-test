export function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isPlainObject(obj) {
  const keys = Object.keys(obj);
  return keys.length === 0;
}
