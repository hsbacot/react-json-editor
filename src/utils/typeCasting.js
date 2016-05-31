export const JSONtypes = ['String', 'Object', 'Number', 'Boolean', 'Array', 'Null', 'Undefined'];

// escapes chars as needed
function addSlashes(str) {
  return (`${str}`).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

export function valueAsType(val, type) {
  // JS Primitive Types
  switch (type) {
    case 'String':
      return String(addSlashes(val));
    case 'Object':
      try {
        return JSON.parse(val);
      } catch (error) {
        throw new Error({ error });
      }
    case 'Number':
      return Number(val);
    case 'Boolean':
      return val === 'true';
    case 'Array':
      return JSON.parse(val);
    case 'Null':
      return null;
    case 'Undefined':
      return undefined;
    default:
      return undefined;
  }
}

