import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../endpoints"
import Mark from "mark.js"

const SearchComponent = ({wishlist, setProjId, setSnackMsg}) => {
  // const [showResults, setShowResults] = useState(false);

  // const handleSearchClick = () => {
  //   setShowResults(true);
  // };

  const keyString = 'ProjectID,ProjectTitle,City,Province,Professor.FirstName,Professor.LastName,Professor.UniversityName'
  // const indexLookup = {};
  const stringArray = keyString.split(',');

  const [searchStr, setSearchStr] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(true)

  
  
  document.getElementById("search-box")?.focus()

  useEffect(() => {
    if (searchStr.length<3 || results.length === 0) return;
    const markInstance = new Mark(document.querySelectorAll(".search-highlight"))
    
    markInstance.unmark({
      done: () => {
        markInstance.mark(searchStr.split(" "))
      }
    })
  }, [searchStr, results, detailsOpen])

  useEffect(() => {
    if (searchStr === "")
      setResults([])
    if (searchStr!=="" && searchStr.length >= 3){
      setLoading(true)
    axios.get(`${BASE_URL}/search-project/${searchStr}`)
    .then((res) => {
      setLoading(false)
      // if (!loading)
      setResults(res.data.map((str) => {
        let i = 0;
        let newObj = str.replaceAll('"', "").split(",").reduce((prev, curr) => {
          prev[stringArray[i]] = curr
          i ++;
          return prev
        }, {})
        return newObj
      }))
      // console.log(res.data)
      
    }) 
    .catch((err) => {
      console.log("No results found")
      setLoading(false)
      setResults([])
    })
  }
  }, [searchStr])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-700 " >
      {/* <nav className="bg-blue-800 p-4 w-full">
        <div className="text-white text-center">
          <h1 className="text-2xl font-semibold">Project Smart Search</h1>
        </div>
      </nav> */}
      <div className="flex flex-col items-center justify-center h-full px-2 w-full">
        
          <div className="relative mx-auto text-gray-600 min-w-full px-5 mt-5">
          <input value={searchStr} onChange={(e) => {
            setSearchStr(e.target.value)
          }} 
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none min-w-full" 
          type="search" name="search" id="search-box"
          placeholder="Enter keywords (seperated by space), Project description, professor, location, project ID, etc."/>
          {/* <button className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.293 20.293l-5.987-5.986C16.168 13.2 17 11.654 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.654 0 3.2-.832 4.307-2.206l5.986 5.986 1.414-1.414zM10 16c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/></svg>
          </button> */}
        </div>
        <div className="w-full py-2 flex justify-center items-center">
          Found matching {results.length ?? 0} of 2968 Projects
        </div>
        
          <div className="search-highlight flex flex-wrap justify-center mt-6 w-full" id="search-results">
            {!loading && results.length > 0 && results.map((result, index) => (
              <div key={index} className="flex items-center bg-gray-500 p-4 m-2 rounded-lg shadow-md w-full max-w-screen-xl">
              <div className="flex-grow">
                {/* {result} */}
                <h3 className="text-xl text-white font-semibold mb-2">{result.ProjectTitle}</h3>
                <p className="text-gray-100 mb-2">{`Location: ${result.City}, ${result.Province}`}</p>
                <p className="text-gray-100 mb-2">{`University: ${result["Professor.UniversityName"]}`}</p>
                <p className="text-gray-100 mb-2">{`Professor: ${result["Professor.FirstName"]} ${result["Professor.LastName"]}`}</p>
              </div>
              <div className="flex space-x-4">
                <button className={`${wishlist.includes(result["ProjectID"])?"bg-blue-300":"bg-blue-500"} text-white px-3 py-1 rounded hover:bg-blue-600`}
                disabled={wishlist.includes(result["ProjectID"])}
                style={{
                  pointerEvents: wishlist.includes(result["ProjectID"])?'none':"auto"
                }}
                onClick={async () => {
                  await chrome.storage.sync.set({"mitexlWishlist": [...wishlist, result["ProjectID"]]})
                  setSnackMsg(`Added Project ${result["ProjectID"]}`)
                }}
                >
                  {wishlist.includes(result["ProjectID"])?"Added": "Add"}
                </button>
                <button
                onClick={() => {
                  setTimeout(() => {
                    setDetailsOpen(true)
                    setTimeout(() => {
                      setDetailsOpen(false)
                    }, 1000)
                  }, 1000)
                  setProjId(result.ProjectID)
                  
                }} 
                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-900">
                  Details
                </button>
              </div>
            </div>
            ))}
            {
              <div className='min-w-full h-[50vh] justify-center items-center flex'>
              {
                loading && searchStr !== "" && <CircularProgress/>
              }
              {
                results.length === 0 && searchStr.length > 0 && !loading && (
                    <span>No results for "{searchStr}"</span>
                )
              }
              </div>
            }
          </div>
      </div>
    </div>
  );
};

export default SearchComponent;
