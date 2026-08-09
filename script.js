let packButton = document.getElementById("btn-packliste");

packButton.addEventListener("click", generateToolList);

function generateToolList() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let selectedTasks = [];
    checkboxes.forEach(checkbox => {
        selectedTasks.push(checkbox.value);
    });

    console.log(packButton, "Button clicked!");
    console.log(checkboxes, "Selected tasks!");
    console.log(selectedTasks, "Selected tasks array!");
}