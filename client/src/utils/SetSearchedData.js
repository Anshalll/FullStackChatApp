const Fetchuser = async (Searchprofile, searched_profile, setNotfounduser , loggeduser) => {

    try {
        let data = { user: searched_profile , loggeduser };
        const user = await Searchprofile({ path: '/api/getauser', data: data, method: "POST" });
        if (user.error?.error) {


            throw new Error(user.error.error)

        }
        else {
            setNotfounduser(false)
            return user;
        }

    } catch (error) {
        console.error(error.message)
        setNotfounduser(true)
        return null
    }



};


export const SearchedData = async (Searchprofile, searched_profile, Setuserdata, setNotfounduser , loggeduser , setFollowing_searched) => {
    const searched_data = await Fetchuser(Searchprofile, searched_profile, setNotfounduser , loggeduser , setFollowing_searched)
    try {
        if (searched_data) {
            if (searched_data?.data.isFollowing) {
                setFollowing_searched(true)
            }
            else{
                setFollowing_searched(false)
            }
            const { data } = searched_data?.data
            const { backgroundimage, dpimage, followers, following, posts, interests, groups, bio } = data

            const { username, name } = data.belongsto

            Setuserdata(username, name, interests, bio, backgroundimage, dpimage, followers, following, groups, posts)
        }

    } catch (error) {
        console.log("An error occured!")
    }
}