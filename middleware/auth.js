const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  //console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  //console.log(authHeader);

  if (!authHeader) {
    return res.status(401).send("Please Login first to access this endpoint!");
  }

  const token = authHeader.split(" ")[1];
  //console.log("token", token);
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    //console.log(decodedToken);
    next();
  } catch (err) {
    res.status(401).send("Unauthorized User");
  }
};

module.exports = auth;
