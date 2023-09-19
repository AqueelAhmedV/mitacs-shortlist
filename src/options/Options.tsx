import { useState, useEffect, useRef } from 'react'
import './Options.css'
// import { DataTable } from './projects/data-table'
import { Project } from "./projects/columns"
import axios from "axios"
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, ButtonBase, ButtonGroup,  CircularProgress,  IconButton,  Input,  Link,  Popover,  Snackbar,  Stack,  Typography } from '@mui/material';
import { Search } from 'lucide-react';
import {ProjectDetails} from "./projects/md-popover"
import { BookmarkAddOutlined, BookmarkAdded, DeleteOutline, OpenInNew, ReplayOutlined } from '@mui/icons-material';
import SearchComponent from './projects/search-project';
import { BASE_URL } from "../endpoints"
// import { DndTable } from "./projects/dnd-table"
// console.warn = () => {}
// console.log  = () => {}
// console.error = () => {}
// console.info = () => {}

function App() {
  // const [crx, setCrx] = useState('create-chrome-ext')
  const [wishlist, setWishlist] = useState([]);
  const [data, setData] = useState([] as Project[])
  const [userId, setUserId] = useState(null);

  // const baseUrls = [
  //   "https://mxl-backend.vercel.app",
  //   "https://mxl-backend.onrender.com",
  //   "http://localhost:5483"
  // ]

  

  useEffect(() => {
    chrome.storage.sync.get(["mitexlWishlist", "userId"])
      .then(({mitexlWishlist, userId}) => {
        // console.log(mitexlWishlist)
        setUserId(userId)
        setWishlist(mitexlWishlist ?? [])
      })

    chrome.storage.sync.onChanged.addListener(() => {
      chrome.storage.sync.get(["mitexlWishlist"])
      .then(({mitexlWishlist}) => {
        setWishlist(mitexlWishlist)
        setSearchVal("")
        chrome.tabs.query({
          url: mitacsUrlPattern
        }).then((tabs) => {
          tabs.forEach(async (t) => {
            let activeTab = await chrome.tabs.query({
              active: true
            })
            if (activeTab[0].id !== t.id && t.status !== "loading")
              chrome.tabs.reload(t.id)
          })
        })
      })
      .catch(console.log)
    })
    // chrome.storage.onChanged.addListener()
  }, [])

  // const keyString = "ProjectID,ProjectTitle,ProjectTitle2,LanguageUsed,projectDescription,projectDescription2,lang1,ResearchAreaDescription,ResearchAreaDescription2,ProjectDescription,ProjectDescription2,StudentRoles,StudentRoles2,StudentSkills,StudentSkills2,StartDate,isStartDateFlexible,NotesOnStartDate,City,Province,PreferredBackgroundCollection,InternshipQ1,InternshipQ2,InternshipQ3,InternshipQ4,InternshipQ5,InternshipQ6,InternshipQ7,InternshipQ8,InternshipQ9,InternshipQ10,InternshipQ11,InternshipQ12,InternshipQ13,InternshipQ14,InternshipQ15,InternshipQ16,Professor.FirstName,Professor.LastName,Professor.FacultyProvince,Professor.UniversityName,Professor.CampusName,Professor.UniversityID,Professor"

  const keyString = 'ProjectID,ProjectTitle,City,Province,Professor.FirstName,Professor.LastName,Professor.UniversityName'
  // const indexLookup = {};
  const stringArray = keyString.split(',');
  const [csvData, setCsvData] = useState("");
  // for (let i = 0; i < stringArray.length; i++) {
  //     const key = stringArray[i];
  //     indexLookup[key] = i;
  // }

 const [tableData, setTableData] = useState([] as Project[])
//  const [loading, setLoading] = useState(false)
 const [reset, setReset] = useState(new Date())


async function getData(): Promise<any> {
  // setLoading(true)
    // Fetch data from your API here.
    // const { mitexlWishlist } = await chrome.storage.sync.get(["mitexlWishlist"])
    // setWishlist(mitexlWishlist)
    // let response: any[] = []
    // let result = wishlist.map((projectId: string) => 
    try {
      const res = await axios.post(`${BASE_URL}/mitexl-get-projects/`, {
        flag: "v1",
        keys: wishlist,
        userId
      })
      // console.log(res.data)
      // for exporting as csv
      let data = res?.data ?? []
      setCsvData([keyString, ...data].join("\n"))
      let newData = data.map((r, idx) => {
        let i = 0;
        let newObj = r.replaceAll('"', "").split(",").reduce((prev, curr) => {
          prev[stringArray[i]] = curr
          i ++;
          return prev
        }, {})
        newObj["SlNo"] = idx + 1
        return newObj
      })
      if (newData) {
        setTableData(newData)
        setData(newData)
      }
        // setLoading(false)
    } catch (err) {
      console.log(err)
    }
      // )
     
  //   await Promise.all(result)
  //   console.log(response)
  //   return response;
  }

// async function getData(): Promise<Project[]> {
//     // Fetch data from your API here.
//     return [
//       {
//         id: "728ed52f",
//         // amount: 100,
//         title: "pending",
//         body: "m@example.com",
//       },
//       // ...
//     ]
//   }

// const deleteRow = async (id) => {
//   setWishlist((prev) => {
//     prev = prev.filter((r) => !r.includes(id))
//     chrome.storage.sync.set({"mitexlWishlist": prev})
//     return prev
//   })
//   await chrome.runtime.sendMessage("externalWishlistUpdate")
// }

  const [searchVal, setSearchVal] = useState("")
  
  
  useEffect(() => {
    const source = axios.CancelToken.source(); 
    const controller = new AbortController()
    // if (!loading)
    if (navigator.onLine)
    getData()

    return () => {
      controller.abort("Component unmount")
      source.cancel("Component unmounted")
    }
  }, [wishlist, reset, navigator.onLine])

  // function hackAnimation(e) {
  //   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   let iter = 0
  //   const interval = setInterval(() => {
  //     e.target.innerText = e.target.innerText.split("").map((l, i) => {
  //       if (i < iter) {
  //         return e.target.dataset.value[i]
  //       }
  //       return  letters[Math.floor(Math.random()*26)]
  //     }).join("")
  //     if (iter >= e.target.dataset.value.length) clearInterval(interval)
  //     iter += 1/2
  //   }, 50) 
  // }

  // const columns = [
  //   { field: 'id', headerName: 'ID' },
  //   { field: 'title', headerName: 'Title', width: 300 },
  //   { field: 'body', headerName: 'Body', width: 600 }
  // ]
  // const [bookmarks, setBookmarks] = useState([])

  const columns = [
    { field: 'SlNo', headerName: "Sl. No.", filterable: false, hideable: false, width: 60},
    { field: 'ProjectID', headerName: 'Project ID' , width: 100},
    { field: 'ProjectTitle', headerName: 'Project Title', width: 350, hideable: false },
    // { field: 'LanguageUsed', headerName: 'Language Used' },
    { 
      field: 'Location',
      headerName: 'Location', 
      valueGetter: (params) => {
        // console.log(params)
        return `${params.row['City']}, ${params.row['Province']}`}, 
      width: 140
    },
    { field: 'Professor.UniversityName', headerName: 'University Name', width: 200 },
    { field: "QS", headerName: "QS", width: 60, valueGetter: (params) => {
      let rank = params.api.getCellElement(params.id, "QS")?.children[0]?.getAttribute("content")
      if (rank === "-" || !rank)
        rank = 999
        // console.log(Number(rank), params.row["Professor.UniversityName"])
      return Number(rank)
    }, renderCell: (params: any) => {
        const [qsRank, setQsRank] = useState(null);
        useEffect(() => {
          axios.get(`
          ${BASE_URL}/get-university-qs/${params.row['Professor.UniversityName']}`)
          .then((res) => {
            let rank = res.data
            rank = rank.replaceAll("=", "")
            if (rank.split("-").length === 2 && rank.length >= 3) {
              // console.log(rank.split("-"))
              rank = (parseInt(rank.split("-")[0]) + parseInt(rank.split("-")[1]))/2+""
            }
            
            setQsRank(rank)
          })
          .catch((err) => {})
        }, [])
        return (
        <div key={params.id} content={qsRank}>{qsRank}</div>) ?? <CircularProgress key={params.id} content={qsRank}/>
      }
    },
    { 
      field: 'ProfessorName', 
      headerName: 'Professor Name', 
      valueGetter: (params) => `${params.row['Professor.FirstName']} ${params.row['Professor.LastName']}`, 
      width: 150
    },
    { 
      headerName: "Action", 
      sortable: false, 
      filterable: false,
      hideable: false,
      field: "DeleteAction", width: 60, renderCell: (params : any) => {
      // let isBookmarked = bookmarks.includes(params.id)
      return (
        <ButtonGroup>
        <IconButton key={params.id} color='error' onClick={async () => {
          await chrome.storage.sync.set({"mitexlWishlist": wishlist.filter((i) => {
            // console.log(params, wishlist)
            // console.log(params.id)
            return i !== params.id+''
          })})
          setSnackMsg(`Deleted Project ${params.id}`)
        }}>
          <DeleteOutline/>
        </IconButton>
        {/* <IconButton onClick={() => isBookmarked?setBookmarks(bookmarks.filter(b => b!==params.id)):setBookmarks([...bookmarks, params.id])}>
          {(isBookmarked)?<BookmarkAdded/>:<BookmarkAddOutlined/>}
        </IconButton> */}
        </ButtonGroup>
      )
    }},
    { field: "count", headerName: "Stats", width: 40, valueGetter: (params) => {
      let count = params.api.getCellElement(params.id, "count")?.children[0]?.getAttribute("content")
        // console.log(Number(rank), params.row["Professor.UniversityName"])
      return Number(count)
    }, renderCell: (params: any) => {
        const [count, setCount] = useState(0);
        useEffect(() => {
          axios.get(`
          ${BASE_URL}/get-project-count-stats-kootukar/${params.id}`)
          .then((res) => {
            let count = res.data
            setCount(Number(count))
          })
          .catch((err) => {})
        }, [])
        return (
        <div key={params.id} content={count}>{count}</div>) ?? <CircularProgress key={params.id} content={count}/>
      }
    },
    // { field: "pageNo", headerName: "Page No.", width: 70, valueGetter: ({id}) => {
    //   return (id - 31835)/10
    // }}
  ];
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElRow, setAnchorElRow] = useState(null)
  const [file, setFile] = useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    // console.log(uploadedFile)
  };

  const handleFileUpload = () => {
    // Here you can perform any actions with the uploaded file
    // For example, you can read the file content, process it, etc.
    // console.log('Uploaded file:', file);
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          // console.log(evt.target?.result)
          let csvText = evt.target?.result
          // console.log()
          // let rows = csvText?.split("\n")
          // console.log(rows[0].split(","))
          // let idColIdx = rows[0].split(",").indexOf("Project ID")
          // let titleColIdx = rows[0].split(",").indexOf("Project Title")
          // if (idColIdx >= 0 && Array.isArray(rows)) {
            // console.log(rows.slice(1).map((r) => r.split(",")[idColIdx]).filter(v => v!==""))
            // let fromCsv = rows.slice(1).map((r) => r.split(",")[idColIdx]).filter(v => v!=="")
            // console.log(fromCsv)
          
          let importedData = csvText.match(/\b\d{5}\b/g)
          if (importedData.length === 0) {
            alert("No 5-digit Project IDs found")
            return
          } else {
            let newArr = Array.from(new Set([...wishlist, ...importedData]))
            chrome.storage.sync.set({"mitexlWishlist": newArr})
            setSnackMsg(`${newArr.length - wishlist.length} new projects added from CSV file`)
          }
            // } else {
          //   alert('No "Project ID" column present')
          // }
          // console.log(wishlist, idColIdx)
      }
      reader.onerror = function (evt) {
          alert("error reading file");
      }
  }
    closePopover();
  };

  const exportTableAsCsv = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mitexl_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const handleSearch = (e) => {
    setSearchVal(e.target.value)
    if (e.target.value === "" || !e.target.value) setData(tableData as Project[])
    else {
      setData((prev) => {
        return tableData.filter((r) => {
          let str = Object.values(r).join(" ").replaceAll('"', "")
          str += str.toLowerCase()
          return str.includes(e.target.value)
        })
      })
    }
  }

  const gridRef = useRef()
  const [projId, setProjId] = useState("")

  useEffect(() => {
    if (projId && projId !== "")
      setAnchorElRow(mainRef.current)
  }, [projId])

  const openDetails = (projectId) => {
    // console.log(e.currentTarget)
    // setAnchorElRow(gridRef.current)
    setProjId(projectId)
  }

  const handleDetailsClose = () => {
    setAnchorElRow(null);
    setProjId("")
  };

  const [anchorElSearch, setAnchorElSearch] = useState(null);

  const handleSearchOpen = (event) => {
    setAnchorElSearch(event.currentTarget);
  };

  const handleSearchClose = () => {
    setAnchorElSearch(null);
  };
 
  const mainRef = useRef();
  const [updateAnchor, setUpdateAnchor] = useState(null)
  const [version, setVersion] = useState(chrome.runtime.getManifest().version)

  const mitacsUrl = "https://globalink.mitacs.ca/#/student/application/projects" 
  // const mitacsUrlPattern = /^https:\/\/globalink\.mitacs\.ca\/#\/student\/application\/projects$/
  const mitacsUrlPattern =  '*://globalink.mitacs.ca/*' 

  const openMitacsWebsite = () => {
    chrome.tabs.query({
      url: mitacsUrlPattern
    }, (tabs) => {
      let mitacsTab = tabs.find((t) => t.url === mitacsUrl || t.pendingUrl === mitacsUrl)
      if (mitacsTab) {
        chrome.tabs.update(mitacsTab.id, { active: true });
        chrome.windows.update(mitacsTab.windowId, { focused: true})
      } else {
        chrome.tabs.create({ url: mitacsUrl });
      }
    });
  }


  useEffect(() => {
      // console.log("startup")
      axios.get("https://mitexl-extension.vercel.app/version")
      .then(({data}) => {
        let respVersion =  parseInt(data.version.replaceAll(".", ""))
        let currVersion = parseInt(version.replaceAll(".", ""))
        if (currVersion < respVersion) {
          setVersion(data.version)
          setUpdateAnchor(mainRef.current)
        }
      })
      .catch((err) => {
        console.log("Error getting latest version info")
      }) 
  }, [])

  const [snackMsg, setSnackMsg] = useState("Double-click row to view project details")

  return (
    <main ref={mainRef} className='h-screen items-center flex flex-col w-full bg-gray-700  shadow-lg' style={{
      // backgroundColor: "#333333",
      // color: "white",
      }}>
        <Popover 
        open={Boolean(updateAnchor)}
        anchorEl={updateAnchor}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={() => setUpdateAnchor(null)}>
          <div className="bg-slate-700 p-4 rounded-lg">
            <div className="text-xl font-bold mb-2">New Update Available</div>
            <div className="text-gray-100 text-sm mb-4">
              Update to v{version} to enjoy cool new features and bug fixes.
            </div>
            <div className="flex justify-end">
            <Link href="https://mitexl-extension.vercel.app/" target="_blank">Click to Update</Link>
            </div>
            {/* <ul className="list-disc list-inside">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul> */}
          </div>
        </Popover>
        <div className='w-full flex justify-center items-baseline'>
        {/* <h1 id="page-title" className="ml-3" >Your&nbsp;</h1> */}
        {/* <h1 id="page-title" style={{
          color: "#007ad9",
        }} data-value="MITACS " onMouseOver={hackAnimation}>MITACS</h1>
        <h1 id="page-title" className="ml-3" >Wishlist</h1> */}
        {/* <h1 id="page-title" style={{
          color: "#007ad9",
          display: "block"
        }} data-value="MITEXL" onMouseOver={hackAnimation}>MITEXL</h1> */}
        </div>
        {/* <div><h2 id="page-subtitle">&nbsp;Your Mitacs Wishlist</h2></div> */}
        <Box 
        className="shadow-lg"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#222222",
          my: 2,
          py: 2
        }}>
          <ButtonGroup>
            <Button onClick={openPopover} color="success">
              Import Existing...
            </Button>
            <Button onClick={exportTableAsCsv} color="warning">
              Export as CSV
            </Button>
            <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        
        <div style={{ padding: '16px', width: '300px' }}>
          <Typography color={"white"} variant="subtitle1" gutterBottom>
            Import a CSV File
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" gutterBottom>
            Please select a CSV or XLSX file to upload.
          </Typography> */}
          <input
            type="file"
            accept=".csv"
            className='my-2'
            onChange={handleFileChange}
          />
          <Typography variant="body2" color="error" gutterBottom>
            Please make sure there are 5-digit Project IDs for corresponding projects in the selected CSV file.
          </Typography>
          <Button
            onClick={handleFileUpload}
            variant="contained"
            disabled={!file}
            style={{ marginTop: '16px' }}
          >
            Import
          </Button>
        </div>
      </Popover>
          </ButtonGroup>
          <Input  value={searchVal} onChange={handleSearch} placeholder='Search in table' endAdornment={<Search/>}/>
          <IconButton title='Reload table' onClick={() => {
            // if (wishlist.length !== data.length)
            setSearchVal("")
              setReset(new Date())
              if (data.length === 0) getData()
          }}>
            <ReplayOutlined/>
          </IconButton>
          <ButtonGroup>
            <Button endIcon={
              <OpenInNew/>
            } title="Mitacs Official Website" variant="outlined" onClick={openMitacsWebsite}>Mitacs Website</Button>
            <Button
            onClick={handleSearchOpen} 
            title="Mitexl Exclusive: Browse projects with ease" color='secondary'
            variant='contained'
            sx={{
              color: "white",
              background: "linear-gradient(120deg, darkmagenta, crimson, orange)",
              backgroundSize: "200% 100%",
              backgroundPosition: "100% 0",
              transition: "background-position,zoom .5s",
              animation: "animateBg 5s linear infinite",
              '&:hover': {
                backgroundPosition: "0 0",
                animation: "none"
              }
            }}>Smart Search</Button>
            <Popover
              open={Boolean(anchorElSearch)}
              anchorEl={anchorElSearch}
              onClose={handleSearchClose}
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'center',
              // }}
              // transformOrigin={{
              //   vertical: 'top',
              //   horizontal: 'center',
              // }}
              sx={{
                scrollbarWidth: "thin",
              }}
              PaperProps={{
                style: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  // transform: 'translate(-50%, -50%)',
                  width: '80vw',
                  height: '80vh',
                  overflow: 'auto',
                  padding: '16px',
                  scrollbarWidth: "thin",
                },
              }}
            >
              <SearchComponent wishlist={wishlist} setProjId={setProjId} setSnackMsg={setSnackMsg}/>
            </Popover>
          </ButtonGroup>
        </Box>
        <DataGrid
          ref={gridRef}
          rows={data}
          className='shadow-xl'
          sx={{
            width: "100%",
            backgroundColor: "#222222",
            borderRadius: "10px"
          }}
          getRowId={(p) => {
            return parseInt(p.ProjectID)
          }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          pageSizeOptions={[10, 15, 30, 50]}
          // checkboxSelection
          disableEval
          showColumnVerticalBorder
          showCellVerticalBorder
          onCellDoubleClick={(params, e) => {
            // console.log(params)
            if (params.field !== "DeleteAction")
              openDetails( params.id)
          }}
          onCellClick={(params) => setTimeout(() => {
            // console.log(params)
            if (params.field !== "DeleteAction") 
              setSnackMsg("Double-click row to view project details")
          }, 500)}
          slots={{
            noRowsOverlay: () => (
              <Stack height="100%"  alignItems="center" justifyContent="center">
                {navigator.onLine? searchVal === "" ? <Typography width="50%">
                No projects yet, choose projects from <Link onClick={(e) => e.preventDefault()} href='https://globalink.mitacs.ca/#/student/application/projects' target="_blank">
                  <ButtonBase sx={{all: "unset"}} onClick={openMitacsWebsite}>Mitacs Official Website</ButtonBase></Link>,
                 If you have already chosen, please try reloading the table.
                </Typography>: 
                <Typography width="50%">No results for "{searchVal}"</Typography>
                :<Typography>No Internet Connection, reload table to try again</Typography>}
              </Stack>
            )
          }}
          // onCellClick={(params, e, details) => {
          //   // console.log(params, details)
          //   if (params.field === "actions") {
          //     deleteRow(params.row.ProjectID)
          //   }
          // }}
        />
        {gridRef.current && <Popover
        open={Boolean(anchorElRow)}
        anchorEl={anchorElRow}
        onClose={handleDetailsClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{
          width: "80%"
        }}
      >
        <Box sx={{ p: 2, fontSize: "1rem" }}>
          {anchorElRow && <ProjectDetails 
          // row={
          //   tableData.find((r) => r.ProjectID === anchorElRow?.getAttribute("data-id") ?? 1)
          // }
          projectId={projId} 
          />}
        </Box>
      </Popover>}
      {navigator.onLine && <Snackbar 
        message={snackMsg}
        open={snackMsg !== "" && !anchorElRow}
        autoHideDuration={2000}
        onClose={() => setSnackMsg("")}
      />}
      <a href="https://mitexl-extension.vercel.app/" style={{zoom: 1.5}}target="_blank">
        &copy;&nbsp;2023 Mitexl
      </a>
    </main>
  )
}

export default App
