let allIssues = [];
loadIssues();

function loadIssues() {
    toggleLoader(true);

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            showIssues(allIssues);
        })
        .catch(err => console.log("Error loading issues", err))
        .finally(() => toggleLoader(false));
}




function showIssues(issues) {
    const container = document.getElementById("issue-container");
    container.innerHTML = "";

    issues.forEach(issue => {
        const card = document.createElement("div");

        let border = "border-purple-500";
        if (issue.status === "open") border = "border-green-500";

        card.className = `
             shadow-md border-t-4 p-4 bg-base-100 rounded-lg  ${border}
            cursor-pointer flex flex-col justify-between
        `;

        card.innerHTML = `
            <div class="flex justify-between">
                <h2 class="font-semibold text-sm">${issue.title}</h2>
                ${issue.label ? `<span class="py-1 rounded-full border text-xs px-2 bg-gray-100 text-gray-600">${issue.label}</span>` : ""}
            </div>

            <p class=" text-gray-500 mt-2 text-xs">
                ${issue.description}
            </p>

            <div class="mt-3 flex text-xs  justify-between text-gray-600">
                <p>Author:${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(issue));

        container.appendChild(card);
    });
}



document.getElementById("btn-1").addEventListener("click", function () {
    setActive("btn-1");
    showIssues(allIssues);
});

document.getElementById("btn-2").addEventListener("click", function () {
    setActive("btn-2");

    const openList = allIssues.filter(function (item) {
        return item.status === "open";
    });

    showIssues(openList);
});

document.getElementById("btn-3").addEventListener("click", function () {
    setActive("btn-3");

    const closedList = allIssues.filter(function (item) {
        return item.status === "closed";
    });

    showIssues(closedList);
});


function setActive(id) {
    const buttons=["btn-1","btn-2","btn-3"];

    buttons.forEach(function (btn) {
        document.getElementById(btn).classList.remove("bg-purple-500", "text-white");
    });

    document.getElementById(id).classList.add("bg-purple-500", "text-white");
}




function openModal(issue) {
    const modal = document.getElementById("modal");

    modal.innerHTML = `
        <div class="bg-white p-5 rounded w-[350px]">
            <h2 class="font-bold mb-2">${issue.title}</h2>
            <p class="text-sm mb-3">${issue.description}</p>

            <p>Status: ${issue.status}</p>
            <p>Author: ${issue.author}</p>
            <p>Priority: ${issue.priority}</p>
            <p>Label: ${issue.label}</p>

            <div class="text-right mt-4">
                <button onclick="closeModal()" class="btn btn-sm btn-primary">
                    Close
                </button>
            </div>
        </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}


function toggleLoader(show) {
    const loader = document.getElementById("loader");

    if(!loader){
        return;
    }

    if(show){
        loader.classList.remove("hidden");
    } else {
        loader.classList.add("hidden");
    }
}