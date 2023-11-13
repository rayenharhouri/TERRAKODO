import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*************************** Sign In ***************************/
export async function SignIn(req, res) {


const { email, password } = req.body;

// Check if email and password is provided
if (!email || !password) {
  return res
    .status(400)
    .json({ success: false, message: "Please provide email and password" });
}

// Check that User exists by email
const user = await User.findOne({ email: email });

try {
  if (user) {
    const verifyPassword = await verifyPwd(password, user);
    // Check that password matches
    if (verifyPassword) {
      //Check if user is verified
      if (user.isVerified) {
        //generate token
        const token = genrateUserToken(user);
          res.status(200).send({
            message: "Login Successfull",
            success: true,
            token: token,
          });
      } else {
        const token = genrateUserToken(User);
        //doSendConfirmationEmail(email, token);
        res.status(403).send({ message: "Please verify your account!" });
      }
    } else {
      res.status(403).send({ message: "Password is incorrect!" });
    }
  } else {
    res
      .status(403)
      .send({ message: "No account with this email was found!" });
  }
} catch (error) {
  return res.status(500).send({ message: error.message });
}


async function verifyPwd(password, user) {
const compare = await bcrypt.compare(password, user.password);
return compare;
}

}


/*************************** Sign Up ***************************/
export async function SignUp(req, res) {
    try {
      var email = req.body.email;
      var exist = await User.findOne({ email: email });
  
      if (exist) {
        return res.status(403).send({ message: "Email already exist!" });
      } else {
        var password = await bcrypt.hash(req.body.password, 10);
        try {
          var user = new User({
            fullName: req.body.fullName,
            email: email,
            password: password,
          });
          user.save().then(async (u) => {
            const token = genrateUserToken(u);
           // await doSendConfirmationEmail(email, token);
            res.status(201).send({
              message: "User Created Successfully",
            });
          });
        } catch (error) {
          res.status(500).send({ message: error.message });
        }
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  function genrateUserToken(User) {
    return jwt.sign({ id : User.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }