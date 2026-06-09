const AppError = require("../Utils/appError");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdateProfileBody,
  validateChangePasswordBody,
  validateKycBody,
} = require("../Utils/validators");

const buildValidator = (validator) => (req, res, next) => {
  const errors = validator(req.body);
  if (errors.length) {
    return next(new AppError(errors.join(", "), 400));
  }
  next();
};

module.exports = {
  validateRegister: buildValidator(validateRegisterBody),
  validateLogin: buildValidator(validateLoginBody),
  validateUpdateProfile: buildValidator(validateUpdateProfileBody),
  validateChangePassword: buildValidator(validateChangePasswordBody),
  validateKycRequest: buildValidator(validateKycBody),
};
