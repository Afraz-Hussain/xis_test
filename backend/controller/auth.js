import userModel from "../model/UserModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

 

export const registeruser=async (req,res)=>{
  try{
const{username,email,password}=req.body

if(!username||!email||!password){
  return res.status(400).json({message:"username||email||password is missing..."})
}
const hashpass=await bcrypt.hash(password,10)
const newUser = new userModel({
  username,
  email,
  password: hashpass,
});

const savedUser = await newUser.save();

return res.status(201).json({
  message: "User registered successfully",
  user: {
    _id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
  },
});
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:"Internal Server Error",err})
  }
}

export const loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    const userObj = user.toObject();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...others } = userObj;
    res.cookie("access_token", token, { 
      httpOnly: true,
      sameSite: 'lax',  
      secure: false,   
      path: '/',
      maxAge: 3600000  
    });

    res.status(200).json({
      message: "Login successful",
      user: others,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};