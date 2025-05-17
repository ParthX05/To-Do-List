const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function addtask(){
    if(input.value.trim() === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.textContent = input.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        list.appendChild(li);
        savedata();
    }
    input.value = '';
}

function cleartask() {
    if(list.innerHTML.trim() === ''){
        showMessage("no tasks to clear");
        return;
    }
    document.getElementById("confirmation").style.display = "block";
}

function confirmClear(choice){
    const ask = document.getElementById("confirmation");
    if(choice === true){
        list.innerHTML = '';
        savedata();
        showMessage("All tasks cleared");
    }
    else{
        showMessage("Action canceled");
    }
    ask.style.display = "none";
}

function showMessage(text) {
    const msg = document.getElementById("message");
    msg.textContent = text;

    setTimeout(() => {
        msg.textContent = "";
    }, 3000);
}

list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savedata();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savedata();
    }
});

function savedata(){
    localStorage.setItem("data", list.innerHTML);
}

function showtask(){
    list.innerHTML = localStorage.getItem("data")||"";
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addtask();
    }
});

showtask();
