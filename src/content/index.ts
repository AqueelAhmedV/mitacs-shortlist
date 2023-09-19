console.info('chrome-ext template-react-ts content script')

console.info('chrome-ext template-react-js content script')

// axios.defaults.withCredentials = true;

const styleTag = document.createElement("style")
document.head.appendChild(styleTag)

const showAndHideToast = `
@keyframes showAndHideToast {
    0% {
      bottom: -100px;
      opacity: 0;
      display: block;
    }
    10% {
      bottom: 10px;
      opacity: 1;
      display: block;
    }
    90% {
      bottom: 10px;
      opacity: 1;
      display: block;
    }
    100% {
      bottom: -100px;
      opacity: 0;
      display: none;
    }
  }`

styleTag.sheet?.insertRule(showAndHideToast)
styleTag.sheet?.insertRule(`
  #notif {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #fff;
    font-weight: 500;
    border-radius: 3px;
    position: sticky;
    zIndex: 9999;
    bottom: -100px;
    width: 190px;
    padding: 5px 2px;
    text-align: center;
    left: calc(50% - 95px);
    animation: showAndHideToast 5s ease-in-out;
  }
`)
styleTag.sheet?.insertRule(`
  #mitexlBtn {
    display: inline-block;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.2s;
    &:hover {
        background-color: #ff4f4f;
        transform: scale(1.05);
    }
    &:focus {
        outline: none;
    }
    &:active {
        transform: scale(0.95);
    }
   }
`)

function showNotif(msg: string, type:string) {
    const notif = document.createElement("div")
    notif.id = "notif"
    notif.style.backgroundColor = {add:"#66bb6a", delete:"#f44336"}[type] as string
    notif.innerHTML = msg
    document.body.appendChild(notif)
    setTimeout(() => {
        document.body.removeChild(notif)
    }, 5000)
}

// chrome.runtime.onMessage.addListener((message, sender,res) => {
//   // console.log(message)
//   if (message === "externalWishlistUpdate") {
//     document.querySelectorAll("#mitexlControls").forEach((d) => {
//       d.remove()
//     })
//   }
// })

const int1 = setInterval(() => {
    let wishlist: any;
    // chrome.storage.sync.clear()
    chrome.storage.sync.get(["mitexlWishlist"])
    .then((data) => {
    //    console.log(data, typeof data)
        wishlist = new Set(data.mitexlWishlist)
        Array.from(document.getElementsByTagName("p"))
    .filter((p) => p.innerText.includes("Project ID"))
    .forEach((p) => {
        const projectId = p.innerText.split(" ")[2]
        
        const toDelete = wishlist.has(projectId)
        if (p.parentNode?.children.length === 2) return;
        // console.log(wishlist)
        const controlDiv = document.createElement("div")
        controlDiv.id = "mitexlControls"
        controlDiv.setAttribute("name", projectId)
        controlDiv.style.display = "flex"
        controlDiv.style.justifyItems = "center"
        controlDiv.style.justifyItems = "center"
        p.parentNode?.appendChild(controlDiv)
        const addBtn = document.createElement("button")
        addBtn.id = "mitexlBtn"
        addBtn.innerHTML = toDelete?"Remove from Wishlist":"Add to Wishlist"
        addBtn.style.backgroundColor = toDelete?"#ff6b6b":"#4caf50"
        addBtn.onclick = async () => {
            let val;
            if (!wishlist.has(projectId)) {
              // if (wishlist.size === 30) {
              //   showNotif("Cannot Add more than 30 Projects at a time", "delete")
              //   return;
              // }    
              addBtn.innerHTML = "Remove from Wishlist"
                addBtn.style.backgroundColor = "#ff6b6b"
                
                  wishlist.add(projectId)
                // console.log(wishlist)
                showNotif("Added Project "+ projectId, "add")
                val = "a"+projectId
                
            } else {
                addBtn.innerHTML = "Add to Wishlist"
                addBtn.style.backgroundColor = "#4caf50"
                wishlist.delete(projectId)
                showNotif("Removed Project "+ projectId, "delete")
                val = "d"+projectId
            }
            await chrome.storage.sync.set({"mitexlWishlist":Array.from(wishlist)})
            
        }
        controlDiv.appendChild(addBtn)
    })
    }).catch((err) => {
      // console.log(err)
    })
    
}, 2000)


// }

export {}


export {}
