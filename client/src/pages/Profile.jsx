import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import EditState from '../components/EditState'
import { useFormsMutation } from '../redux/Apis/Apis'
import Updateuserbg from '../components/Updateuserbg'
import Updateuserdp from '../components/Updateuserdp'

export default function Profile() {

    const [UpdateProfile, { isLoading: isUpdating }] = useFormsMutation()
    const [Interests, setInterests] = useState([]);
    const [Admin, setAdmin] = useState(false)
    const { userdata, loading } = useSelector((state) => state.userdataslice)
    const [Editmode, setEditMode] = useState(false)
    const [InterestsError, setInterestsError] = useState(null);

    const [ImgError, setImgError] = useState(null)

    const [Name, setName] = useState("");
    const [Username, setUsername] = useState("");
    const [Bio, setBio] = useState("");
    const [TotalFollowers, setTotalFollowers] = useState(0)
    const [TotalFollowing, setTotalFollowing] = useState(0)
    const [TotalGroups, setTotalGroups] = useState(0)
    const [TotalPosts, setTotalposts] = useState(0)
    const [DP, setDP] = useState("https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png")
    const [BG, setBG] = useState("https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png")

    const location = useLocation()
    const navigate = useNavigate()

    const query_instance = new URLSearchParams(location.search)
    const main_profile = query_instance.get("user")

    useEffect(() => {
        if (!loading) {
            const { data } = userdata


            if (data) {

                setName(data[0].name)
                setUsername(data[0].username)
                setBio(data[1]?.bio || "Add a bio")
                setInterests(data[1]?.interests || [])

                setTotalFollowers(data[1]?.followers.length)
                setTotalFollowing(data[1]?.following.length)
                setTotalGroups(data[1]?.Groups.length)
                setTotalposts(data[1]?.posts.length)

                if (!main_profile) {
                    navigate(`/profile?user=${data[0].username}`)
                } else if (main_profile === data[0].username) {
                    setAdmin(true)
                }
            }
        }
    }, [userdata, loading, main_profile, navigate])

    useEffect(() => {
        if (InterestsError || ImgError) {
            const timer = setTimeout(() => {
                setInterestsError(null);
                setImgError(null)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [InterestsError , setInterestsError , ImgError , setImgError]);

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


        await UpdateProfile({ path: "/api/updatextras", data: main_data, method: "POST" })
        setEditMode(false)
        navigate(`/profile?user=${Username}`)

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
            {loading || isUpdating ? "Loading..." : (
                <form onSubmit={HandleProfileUpdate} className='w-full text-[13px] gap-[20px] items-center flex p-[20px] flex-col h-[100vh] overflow-y-auto'>
                    {Editmode ? <Updateuserbg setBG={setBG} BG={BG} setImgError={setImgError} /> : <div className='w-[1500px] flex h-[300px] bg-gray-300 rounded-lg'>
                        <img src={BG} alt="" className='w-full h-full object-cover object-center rounded-lg' />

                    </div>}
                    {ImgError && <p className='text-white w-[1500px] bg-[crimson] p-[7px] rounded-lg'>{ImgError}</p>}
                    <div className='flex gap-[40px] w-[1500px] items-center h-[300px]'>
                        {Editmode ? <Updateuserdp setDP={setDP} DP={DP} setImgError={setImgError} /> : <div className='w-[250px] flex h-[250px] bg-gray-300 rounded-full'>
                            <img src={DP} className='w-full h-full object-ceover object-center rounded-full' alt="" />
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
                                <div className='flex gap-[30px] text-black'>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Groups <span className='font-normal'>{TotalGroups}</span>
                                    </p>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Posts: <span className='font-normal'>{TotalPosts}</span>
                                    </p>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Followers <span className='font-normal'>{TotalFollowers}</span>
                                    </p>
                                    <p className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                                        Following: <span className='font-normal'>{TotalFollowing}</span>
                                    </p>
                                </div>
                                {Admin ?
                                    (Editmode ? <button type='submit' className='bg-green-500 text-white p-[7px] rounded-lg'>
                                        Save
                                    </button> : <button onClick={HandleEdit} className='bg-[crimson] text-white p-[7px] rounded-lg'>
                                        Edit
                                    </button>)
                                    : (
                                        <button className='bg-green-500 text-white p-[7px] rounded-lg'>
                                            Follow
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}
