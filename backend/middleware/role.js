function coachOnly(req, res, next) {
  const role = req.headers["role"];

  if (role !== "coach") {
    return res.status(403).json({
      message: "Access denied. Coach role required."
    });
  }

  next();
}

module.exports = { coachOnly };
