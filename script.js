let packButton = document.getElementById("btn-packliste");
let extraToolButton = document.getElementById("btn-add-extra-tool");

packButton.addEventListener("click", generateToolList);
extraToolButton.addEventListener("click", addSingleTool);

function generateToolList() {
    let outputList = document.getElementById("output-list");
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTasks = [];
    checkboxes.forEach(checkbox => {
        selectedTasks.push(checkbox.value);
    });

    let allTools = [];

    selectedTasks.forEach(taskKey => {
        let taskTools = database[taskKey].tools;

        if (taskTools) {
            allTools.push(...taskTools);
        }
    });

    let filteredTools = allTools.filter((tool, index) => {
        return allTools.indexOf(tool) === index;
    });

    outputList.innerHTML = "";
    filteredTools.forEach(tool => {
        let listItem = document.createElement("li");
        let checkbox = document.createElement("input");
        let label = document.createElement("label");
        
        checkbox.type = "checkbox";
        checkbox.id = `tool-${tool}`;
        checkbox.value = tool;
        
        label.htmlFor = `tool-${tool}`;
        label.textContent = " " + tool;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        outputList.appendChild(listItem);
    });
}

function addSingleTool() {
    let inputFieldExtraTool = document.getElementById("input-extra-tool");
    let extraTool = inputFieldExtraTool.value.trim();

    if (inputFieldExtraTool.value !== "") {
        let outputList = document.getElementById("output-list");
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

        inputFieldExtraTool.value = "";
    }
}