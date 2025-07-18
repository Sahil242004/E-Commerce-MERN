import jwt from "jsonwebtoken";

// This middleware function checks if the admin is authenticated by verifying the JWT token.
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized login as admin",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.id !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not authorized, login again",
      });
    }
    next();
  } catch (error) {
    console.log(err);
    res.json({ success: false, message: "some error occured at server" });
  }
};

export default adminAuth;
