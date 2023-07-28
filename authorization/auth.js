const fs = require("fs");
const jwt = require("jsonwebtoken");
const dotenv =require("dotenv")
dotenv.config()

const secretKeyPublic = fs.readFileSync("./public.pem", "utf8");

// const accessTokenPrivate = fs.readFileSync("./notifications.key", "utf8");
// const accessTokenPublic = fs.readFileSync("./notifications_public.key", "utf8");

// const refreshTokenPrivate = fs.readFileSync("./rt_notifications.key", "utf8");
// const refreshTokenPublic = fs.readFileSync(
//   "./rt_notifications_public.key",
//   "utf8"
// );

// const accessTokenOptions = {
//   expiresIn: 150,
//   algorithm: "RS512", // RSASSA [ "RS256", "RS384", "RS512" ]
// };

// const refreshTokenOptions = {
//   expiresIn: 43200,
//   algorithm: "RS512", // RSASSA [ "RS256", "RS384", "RS512" ]
// };

const verifyAccessToken = async (req, res, next) => {
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<,,what')
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(
      req.token,
      secretKeyPublic,
      { algorithm: ["RS512"] },
      (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          req.authData = authData;
          next();
        }
      }
    );
  } else {
    res.sendStatus(403);
  }
};

const verifyExternalAccessToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRET_KEY,(err, authData)=>{
      if(err){
        return res.status(403).json({message: 'Unauthorized'})
      }else{
        next()
      }
    })
  }
}

// const login = async (req, res, next) => {
//   try {
//     let user = {
//       username: "abcd",
//       pass: "a.b.c.d.",
//     };

//     const accessToken = await jwt.sign(
//       user,
//       accessTokenPrivate,
//       accessTokenOptions
//     );
//     const refreshToken = await jwt.sign(
//       user,
//       refreshTokenPrivate,
//       refreshTokenOptions
//     );
//     return res
//       .status(200)
//       .json({ accessToken: accessToken, refreshToken: refreshToken });
//   } catch (err) {
//     return res.status(400).json({ message: "Something Went Wrong" });
//   }
// };

// const getNewAccessToken = async (req, res, next) => {
//   try {
//     let params = req.body;
//     if (params.refreshToken) {
//       jwt.verify(
//         params.refreshToken,
//         refreshTokenPublic,
//         { algorithm: "RS512" },
//         async (err, authData) => {
//           if (err) {
//             return res.status(400).json({ message: "Unauthorized" });
//           } else {
//             let accessToken = await jwt.sign(
//               authData,
//               accessTokenPrivate,
//               accessTokenOptions
//             );
//             return res.status(200).json({ token: accessToken });
//           }
//         }
//       );
//     } else {
//       res.send(401).json({ message: "Unauthorized" });
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "Something went wrong" });
//   }
// };

// const verifyAccessTokens = async (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader.split(" ");
//     let accessToken = "";
//     if (Array.isArray(token) && token[1]) {
//       accessToken = token[1];
//     }
//     if (accessToken) {
//       jwt.verify(
//         accessToken,
//         accessTokenPublic,
//         { algorithm: "RS512" },
//         (err, authData) => {
//           if (err) {
//             return res.status(401).json({ message: "Unauthorized" });
//           } else {
//             next();
//           }
//         }
//       );
//     }
//   } catch (err) {
//     return res.status(400).json({ message: "Something went wrong" });
//   }
// };

module.exports = {
  verifyAccessToken,
  verifyExternalAccessToken
};
