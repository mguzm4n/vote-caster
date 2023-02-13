function strToCamelCase(str: string, firstCapital: boolean = false): string {
  return str.replace(
      /^([A-Z])|[\s-_](\w)/g,
      function (match, p1, p2, offset) {
          if (firstCapital === true && offset === 0) return p1
          if (p2) return p2.toUpperCase()
          return p1.toLowerCase()
      },
  )
}

function arrayObjectsToCamelCase(array: Array<any>) {
  const newArray = [];
  for (let i=0; i < array.length; i++) {
      const item = array[i];
      newArray.push(checkObjectValueTypes(item));
  }
  return newArray;
}

function checkObjectValueTypes(value: any): any {
  if (Array.isArray(value)) {
      return arrayObjectsToCamelCase(value);
  } else if (typeof value === 'object' && value !== null) {
      return objectToCamelCase(value);
  } else {
      return value;
  }
}

export function objectToCamelCase<T>(object: any, accumulatorObject: any = {}) {
  for (const [key, value] of Object.entries(object)) {
      const camelCaseKey = strToCamelCase(key);
      accumulatorObject[camelCaseKey] = checkObjectValueTypes(value);
  }
  return accumulatorObject as T;
}
