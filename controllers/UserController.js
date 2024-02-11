const UserModel = require('../models/USER')
const bcrypt = require("bcrypt"); // pwd encryption
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dnnbr71hp',
    api_key: '998197194627869',
    api_secret: 'rZfFlJ3L-RBJv3ri503OgL4yTi4'
});   //cloudinary config 

class UserController {

    static getalluser = async (req, res) => {
        try {
            res.send('hello user')
        }
        catch (error) {
            console.log(error)
        }
    }

    static userInsert = async (req, res) => {
        try {

            // console.log(req.files.image)
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileapi'
            })

            // console.log(imageUpload)
            // console.log("hello data")
            // console.log(req.body)

            const { n, e, p, cp } = req.body
            const user = await UserModel.findOne({ email: e })
            // console.log(user)

            if (user) {
                res
                    .status(401)
                    .json({ status: "failed", message: "THIS EMAIL IS ALREDAY EXIST" });
            }

            else {
                if (n && e && p && cp) {
                    if (p == cp) {

                        //for securing the password
                        const hashpassword = await bcrypt.hash(p, 10) //secure pwd
                        const result = new UserModel({
                            //model : view
                            name: n,
                            email: e,
                            password: hashpassword,
                            image: {
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url
                            }

                        })

                        const userData = await result.save()

                        res.status(201)
                            .json({ status: "success", message: "REGISTRATION SUCCESSFULLY" });

                        // if (userData) {
                        //     this.sendVerifyMail(n, e, userData._id);
                        //     req.flash('error', 'Please verify your email')
                        //     res.redirect('/')
                        // }
                    }
                    else {
                        res
                            .status(401)
                            .json({ status: "failed", message: "PASSWWORD & CONFIRM PASSWORD DOES NOT MATCH" });
                    }
                }
                else {
                    res
                        .status(401)
                        .json({ status: "failed", message: "ALL FIELDS ARE REQUIRED" });
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController