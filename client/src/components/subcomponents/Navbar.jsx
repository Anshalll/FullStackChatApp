import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Link } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Searchresults from "../Searchresults";
import { useSearchprofileMutation } from "../../redux/Apis/Apis";
import {debounce} from 'lodash'

export default function Navbar() {
  const [Searching, setSearching] = useState(false);
  const [searchprofile] = useSearchprofileMutation();
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
 

  const Search = async (term) => {
    setSearching(true);
    try {
      const response = await searchprofile({
        path: "/api/searchprofile",
        data: { data: term },
        method: "POST",
      });

      if (response.data?.results) {
        setResults(response.data.results);
      } else if (response.data?.error) {
        setError(response.data.error);
      }
    } catch (err) {
      setError("An error occurred while searching.");
    } finally {
      setSearching(false);
    }
  };

  const debouncedSearch = debounce((term) => {
    if (term) {
      Search(term);
    } else {
      setResults([]); 
    }
  }, 300); 

  const handleChange = (e) => {
    const value = e.target.value;

    debouncedSearch(value);
  };

  return (
    <nav className="w-full px-[30px] flex text-[13px] justify-between items-center h-[80px]">
      <div>
        <h1>Anshal's chatapp</h1>
      </div>
      <div className="w-[40%] rounded-full h-[70%] relative">
        <div className="flex w-full items-center h-full rounded-full border border-black">
          <input
            onChange={handleChange}
            type="text"
            className="w-[95%] px-[20px] h-full rounded-l-full outline-none"
            placeholder="Search something..."
          />
          <SearchOutlinedIcon className="flex items-center justify-center" />
        </div>

        <Searchresults Searching={Searching} results={results} />
      </div>

      <div className="flex font-semibold items-center gap-[20px] justify-center">
        <div className="w-[30px] h-[30px] bg-[crimson] text-white flex items-center justify-center rounded-full">
          <NotificationsNoneOutlinedIcon />
        </div>

        <Link to="/chat" className="flex items-center gap-[10px]">
          <ChatOutlinedIcon className="font-light" />
          (1)
        </Link>

        <Link to="/settings">
          <SettingsOutlinedIcon />
        </Link>
      </div>
    </nav>
  );
}
