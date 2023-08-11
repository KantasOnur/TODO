let people = [];

const INVALID_INDEX    = -1;
const INPUT_NAME_INDEX = 0;
const INPUT_TASK_INDEX = 1;

function addTask(){

    try{
        let input   = document.getElementById('input').value;
        let name    = input.split(": ")[INPUT_NAME_INDEX];
        let toDo    = input.split(": ")[INPUT_TASK_INDEX];
        let toDoArr = toDo.split(',');
        format(toDoArr);

        for(let i = 0; i < toDoArr.length; i++){
            toDoArr[i] = toDoArr[i].replaceAll(' ', '_');
        }

        if(nameIndex(name) != INVALID_INDEX){ //check if the person already exists
            let existingPerson = people[nameIndex(name)];
            let task = existingPerson.task;
        
            for(let i = 0; i < toDoArr.length; i++){
                task.push(toDoArr[i]); //update person's task array
            }
        }
        else{
            person      = new Object(); //create a new person object
            person.name = name;
            person.task = toDoArr;
            
            people.push(person);
        }
        showTask(); //update the screen
        console.log(person.task);
    }
    catch(e){
        if(e == "WhiteSpaceException"){
            alert("Be sure to leave no whitespace before and after tasks");
        }
        else{
            alert("Leave a whitespace after the colon");
        }
    }
}

function format(toDoArr){
    for(let i = 0; i < toDoArr.length; i++){
        if(toDoArr[i][0] == ' ' || toDoArr[i][toDoArr[i].length - 1] == ' '){
            throw "WhiteSpaceException";
        }
    }
}

function nameIndex(name){
    for(let i = 0; i < people.length; i++){
        if(name == people[i].name){
            return i;
        }
    }
    return INVALID_INDEX; //invalid index if the person doesn't exist
}


function removeTask(name, task){
    
    let person = people[nameIndex(name)]; //get the person from the array
    let tasks  = person.task; //their existing task(s)


    if(tasks.length == 1){ //remove the person from the array
        let newPeople = [];
        for(let i = 0; i < people.length; i++){
            if(people[i].name != name){
                newPeople.push(people[i]);
            }
        }
        people = newPeople;
    }
    else{ //remove the task
        let newTasks = [];
        let gone = false;

        for(let i = tasks.length - 1; i >= 0; i--){
            if(gone || tasks[i] != task){
                newTasks.push(tasks[i]);
            }
            else{
                gone = true;
            }
        }
        newTasks = reverseArray(newTasks);
        person.task = newTasks;
    }
    showTask(); //update the screen
}

function reverseArray(arr){
    let newArr = [];
    for(let i = arr.length - 1; i >= 0; i--){
        newArr.push(arr[i]);
    }
    return newArr;
}

function showTask(){
    document.getElementById("taskBox").innerHTML = ''; //cleanup

    for(let i = 0; i < people.length; i++){ //iterates the people
        let person = people[i];
        let taskArray  = person.task;
        let shown = [];

        let box = "<div class = \"tasks\">";
        box += "<div id = \"name\">" + person.name + "</div>";

        for(let j = 0; j < taskArray.length; j++){
            let s = taskArray[j];
            if(shown.includes(s) == false){
                shown.push(s);
            }
        }

        for(let z = 0; z < shown.length; z++){
            box += "<div id = \"clickTask\" onclick = removeTask(";
            box += "'" + person.name + "',";
            box += "'" + shown[z] + "'"; 
            box += ")>"; //call removeTask(personTask.name,taskArray[j]) when clicked
            box += shown[z].replaceAll('_', ' '); //show the task on the screen

            if(repetition(person, shown[z]) != 1){

                box += "<div id = \"repBox\">";
                box += "x" + repetition(person, shown[z]);
                box += "</div>"; //close repBox
            }

            box += "</div>" //close clickTask
        }
        
        box += "</div>"; //close taskBox

        document.getElementById("taskBox").innerHTML += box; 
   } 

}

function repetition(person, task){
    let taskArray = person.task;
    let count = 0;
    for(let i = 0; i < taskArray.length; i++){
        if(taskArray[i] == task){
            count++;
        }
    }
    return count;
}
