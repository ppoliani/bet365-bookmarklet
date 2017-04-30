export const entries = function *(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
};

export const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));

export const periodicCheck = (resolve, className, childrenIndex) => {
  try{
    const elem = childrenIndex
      ? document.querySelector(className).children[childrenIndex]
      : document.querySelector(className).children;
    if(elem) return resolve(elem);
    requestAnimationFrame(partial(periodicCheck, resolve, className, childrenIndex))
  }
  catch(err) {
    requestAnimationFrame(partial(periodicCheck, resolve, className, childrenIndex))
  }
};

export const checkExistanceOfElement = (className, childrenIndex) => {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(partial(periodicCheck, resolve, className, childrenIndex))
  });
};
