let myLeads = [];
const inputEl = document.getElementById("input-el")
const listEl = document.getElementById("list-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // will not be re-assigned
const tabBtn = document.getElementById("tab-btn")

// console.log(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let activeTab = tabs[0];
        myLeads.push(activeTab.url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    listEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})





// for (let i = 0; i < myLeads.length; i++) {
//     // alternative ways to do the same:
//     // listEl.innerHTML += "<li>" + myLeads[i] + "</li>"
//     // or:
//     const listItem = document.createElement("li")
//     listItem.textContent = myLeads[i]
//     listEl.append(listItem)
// }