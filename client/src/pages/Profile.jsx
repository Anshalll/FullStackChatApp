import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import EditState from '../components/EditState'
import { useImageuploadMutation, useFormsMutation } from '../redux/Apis/Apis'
import Updateuserbg from '../components/Updateuserbg'
import Updateuserdp from '../components/Updateuserdp'
import LoadingSpinner from '../assets//spinn_load.gif'
import {Profilelayout} from '../layout/AppLayout'
import { useSearchprofileMutation } from '../redux/Apis/Apis'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Followprofile from '../components/Followprofile'
import { Helmet } from 'react-helmet-async'
import NotFound from '../components/NotFound'
import { SearchedData } from '../utils/SetSearchedData'
import Profileoptions from '../components/Profileoptions'
import Userdatalist from '../components/Userdatalist'

function Profile() {


    const [Pagetitle, setPagetitle] = useState(null)
    const [Notfounduser, setNotfounduser] = useState(false)
    const [Following_searched, setFollowing_searched] = useState(false)
    const [UpdateProfile, { isLoading: isUpdating }] = useFormsMutation()
    const [UpdateImage, { isLoading: isImgLoading }] = useImageuploadMutation()
    const [SearchProfile, { isSuccess: isSearchedProfile, isError: isSearchedProfileerror, error: SearchError }] = useSearchprofileMutation()




    const [Interests, setInterests] = useState([]);
    const [Admin, setAdmin] = useState(null)
    const { userdata, loading } = useSelector((state) => state.userdataslice)
    const [Editmode, setEditMode] = useState(false)
    const [InterestsError, setInterestsError] = useState(null);

    const [Errors, setErrors] = useState(null)

    const [Name, setName] = useState("");
    const [Username, setUsername] = useState("");
    const [Bio, setBio] = useState("");
    const [TotalFollowers, setTotalFollowers] = useState(0)
    const [TotalFollowing, setTotalFollowing] = useState(0)
    const [TotalGroups, setTotalGroups] = useState(0)
    const [TotalPosts, setTotalposts] = useState(0)

    const [DP, setDP] = useState(null)
    const [BG, setBG] = useState(null)
    const [DP_preview, setDP_preview] = useState(null)
    const [BG_preview, setBG_preview] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()

    const query_instance = new URLSearchParams(location.search)
    const searched_profile = query_instance.get("user")


    useEffect(() => {

        if (!loading) {
            const ubasics = userdata?.data[0];
            const uextras = userdata?.data[1];

            function Setuserdata(username, name, interests, bio, backgroundimage, dpimage, followers, following, groups, posts) {
                setUsername(username);
                setName(name);
                setInterests(interests);
                setBio(bio);
                setBG_preview(backgroundimage);
                setDP_preview(dpimage);
                setTotalFollowers(followers.length);
                setTotalFollowing(following.length);
                setTotalGroups(groups.length);
                setTotalposts(posts.length);
                setPagetitle(`Profile @${username}`)

            }




            if (searched_profile && ubasics && uextras) {
                const { username, name } = ubasics;
                const { interests, bio, backgroundimage, dpimage, followers, following, groups, posts } = uextras;

                if (username === searched_profile) {
                    setAdmin(true);
                    Setuserdata(username, name, interests, bio, backgroundimage, dpimage, followers, following, groups, posts);

                } else {

                    setAdmin(false);
                    SearchedData(SearchProfile, searched_profile, Setuserdata, setNotfounduser, username, setFollowing_searched)



                }
            }


            if (!searched_profile) {
                navigate(`/profile?user=${ubasics.username}`);
            }
        }
    }, [searched_profile, userdata, loading, navigate, SearchProfile]);




    useEffect(() => {
        if (InterestsError || Errors) {
            const timer = setTimeout(() => {
                setInterestsError(null);
                setErrors(null)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [InterestsError, setInterestsError, Errors, setErrors]);

    const HandleEdit = (e) => {
        e.preventDefault()
        if (Admin) {
            setEditMode(true)
        }
    }

    const HandleInput = (e, key) => {
        switch (key) {
            case "username":
                setUsername(e.target.value);
                break;
            case "bio":
                setBio(e.target.value);
                break;
            default:
                setName(e.target.value);
                break;
        }
    };

    const HandleProfileUpdate = async (e) => {


        e.preventDefault()

        const Formdata = new FormData(e.target)
        const { data } = userdata;
        const id = data[0]._id

        Formdata.append("uid", id);
        Formdata.append('interests', Interests)


        const main_data = Object.fromEntries(Formdata)


        const profile_update = await UpdateProfile({ path: "/api/updatextras", data: main_data, method: "POST" })

        if (profile_update.error?.error) {
            setErrors(profile_update.error?.error)

        }
        if (DP) {

            if (isImgLoading) {
                setDP_preview(LoadingSpinner)
            }

            const formdata = new FormData()
            formdata.append("dp", DP)
            const { data: imgdata, error } = await UpdateImage({ data: formdata, path: "/api/profiledp", method: "POST" })


            if (error) {

                setErrors(error.error)
            }
            else {
                setDP_preview(imgdata.filepath)
                setDP(null)

            }

        }
        if (BG) {

            if (isImgLoading) {
                setBG_preview(LoadingSpinner)
            }

            const formdata = new FormData()
            formdata.append("bg", BG)
            const { data: imgdata, error } = await UpdateImage({ data: formdata, path: "/api/profilebg", method: "POST" })


            if (error) {

                setErrors(error.error)


            }
            else {
                setBG_preview(imgdata.filepath)
                setBG(null)
            }

        }
        if (!Errors) {
            setEditMode(false)

            navigate(`/profile?user=${Username}`)
            window.location.reload()
        }



    }
    const HandleInterests = (e) => {
        if (e.key === ',') {
            e.preventDefault();
            const value = e.target.value.trim();
            if (Interests.length < 5) {
                if (value && !Interests.includes(value)) {
                    setInterests((prevInterests) => [...prevInterests, value]);
                    e.target.value = '';
                }
            } else {
                setInterestsError("Max interests added");
            }
        }
    };

    return (
        <>
            {Notfounduser ? <NotFound /> : (loading || isUpdating || isImgLoading ? "Loading..." : (
                <form onSubmit={HandleProfileUpdate} className='w-full text-[13px] gap-[20px] items-center flex p-[20px] flex-col h-[calc(100vh-80px)] overflow-y-auto'>
                    {Editmode ? <Updateuserbg setBG={setBG} BG_preview={BG_preview} setErrors={setErrors} setBG_preview={setBG_preview} /> : <div className='w-[1500px] flex h-[300px] bg-gray-300 rounded-lg'>
                        <img src={BG_preview} alt="" className='w-full h-full object-cover object-center rounded-lg' />

                    </div>}
                    {Errors && <p className='text-white w-[1500px] bg-[crimson] p-[7px] rounded-lg'>{Errors}</p>}
                    <div className='flex gap-[40px] w-[1500px] items-center h-[300px]'>
                        {Editmode ? <Updateuserdp setDP={setDP} setErrors={setErrors} setDP_preview={setDP_preview} DP_preview={DP_preview} /> : <div className='w-[250px] flex h-[250px] bg-gray-300 rounded-full'>
                            <img src={DP_preview} className='object-cover object-center rounded-full' alt="" />
                        </div>}
                        <div className='w-[calc(100%-250px)] flex justify-between h-[200px]'>
                            {Editmode ? (

                                <EditState HandleInput={HandleInput} Name={Name} Username={Username} Bio={Bio} Interests={Interests} HandleInterests={HandleInterests} InterestsError={InterestsError} setInterests={setInterests} setInterestsError={setInterestsError} />

                            ) : (
                                <div className='flex flex-col gap-[20px]  w-[400px]  p-[20px] rounded-lg min-h-[100px] max-h-[1000px]'>
                                    <p>{Name}</p>
                                    <p>{Username}</p>
                                    <p>{Bio || "Add bio"}</p>
                                    {Interests?.length > 0 && (
                                        <div className='flex flex-wrap w-full gap-[20px] items-center'>
                                            {Interests?.map((value, index) => (

                                                value !== "" && <p key={index} className='bg-[crimson] px-[20px] py-[7px] text-white rounded-lg'>
                                                    {value}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='flex flex-col gap-[20px]  p-[20px] rounded-lg'>
                                
                                <Userdatalist TotalGroups={TotalGroups} TotalFollowers={TotalFollowers} TotalFollowing={TotalFollowing} TotalPosts={TotalPosts} username={Username}/>

                                {Admin ?
                                    (Editmode ? <button type='submit' className='bg-green-500 text-white p-[7px] rounded-lg'>
                                        Save
                                    </button> : <button onClick={HandleEdit} className='bg-[crimson] text-white p-[7px] rounded-lg'>
                                        Edit
                                    </button>)
                                    : (
                                        <>

                                            <Followprofile Following_searched={Following_searched} searcheduser={searched_profile} loggeduser={userdata?.data[0].username} setTotalFollowers={setTotalFollowers} setFollowing_searched={setFollowing_searched} />
                                            <div className='flex items-center w-full gap-[20px]'>

                                                <button onClick={(e) => e.preventDefault()} className='rounded-full justify-center flex gap-[10px] items-center p-[7px] border-2 border-black font-bold w-[95%]'>Message <EmailOutlinedIcon /> </button>
                                                <Profileoptions />
                                            </div>
                                        </>

                                    )}
                            </div>
                        </div>
                    </div>
                </form>
            ))}
        </>
    )
}


export default Profilelayout()(Profile)