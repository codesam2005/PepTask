const API = "http://backend-service:5000";

async function loadTasks(){
  const res = await fetch(`${API}/tasks`);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task=>{
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });
}

async function addTask(){
  const input = document.getElementById("taskInput");

  await fetch(`${API}/tasks`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      title: input.value
    })
  });

  input.value="";
  loadTasks();
}

loadTasks();