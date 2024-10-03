

export default async function Follow_unfollow(Following_searched , loggeduser , searcheduser , Followorunfollow) {

        let data = {loggeduser , searcheduser}

        if (!Following_searched) {
            const  Follow_user = await Followorunfollow({ data: data , path: "/api/followuser" , method: "POST"   })
            
            if (Follow_user.data?.following && Follow_user.data?.total_searched_user_followers) {
              
                return {following: Follow_user.data?.following , total_followers:  Follow_user.data?.total_searched_user_followers}
            }
        }
        else{
            
            const Unfollow_user =  await Followorunfollow({ data: data , path: "/api/unfollowuser" , method: "POST"   })
            if (Unfollow_user) {

               

                return {unfollowing: Unfollow_user.data.unfollowing , total_followers : Unfollow_user.data.total_searched_user_followers}
            }
      
        }
}
