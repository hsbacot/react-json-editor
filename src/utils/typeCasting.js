export function toNumber(val) {
  return Number(val);
}

export function valueAsType(val, type) {
  return new Promise((resolve, reject) => {

    //['String', 'Object', 'Number', 'Boolean', 'Array'];
    switch(type) {
      case 'String':
        resolve(String(addslashes(val)));
        break;
      case 'Object':
        try {
          resolve(JSON.parse(val));
        } catch(error) {
          reject({error})
        }
        break;
      case 'Number':
        resolve(Number(val));
        break;
      case 'Boolean':
        resolve(val === 'true');
        break;
      case 'Array':
        resolve(JSON.parse(val));
        break;
      case 'Null':
        resolve(null);
        break;
      case 'Undefined':
        resolve(undefined);
        break;
    }
  });
}

// escapes chars as needed
function addslashes( str ) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}