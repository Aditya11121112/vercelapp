import jwt from "jsonwebtoken";

const validate_token = async (req, res, next) => {
  const token = await req.cookies.access_token;
  const tokenverify = token ? req.cookies.access_token : "";

  if (token == "") {
    console.log("token", tokenverify);
    return res.json({ message: "token not avaialbale", data: "" });
  }

  jwt.verify(token, "adi", (err, decode) => {
    if (err) {
      // Handle error scenario when token is invalid or expired
      return res.json({
        message: "Error in Authorized token",
        data: null, // `datadecode` was undefined in your example
        error: err.message,
      });
    }

    // If the token is valid and decoded
    console.log("Data decoded:", decode); // Logging the decoded data
    return res.json({
      message: "Authorized User",
      data: decode, // Use `decode` directly as it holds the decoded information
    });
  });
};

export { validate_token };
