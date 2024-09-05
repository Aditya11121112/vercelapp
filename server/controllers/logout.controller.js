const logout = async (req, res) => {
  await res.cookie("access_token", "");
  return res.json({
    message: "logout succesfully and delete the coookie",
    data: "",
  });
};

export { logout };
