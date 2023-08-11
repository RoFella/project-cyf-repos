import repos from "/data/repos.js";

// global `options` objects that stores options
// chosen by the user of the web-page.
const options = {
  filterby: null,
  sortBy: {
      field: null,
      direction: "asc" // "asc" | "desc"
  },
  recordsOnPage: 10
};

export default function buildPage() {
    const root = document.querySelector("div#root");
    const table = buildTable(repos);
    root.appendChild(table);

}

function buildTable(data) {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead

  const table = document.createElement("table");

 
  const header = document.createElement("thead");

  const haderRow = document.createElement("tr");

  const headerName = document.createElement("th");
  const headerDescription = document.createElement("th");
  const headerLink = document.createElement("th");
  const headerUpdated = document.createElement("th");

  headerName.innerText = "Name";
  headerDescription.innerText = "Desciption";
  headerLink.innerText = "Link";
  headerUpdated.innerText = "Updated At";

  table.appendChild(header);
  header.appendChild(haderRow);
  haderRow.appendChild(headerName);
  haderRow.appendChild(headerDescription);
  haderRow.appendChild(headerLink);
  haderRow.appendChild(headerUpdated);
  
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);


  data.forEach((repo) => {
    const row = document.createElement("tr");
    
    const nameCell = document.createElement("td");
    nameCell.innerText = repo.name;

    const descriptionCell = document.createElement("td");
    descriptionCell.innerText = repo.description;

    const linkCell = document.createElement("td");
    const link = document.createElement("a");
    link.href = repo.html_url;
    link.innerText = repo.html_url;
    linkCell.appendChild(link);

    const updatedAt = document.createElement("td");
    updatedAt.innerText = repo.updated_at;

    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(linkCell);
    row.appendChild(updatedAt);

    tbody.appendChild(row);
  });

  return table;
};



function buildSearchBar() {
  const searchBarDiv = document.createElement("div");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter your search query";

  const searchButton = document.createElement("button");
  searchButton.textContent = "Search";

  searchBarDiv.appendChild(inputField);
  searchBarDiv.appendChild(searchButton);

  inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      search(inputField.value);
    }
  });

  searchButton.addEventListener("click", function() {
    search(inputField.value);
  });

  return searchBarDiv;
};


function search(searchTerm) {
  // implement search functionality
  // and use this function in event handlers
  // for input and button elements in Search Component.
}

function sort(field, direction) {
    // implement sort functionality
    // and use this function in event handlers
    // for input and button elements in Sorting Component.
}

function setPagination(recordsOnPage) {
    // implement pagination functionality
    // and use this function in event handler 
    // for Pagination Component
}

export {buildPage, sort, search, setPagination};

