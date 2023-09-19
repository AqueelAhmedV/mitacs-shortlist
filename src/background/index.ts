console.info('chrome-ext template-react-ts background script')

import { uid } from "uid"

// chrome.storage.sync.get("mitexlWishlist").then((data) => {
//     console.log(data.mitexlWishlist)
// })




chrome.action.onClicked.addListener((t) => {
    chrome.runtime.openOptionsPage()
})

// chrome.storage.sync.onChanged.addListener(() => {
//     // setTimeout(() => {
//     //     chrome.runtime.openOptionsPage()
//     // }, 2000)
// })




chrome.runtime.onInstalled.addListener(async (details) => {
    let {userId} = await chrome.storage.sync.get(["userId"])
    // console.log(userId)
    if (!userId)
        await chrome.storage.sync.set({"userId": uid(7)})
    chrome.runtime.openOptionsPage()
})

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log(msg)
    
// })
// export {}
