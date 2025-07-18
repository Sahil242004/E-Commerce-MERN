import jwt from "jsonwebtoken";

// This middleware function checks if the user is authenticated by verifying the JWT token.
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token)
    return res.json({ success: true, message: "Not authorized login again" });

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
