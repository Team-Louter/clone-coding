const input=document.getElementById('todo_input')
const addButton=document.getElementById('add')
const todoList=document.getElementById('todo_list')

addButton.addEventListener('click',function() {
  const text= input.value.trim();
  if (text !== "") {
    const newList = document.createElement('li');
    const textSpan = document.createElement('span'); 
    textSpan.innerText = text;
    
    newList.appendChild(textSpan);

    const delButton = document.createElement('button');
    delButton.innerText = "삭제";
    delButton.className = "del_button";

    delButton.addEventListener('click', function() {
        if (confirm('정말 삭제하시겠습니까?')) {
            newList.remove();
            saveTodos();
            input.focus();
        }
    });
    newList.appendChild(delButton);


    const editButton = document.createElement('button');
    editButton.innerText = "수정";
    editButton.className = "edit_button";

    // editButton.addEventListener('click', function() {
    //     const newText = prompt('수정할 내용을 입력해주세요.', textSpan.innerText);
    //     if (newText !== "" && newText !== null){
    //         textSpan.innerText = newText;
    //         input.focus();

    //     }
    // });
    // newList.appendChild(editButton);

    editButton.addEventListener('click', function() {
    if (textSpan.contentEditable !== "true") {
        textSpan.contentEditable = true;
        textSpan.focus();

        window.getSelection().removeAllRanges();
        window.getSelection().selectAllChildren(textSpan);

        editButton.innerText = "저장";
    } else {
        if (textSpan.innerText.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        textSpan.contentEditable = false;
        editButton.innerText = "수정";
        saveTodos();
        input.focus();
    }
    saveTodos();
    });
    newList.appendChild(editButton);    


    // const completeButton = document.createElement('button');
    // completeButton.innerText = "완료";
    // completeButton.className = "complete_button";

    // completeButton.addEventListener('click', function() {
    //             textSpan.classList.toggle('complete');

    //             if (textSpan.classList.contains('complete')) {
    //                 todoList.appendChild(newList);
    //             } else{
    //                 todoList.prepend(newList);
    //             }
    //             input.focus();

    // });
    // newList.appendChild(completeButton);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';

    checkbox.addEventListener('change',function(){
        if(checkbox.checked){
            textSpan.classList.add('complete');
            // todoList.appendChild(newList);
        }else{
            textSpan.classList.remove('complete');
        }
    })
    newList.prepend(checkbox);


    todoList.appendChild(newList);
    input.value = ""
    input.focus();
    saveTodos();
}
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.isComposing) {
        addButton.click();
    }
});


function saveTodos() {
    const todos = [];
    
    document.querySelectorAll('#todo_list li').forEach(li => {
        const text = li.querySelector('span').innerText;
        const isChecked = li.querySelector('input[type="checkbox"]').checked;

        todos.push({
            task: text,
            done: isChecked
        });
    });

    localStorage.setItem('myTodos', JSON.stringify(todos));
}

function loadTodos() {
    const savedData = localStorage.getItem('myTodos');

    if (savedData) {
        const todos = JSON.parse(savedData);

        todos.forEach(todo => {
            const newList = document.createElement('li');
    const textSpan = document.createElement('span'); 
    textSpan.innerText = todo.task;
    
    newList.appendChild(textSpan);

    const delButton = document.createElement('button');
    delButton.innerText = "삭제";
    delButton.className = "del_button";

    delButton.addEventListener('click', function() {
        if (confirm('정말 삭제하시겠습니까?')) {
            newList.remove();
            saveTodos();
            input.focus();
        }
    });
    newList.appendChild(delButton);


    const editButton = document.createElement('button');
    editButton.innerText = "수정";
    editButton.className = "edit_button";

    editButton.addEventListener('click', function() {
    if (textSpan.contentEditable !== "true") {
        textSpan.contentEditable = true;
        textSpan.focus();

        window.getSelection().removeAllRanges();
        window.getSelection().selectAllChildren(textSpan);

        editButton.innerText = "저장";
    } else {
        if (textSpan.innerText.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        textSpan.contentEditable = false;
        editButton.innerText = "수정";
        saveTodos();
        input.focus();
    }
    saveTodos();
    });
    newList.appendChild(editButton);    


    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';

    checkbox.checked = todo.done;
            if (todo.done) {
                textSpan.classList.add('complete');
            }

    checkbox.addEventListener('change',function(){
        if(checkbox.checked){
            textSpan.classList.add('complete');
        }else{
            textSpan.classList.remove('complete');
        }
        saveTodos();
    });
    newList.prepend(checkbox);


    todoList.appendChild(newList);
        });
    }
} 
loadTodos();