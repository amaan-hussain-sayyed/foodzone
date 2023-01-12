
let express = require("express");

let { register, login, changePassword, resetpassword, forgetpassword, updatedMe, aboutMe } = require("./controller/userController");
let { auth } = require("./middelwayyer/auth")
let route = express();

route.use(express.json());

//user api .....
route.post("/api/v1/register", register);
route.get("/api/v1/login", login);
route.put("/api/v1/password/change", auth("user"), changePassword);
route.get("/api/v1/password/forget", forgetpassword);
route.put("/api/v1/password/reset", resetpassword);
route.get("/api/v1/aboutme", auth("user"), aboutMe);
route.put("/api/v1/updatedme", auth("user"), aboutMe)
module.exports = { route };