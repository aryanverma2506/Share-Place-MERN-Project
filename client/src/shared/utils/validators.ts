export enum ValidatorType {
  REQUIRE = "REQUIRE",
  NUMBER = "NUMBER",
  MIN_LENGTH = "MIN_LENGTH",
  MAX_LENGTH = "MAX_lENGTH",
  MIN = "MIN",
  MAX = "MAX",
  EMAIL = "EMAIL",
  FILE = "FILE",
}

export const VALIDATOR_REQUIRE = () => ({
  type: ValidatorType.REQUIRE,
  value: "",
});
export const VALIDATOR_NUMBER = () => ({
  type: ValidatorType.NUMBER,
  value: "",
});
export const VALIDATOR_MIN_LENGTH = (value: string | number) => ({
  type: ValidatorType.MIN_LENGTH,
  value: value.toString(),
});
export const VALIDATOR_MAX_LENGTH = (value: string | number) => ({
  type: ValidatorType.MAX_LENGTH,
  value: value.toString(),
});
export const VALIDATOR_MIN = (value: string | number) => ({
  type: ValidatorType.MIN,
  value: value.toString(),
});
export const VALIDATOR_MAX = (value: string | number) => ({
  type: ValidatorType.MAX,
  value: value.toString(),
});
export const VALIDATOR_EMAIL = () => ({ type: ValidatorType.EMAIL, value: "" });
export const VALIDATOR_FILE = () => ({ type: ValidatorType.FILE, value: "" });

export default function validate(
  value: string,
  validators?: { type: ValidatorType; value: string | number }[]
): boolean {
  let isValid = true;
  if (validators) {
    for (const validator of validators) {
      if (validator.type === ValidatorType.REQUIRE) {
        isValid = isValid && value.trim().length > 0;
      }
      if (validator.type === ValidatorType.NUMBER) {
        isValid = isValid && typeof +value.trim() === "number";
      }
      if (validator.type === ValidatorType.MIN_LENGTH) {
        isValid = isValid && value.trim().length >= +validator.value;
      }
      if (validator.type === ValidatorType.MAX_LENGTH) {
        isValid = isValid && value.trim().length <= +validator.value;
      }
      if (validator.type === ValidatorType.MIN) {
        isValid = isValid && +value >= +validator.value;
      }
      if (validator.type === ValidatorType.MAX) {
        isValid = isValid && +value <= +validator.value;
      }
      if (validator.type === ValidatorType.EMAIL) {
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      }
    }
  }
  return isValid;
}
