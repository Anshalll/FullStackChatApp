import { UserExtrasModel } from '../models/AppModel.js'
import { RegisterModel } from '../models/registerModel.js'
import { FileUpload, DeleteImg , Postupload} from '../utils/FileUpload.js'

export const UpdateProfile = async (req, res) => {

    const { name, username, bio, interests, uid } = req.body



    if (typeof name === "string" && typeof username === "string" && typeof bio === "string" && Array.isArray(interests) && uid && interests.length < 5) {

        let check_username = await RegisterModel.findOne({ _id: uid })
        let finduser = await RegisterModel.findOne({ username: username })

        if (check_username.username !== username && finduser) {
            return res.status(400).json({ username_error: "This username is taken!" })
        }

        let user_updated = await RegisterModel.findOneAndUpdate({ _id: uid }, { username: username, name: name }, { new: true })

        await UserExtrasModel.findOneAndUpdate({ belongsto: uid }, { bio: bio, interests: interests })


        return res.status(200).json({ success: true, username: user_updated.username })

    }
    else {


        return res.status(400).json({ error: "An error occured!" })
    }
}

export const ListProfile = async (req, res) => {

    const { value } = req.body

    let find_data = async () => {

        let data = []

        if (value) {



            const finding = await RegisterModel.find({

                username: { $regex: value, $options: 'i' }


            }).limit(10)

            if (finding) {

                for (let a of finding) {

                    const finded_data = await UserExtrasModel.findOne({ belongsto: a._id }).populate("belongsto")

                    data.push(finded_data)

                }
            }



            res.status(200).json({ data: data })

        }
        else {

            res.status(200).json({ data: [] })

        }
    }

    find_data()




}

export const SearchData = async (req, res) => {


    const { username } = req.body

    if (username) {

        let user = await RegisterModel.findOne({ username: username }).select('-password')

        if (user) {

            let udata = await UserExtrasModel.findOne({ belongsto: user._id }).populate('belongsto').populate({
                path: "followers",
                populate: [{ path: 'belongsto' }, {path: "following"} , {path: "followers"}]
            }).populate({
                path: "following",
                populate: [{ path: 'belongsto' }, {path: "following"} , {path: "followers"}]
            })
            

            if (udata) {
                return res.status(200).json({ udata })

            }

        }
        else {
            return res.status(404).json({ error: "404 not found!" })
        }

    }


}

export const FollowUnfollowuser = async (req, res) => {

    const { logged, searched } = req.body

    if (logged && searched) {
       
        const updated_logged = await UserExtrasModel.findOneAndUpdate({ _id: logged._id }, { following: logged.following }, { new: true }).populate('followers').populate('following')



        const updated_searched =  await UserExtrasModel.findOneAndUpdate({ _id: searched._id }, { followers: searched.followers }, { new: true }).populate('belongsto').populate('followers').populate('following')




        res.status(200).json({ success: true , updated_logged , updated_searched})
    }
    else {
        res.status(400).status({ error: "An error occured!" })
    }

}

export const UpdateBg = async (req, res) => {

    try {
        const { bg } = req.files;

        let size = 10 * 1024 * 1024;
        FileUpload(size, bg, res, req, UserExtrasModel, "backgroundimage");
    } catch (error) {
        res
            .status(400)
            .json({ error: error.message || "An error occurred. Please try again." });
    }

}


export const UpdateDp = async (req, res) => {

    try {
        const { dp } = req.files;
        let size = 5 * 1024 * 1024;
        FileUpload(size, dp, res, req, UserExtrasModel, "dpimage");
    } catch (error) {

        res
            .status(400)
            .json({ error: error.message || "An error occurred. Please try again." });
    }

}


export const Deleteimg = async (req, res) => {

    const { type } = req.body
    const { id } = req

    DeleteImg(UserExtrasModel, id, type, res)


}

export const GetStatsData = async (req, res) => {

    const { data } = req.body
    let dataTosend = []

    async function findData(id) {

        let udata = await UserExtrasModel.findOne({ belongsto: id }).populate('belongsto')
       
        return { uid: udata.belongsto._id, username: udata.belongsto.username, name: udata.belongsto.name, dpimage: udata.dpimage, backgroundimage: udata.backgroundimage }

    }

    if (data) {
        for (let a of data) {
            let udata = await findData(a)
            dataTosend.push(udata)
        }



        res.status(200).json({ data: dataTosend })
    }

}


export const updateFollowers = async (req, res) => {

    const {logged, searched} = req.body

    if (logged && searched) {

            const logged_user = await UserExtrasModel.findOneAndUpdate({ _id: logged._id } , {followers: logged.followers} , {new: true})


            const searched_user = await UserExtrasModel.findOneAndUpdate({  _id : searched._id } , {following: searched.following} , {new: true})

            res.status(200).json({  success: true , updated_logged : logged_user , updated_searched : searched_user })

    }   
    else{
        res.status(400).json({ error: "An error occured!" })
    }


}


export const Uploadpost = async (req, res) => {

    const {post} = req.files
    
    const {id} = req

    let Postpath = await Postupload(post)
    
    let post_data = {path: Postpath , desc: req.body.description , hidelike : req.body.hidelike , allowcommenting: req.body.allowcommenting , sharing: req.body.sharing, tags: req.body.tags , audience: req.body.audience}
    
     await UserExtrasModel.findOneAndUpdate({ belongsto: id } , {$push:  {posts: post_data} } , {new: true})

    res.status(200).json({ message: "Post uploaded"  })


}