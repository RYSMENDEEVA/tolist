import React from 'react';
import {useState} from "react";

function App() {

    const[tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Buy car',
            isDone: false,
            isImportant: false
        },
        {
            id: 2,
            title: 'Buy toy',
            isDone: false,
            isImportant: false
        }

    ])
    const [filter, setFilter] = useState([""])


    const addTask = (e) => {
        e.preventDefault()
         setTasks([
            ...tasks,
            {
                id: tasks.length ? tasks[tasks.length -1].id + 1 : 1,
                title: e.target[0].value,
                isDone: false,
                isImportant: false
            }

        ])
       return e.target[0].value = ''
    }

    const deleteTask = (id) => {
        return setTasks(
            tasks.filter((item) => item.id !== id)
        )
    }

    const doneTask =(id) => {
        return setTasks(tasks.map((item) => {
            if (item.id === id){
                return {...item,  isDone: !item.isDone}
            }
            return item
        }))
    }

    const importantTask =(id) => {
        return setTasks(tasks.map((item) => {
            if (item.id === id){
                return {...item,  isImportant: !item.isImportant}
            }
            return item
        }))
    };
    

  return (
      <div className="App">
          <form onSubmit={addTask}>
              <input type="text" minLength={5} maxLength={20} required/>
              <button type="submit">Add</button>
          </form>
          <button type={"button"} onClick={() => setFilter("done")}>done</button>
          <button type={"button"} onClick={() => setFilter("important")}>important</button>
          <button type={"button"} onClick={() => setFilter("all")}>all</button>

          <ul>
              {
                tasks.length
                    ?
                tasks.filter(item => {
                    if (filter === "done"){
                        return item.isDone
                    }
                    else if (filter === "important"){
                        return item.isImportant
                    }
                    else {
                        return item
                    }
              }).map((item) => (
                        <li>
                            <span style={{
                               textDecoration: item.isDone ? 'line-through' : '',
                               background: item.isImportant ? 'purple' : ''
                            }}>
                      {item.title}
                  </span>
                            <div>
                                <button
                                    onClick={() => doneTask(item.id)}
                                >
                                    done
                                </button>
                                <button
                                    onClick={() => importantTask(item.id)}
                                >
                                    important
                                </button>
                                <button
                                    onClick={() => deleteTask(item.id)}
                                >
                                    delete
                                </button>
                            </div>
                        </li>
                ))
                    :
                    <li>Tasks is empty</li>
              }

          </ul>
      </div>

  );
}

export default App;
