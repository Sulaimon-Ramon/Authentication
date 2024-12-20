import  { Router } from 'express'
import { deleteUser, getOneUser, login, SearchUser, signUp, updateUser, viewUsers } from '../Controller/authController'
import {upload} from "../Utils/multer"

const route = Router()

route.route("/create-user").post(signUp)
route.route("/login-user").post(login)
route.route("/search-user").get(SearchUser)
route.route("/view-users").get(viewUsers)
route.route("/:userId/get-one-user").get(getOneUser)
route.route("/:userId/update-user").patch(updateUser)
route.route("/:userId/delete-user").delete(deleteUser)

export default route;