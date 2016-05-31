export  const JSONtypes = ['String', 'Object', 'Number', 'Boolean', 'Array', 'Null', 'Undefined'];

export function toNumber(val) {
  return Number(val);
}

export function valueAsType(val, type) {

    //['String', 'Object', 'Number', 'Boolean', 'Array'];
    switch(type) {
      case 'String':
        return String(addslashes(val));
      case 'Object':
        try {
          return JSON.parse(val);
        } catch(error) {
          throw ({error})
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
    }
}

// escapes chars as needed
function addslashes( str ) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}