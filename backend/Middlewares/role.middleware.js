const AppError = require("../Utils/appError");

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  if (!roles.includes(req.user.role)) {
    return next(new AppError("Forbidden", 403));
  }

  next();
};

module.exports = authorizeRoles;
