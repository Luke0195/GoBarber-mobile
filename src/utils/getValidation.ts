import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidatioErrors(error: ValidationError): Errors {
  const validationError: Errors = {};
  error.inner.forEach((err) => {
    validationError[err.path] = err.message;
  });

  return validationError;
}
