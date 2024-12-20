import { authModel } from '../Model/authModel';
import bcrypt from "bcryptjs"

export const signUp = async (req: any, res: any , next : any) => {
    try {
        const { userName, email, password } = req.body;
        const files = req.file?.filename
        console.log(files);
        
        const hashed = await bcrypt.hash(password, 10)
        const user = await authModel.create({ userName, email, password: hashed })

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: userName, email, or password"
            });
        }

        // const userCheck = await authModel.findOne(email);

        // if (userCheck) {
        //     return res.status(400).json(
        //         { success: false, message: "User already exists" }
        //     )
        // }

        return res.status(200).json(
            { success: true, message: "User created successfully", data: user }
        )
    } catch (error) {
        console.log(error);
    }
}


export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }

        const emailCheck = await authModel.findOne({ email });
        console.log(emailCheck);


        if (!emailCheck) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isValid = await bcrypt.compare(password, emailCheck.password)

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        // if (emailCheck.password !== password) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Incorrect Password"
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: "Logged in user successfully",
            user: {
                email: emailCheck.email,
                id: emailCheck._id
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Error logging in user"
        });
    }
};

export const SearchUser = async (req: any, res: any) => {
    try {
        const { userName } = req.query;

        const user = await authModel.find({
            userName: { $regex: userName, $options: "i" }
        })

        return res.status(200).json({
            message: "User found",
            data: user
        })
    } catch (error) {
        console.error("Error Searching for user", error);
        return res.status(500).json({
            success: false,
            message: "Error Searchng user"
        })
    }
}


export const viewUsers = async (req: any, res: any) => {
    try {
        const users = await authModel.find();

        return res.status(200).json(
            { success: true, message: "Users found successfully", data: users }
        )
    } catch (error) {
        return res.status(400).json(
            { success: false, message: "Error viewing users" }
        )
    }
}


export const getOneUser = async (req: any, res: any) => {
    try {
        const { userId } = req.params

        const user = await authModel.findById(userId);

        return res.status(200).json(
            { success: true, message: "User found successfully", data: user }
        )
    } catch (error) {
        return res.status(400).json(
            { success: false, message: "Error finding one user" }
        )
    }
}


export const updateUser = async (req: any, res: any) => {
    try {
        const { userId } = req.params
        const { userName } = req.body;

        const user1 = await authModel.findById(userId)
        console.log("This is user1 : " , user1);
        

        const user = await authModel.findByIdAndUpdate(userId,  { 
            userName,
            new: true
        })

        return res.status(200).json(
            { success: true, message: "Updated user", data: user }
        )
    } catch (error) {
        return res.status(400).json(
            { success: false, message: "Error updating user" }
        )
    }
}


export const deleteUser = async (req : any, res : any) => {
    try {
        const { userId } = req.params;

        const user = await authModel.findByIdAndDelete(userId);

        return res.status(200).json(
            { success: true, message: "Deleted user successfully" }
        )
    } catch (error) {
        return res.status(400).json(
            { success: false, message: "Error deleting user" }
        )
    }
}