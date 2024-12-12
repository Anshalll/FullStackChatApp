import express from 'express'
import { UpdateProfile  , SearchData , FollowUnfollowuser , ListProfile , UpdateBg , UpdateDp , Deleteimg , GetStatsData, updateFollowers  , Uploadpost , PostMessage} from '../controllers/App.js'
import { ValidateUser } from '../middleware/ValidateUserMiddleware.js'



export const AppRouter = express.Router()

AppRouter.patch('/updateprofile', ValidateUser,  UpdateProfile)
AppRouter.post('/searchdata' , ValidateUser , SearchData )
AppRouter.post('/listprofile' , ValidateUser , ListProfile)
AppRouter.put('/followunfollowuser' , ValidateUser , FollowUnfollowuser)
AppRouter.patch('/updatebg' , ValidateUser , UpdateBg)
AppRouter.patch('/updatedp' , ValidateUser , UpdateDp)
AppRouter.patch('/deleteimg' , ValidateUser , Deleteimg)
AppRouter.post('/userstatsdata' , ValidateUser, GetStatsData)
AppRouter.patch('/updatefollowers' , ValidateUser , updateFollowers)
AppRouter.post('/uploadpost' , ValidateUser , Uploadpost)
AppRouter.route('/usermessage' ).post(ValidateUser  , PostMessage)