import { UserExtrasModel } from '../models/AppModel.js'
import { RegisterModel } from '../models/registerModel.js'
import { FileUpload } from '../utils/FileUpload.js'


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

            let udata = await UserExtrasModel.findOne({ belongsto: user._id }).populate('belongsto')

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

        await UserExtrasModel.findOneAndUpdate({ _id: logged._id }, { following: logged.following }, { new: true })



        await UserExtrasModel.findOneAndUpdate({ _id: searched._id }, { followers: searched.followers }, { new: true })




        res.status(200).json({ success: true })
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