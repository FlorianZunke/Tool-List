let packButton = document.getElementById("btn-packliste");

packButton.addEventListener("click", generateToolList);

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
        checkbox.type = "checkbox";
        checkbox.id = `tool-${tool}`;
        checkbox.value = tool;
        let label = document.createElement("label");
        label.htmlFor = `tool-${tool}`;
        label.textContent = " " + tool;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        outputList.appendChild(listItem);
    });
}