const checkAuth = (session, res) => {
  try {
    if (!session)
      return res
        .status(401)
        .json(result("error", "You are not authenticated!"));
  } catch (error) {
    return res.status(400).json(result("error", { error }));
  }
};

const result = (status, output) => {
  return {
    status,
    output,
  };
};

const isAdminAuthenticated = (req, res, next) => {
  checkAuth(req.session.isAdminAuthenticated, res);
  next();
};

const isOwnerAuthenticated = (req, res, next) => {
  checkAuth(req.session.isOwnerAuthenticated, res);
  next();
};

const isCustomerAuthenticated = (req, res, next) => {
  checkAuth(req.session.isCustomerAuthenticated, res);
  next();
};

module.exports = {
  isAdminAuthenticated: isAdminAuthenticated,
  isOwnerAuthenticated: isOwnerAuthenticated,
  isCustomerAuthenticated: isCustomerAuthenticated,
};
