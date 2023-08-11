import { repos } from "./data/repos.js";

// global `options` objects that stores options
// chosen by the user of the web-page.
const options = {
    filterby: null,
    sortBy: {
        field: "name",
        direction: "asc" // "asc" | "desc"
    },
    recordsOnPage: 10
};

function buildPage() {
    const root = document.querySelector("div#root");
    
    const table = createTable(repos);
    const searchBar = createSearchComponent();

    root.append(searchBar, table);
}

function search(searchTerm) {
    
    if (searchTerm === "") {
        alert("Please give me searching criteria!");
        return;
    }

    options.filterby = searchTerm;

    const trows = convertReposToTableRows(repos)
    const tbody = document.querySelector("table > tbody");
    tbody.replaceChildren(...trows);
    
}

function sort({field, direction}) {
    // implement sort functionality
    // and use this function in event handlers
    // for input and button elements in Sorting Component.
}

function setPagination(recordsOnPage) {
    // implement pagination functionality
    // and use this function in event handler 
    // for Pagination Component
}


function convertReposToTableRows(repos) {

    const filteredRepos = options.filterby == null ? [...repos] :
        repos.filter(({name, description}) => 
                name.includes(options.filterby || 
                    (description != null && description.includes(options.filterby))
        ));

    if (options.sortBy.field != null) {
        filteredRepos.sort((repo1, repo2) => {
            let a = null;
            let b = null;

            if (options.sortBy.field === "name") {                
                a = repo1.name;
                b = repo2.name;
            }

            if (options.sortBy.field === "updated_at") {
                a = new Date(repo1.updated_at);
                b = new Date(repo2.updated_at);
            }

            if (a > b) {
                return 1;
            };

            if (a < b) {
                return -1;
            };

            return 0;

        });
    }
    
    return filteredRepos
        .map( ({name, updated_at, description, html_url}) => {
            const tr = document.createElement("tr");
            
            const tdName = document.createElement("td");
            tdName.innerText = name;

            const tdDescription = document.createElement("td");
            tdDescription.innerText = description;

            const tdUrl = document.createElement("td");
            const a = document.createElement("a");
            a.href = html_url;
            a.innerText = html_url;
            tdUrl.appendChild(a);
                                    
            const tdUpdatedAt = document.createElement("td");
            tdUpdatedAt.innerText = updated_at;

            tr.append(tdName, tdDescription, tdUrl, tdUpdatedAt);
            
            return tr;
        });
}

function createTable(data) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
   
    table.append(thead, tbody);
    
    const headers = ["Name", "Description", "Link", "Updated At"]
        .map(header => {
            const th = document.createElement("th");
            th.innerText = header;
            return th;
        });

    thead.append(...headers);
    const trows = convertReposToTableRows(data);
    

    tbody.append(...trows);
    return table;
}

function createSearchComponent() {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");

    div.append(input, button);

    input.placeholder = "Type search parameter here";
    button.innerText = "Search";

    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            search(event.target.value);
        }
    });

    button.addEventListener("click", event => {
        search(input.value);
    });
    
    return div;
}



export {buildPage};