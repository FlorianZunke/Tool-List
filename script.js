let packButton = document.getElementById("btn-packliste");
let extraToolButton = document.getElementById("btn-add-extra-tool");
let outputList = document.getElementById("output-list");

let extra_Tools = {

}

packButton.addEventListener("click", generateToolList);
extraToolButton.addEventListener("click", addSingleTool);

function createHTML(extraTool) {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");

    checkbox.type = "checkbox";
    checkbox.id = `tool-${extraTool}`;
    checkbox.value = extraTool;

    label.htmlFor = `tool-${extraTool}`;
    label.textContent = " " + extraTool;

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    outputList.appendChild(listItem);
}

function generateToolList() {
    console.log("Gespeicherte Extra-Tools:", extra_Tools);
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTasks = [];
    checkboxes.forEach(checkbox => {
        selectedTasks.push(checkbox.value);
    });

    let allTools = [];

    selectedTasks.forEach(taskKey => {
        if (database[taskKey] && database[taskKey].tools) {
            allTools.push(...database[taskKey].tools);
        }

        if (extra_Tools[taskKey]) {
            allTools.push(...extra_Tools[taskKey]);
        }
    });

    let filteredTools = allTools.filter((tool, index) => {
        return allTools.indexOf(tool) === index;
    });

    outputList.innerHTML = "";
    filteredTools.forEach(tool => {
        createHTML(tool)
    });
}

function addSingleTool() {
    let inputFieldExtraTool = document.getElementById("input-extra-tool");
    let selectedCategory = document.getElementById("select-category").value;
    let extraTool = inputFieldExtraTool.value.trim();

    if (!extra_Tools[selectedCategory]) {
        extra_Tools[selectedCategory] = [];
    }

    if (inputFieldExtraTool.value !== "") {
        createHTML(extraTool)

        extra_Tools[selectedCategory].push(extraTool);
        setInLocalstorage();

        inputFieldExtraTool.value = "";
    }
}

function setInLocalstorage(outputList) {
    let listToString = JSON.stringify(extra_Tools);
    localStorage.setItem("extra_Tools", listToString);
}

function loadFromLocalstorage() {
    let savedData = localStorage.getItem("extra_Tools");

    if (savedData) {
        extra_Tools = JSON.parse(savedData);
    }
}

function removeFromLocalstorage() {
    localStorage.removeItem("extra_Tools")
}


loadFromLocalstorage()
