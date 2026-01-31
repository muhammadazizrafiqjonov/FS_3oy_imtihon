import { BadrequestError } from "../utils/error.js";
import validations from "../validations/validations.js";

class userMiddleware {
  register = (req, res, next) => {
    try {
      const { error } = validations.registerScheme.validate(req.body);

      if (error) {
        throw new BadrequestError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  login = (req, res, next) => {
    try {
      const { error } = validations.loginScheme.validate(req.body);

      if (error) {
        throw new BadrequestError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  branch = (req, res, next) => {
    try {
      const { error } = validations.branchScheme.validate(req.body);

      if (error) {
        throw new BadrequestError(400, error.details[0].message);
      }
      next(error);
    } catch (error) {
      next(error);
    }
  };
}

export default new userMiddleware();
