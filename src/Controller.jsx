import {useState, useEffect} from "react"
import View from "./View.jsx"
import React from "react"
import getData from "./Data.js"
import updateCurrentTime from "./CurrentTime.jsx"

export default function Controller() {
  let [todoContent,setTodoContent] = useState('')
  let [allTodo, setAllTodo] = useState(JSON.parse(localStorage.getItem("todolist")) || []) 
  let [count, setCount] = useState(allTodo.length)
  let [todoTypes,setTodoTypes] = useState("all")
  let [currentCard, setCurrentCard] = useState()
  let [time, setTime] = useState([new Date().getHours(), new Date().getMinutes()])
  let [days,months] = getData()
  let [openSort, setOpenSort] = useState(false)

  let date = new Date()
  let hours = time[0]
  let minutes = time[1] < 10 ? "0" + time[1] : time[1]
  let month = months[date.getMonth() + 1]
  let weekDay = days[date.getDay()]
  let day = date.getDate()
  let whatTypeOfDay;

  updateCurrentTime(setTime)

  if (hours >=6 && hours <=12) {
     whatTypeOfDay = "Morning"
  } 
  else if (hours > 12 && hours <= 16) {  
    whatTypeOfDay =  "Afternoon"
  }
  else if (hours > 16 && hours <= 20) {
    whatTypeOfDay = "Evening"
  } 
  else {
     whatTypeOfDay =  "Night"
  }
  
  function handleSubmit(e) {
    setCount(count + 1)
    e.preventDefault()
    setAllTodo(prev => {
      let updObj = {
        content: todoContent,
        id: count+1,
        checked: false,
      }
      localStorage.setItem("todolist", JSON.stringify([...prev,updObj]))
      return [...prev,updObj]
    })
    setTodoContent('')
  }
  
  function handleTodoCheck(id) {
    setAllTodo(prev => {
      const updatedTodo = prev.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked
          };
        }
        return todo;
      });
  
      localStorage.setItem("todolist", JSON.stringify(updatedTodo));
      return updatedTodo;
    });
  }
  function handleTodoDelete(id) {
    setAllTodo(prev => {
      let other = prev.filter(el => {
        return el.id !== id
      })
  
      localStorage.setItem("todolist", JSON.stringify(other))
      return other
    })
}

  function dragStartHandler(e,el) {
    setCurrentCard(JSON.parse(el))

  }

  function dragLeaveHandler(e) {

  }

  function dragEndhandler(e) {

  }
  
  function dragOverHandler(e) {
    e.preventDefault()

  }

  function drophandler(e, el) {
    e.target.style.background = "white"
    e.preventDefault();
    const droppedCard = JSON.parse(el);
    console.log(currentCard.id)
    console.log(droppedCard.id)
    setAllTodo((prev) => {
      const updatedTodo = prev.map((todo) => {
        if (todo.id === droppedCard.id) {
          return { ...todo, id: currentCard.id};
        }
        else if (todo.id === currentCard.id) {
          return { ...todo, id: droppedCard.id };
        }
        return todo;
      });
      console.log(allTodo)
      localStorage.setItem("todolist", JSON.stringify(updatedTodo));
      return updatedTodo;
    });
  }

  function onChangeee(e) {
    return setTodoContent(e.target.value)
  }

  function handleSort(type) {
    setTodoTypes(type)
  }

  function displayTodo(condition,el) {
    return condition && (<div className="todo" 
    key={el.id} 
    draggable={true} 
    onDragStart={(e) => dragStartHandler(e,JSON.stringify(el))}
    onDragLeave={(e) => dragLeaveHandler(e)}
    onDragEnd={(e) => dragEndhandler(e)}
    onDragOver={(e) => dragOverHandler(e)}
    onDrop={(e) => drophandler(e,JSON.stringify(el))}
    >
            <form onClick={() => handleTodoCheck(el.id)}className="checkbox-form">
            <input checked={el.checked}
                className="checkbox" 
                type="checkbox"
                onChange={(e) => {return "just for need" }}/>
            </form>
            {el.content.length <= 67 ? <p style={{backgroundColor: ""}} className="content-todo">{el.content}</p> : <p className="todo-content">{el.content.slice(0,67) + "..."}</p>} 
            <img className="icon dots" src="./src/assets/dots.png"></img>
            <img onClick={() => handleTodoDelete(el.id)} className='icon x' src="./src/assets/x.png"></img>
        </div>)
  }
  
  let renderTodo = allTodo
  .sort((a,b) => a.id - b.id)
  .map(el => {
    let element = el
    return (
      todoTypes === "all" 
        ? displayTodo(true,el) 
        : todoTypes === "active" 
          ? displayTodo(element.checked === false,el) 
          : displayTodo(element.checked === true,el)
    )
  })

    if (renderTodo.length === 0) {
      ""
    }
    
  return <View
    handleSubmit={handleSubmit}
    todoContent={todoContent}
    handleTodoCheck={handleTodoCheck}
    handleTodoDelete={handleTodoDelete}
    setTodoContent={setTodoContent}
    renderTodo={renderTodo}
    onChangeee={onChangeee}
    handleSort={handleSort}
    month={month}
    weekDay={weekDay}
    day={day}
    whatTypeOfDay={whatTypeOfDay}
    hours={hours}
    minutes={minutes}
    openSort={openSort}
    setOpenSort={setOpenSort}
   />
}