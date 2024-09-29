import { useGetuserMutation } from "../redux/Apis/Apis";
import { useEffect, useState } from "react";

const useFetchUser = (user) => {
    const [Getauser] = useGetuserMutation();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const resp = await Getauser({ method: "POST", path: "/api/getauser", data: user }).unwrap();
                const main = resp.data.data;
                if (main) {
                    setUserData(main);
                }
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchUser();
        }
    }, [Getauser, user]);

    return { userData, isLoading, error };
};

export default useFetchUser;
