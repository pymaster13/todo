export const handleErrors = (errorsObject) => {
  if (typeof errorsObject === "string") {
    return errorsObject;
  }

  if (typeof errorsObject === "object") {
    let errors = [];
    Object.keys(errorsObject).map((k) => errors.push(errorsObject[k]));
    return errors.join(" ");
  } else {
    return JSON.stringify(errorsObject);
  }
};
