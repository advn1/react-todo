import {useState, useEffect} from "react"
import UpdApp from "./UpdApp.jsx"
import React from "react"
import { render } from "react-dom"


export default function Controller() {
  let [todoContent,setTodoContent] = useState('')
  let [allTodo, setAllTodo] = useState(JSON.parse(localStorage.getItem("todolist")) || []) 

  let [count, setCount] = useState(allTodo.length)
  let [todoTypes,setTodoTypes] = useState("all")
  let [widgets,setWidgets] = useState([])
  let [currentCard, setCurrentCard] = useState()
  let [time, setTime] = useState([new Date().getHours(), new Date().getMinutes()])

  

  let days = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun"
  }

  let months = {
    1: "Jan",
    2: "Feb",
    3:"Mar",
    4: "Apr",
    5: "May",
    6:"Jun",
    7:"Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11 : "Nov",
    12: "Dec"
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime([new Date().getHours(), new Date().getMinutes()])
    }, 60000);

    return () => clearInterval(interval)
  }, [])


  let date = new Date()
  let hours = time[0]
  let month = months[date.getMonth() + 1]
  let weekDay = days[date.getDay()]
  let day = date.getDate()
  let whatTypeOfDay;

  if (hours >=6 && hours <=12) {
     whatTypeOfDay = "Morning"
  } 
  else if (hours > 12 && hours <= 16) {  whatTypeOfDay =  "Afternoon"}
  else if (hours > 16 && hours <= 20) {whatTypeOfDay = "Evening"} 
  else { whatTypeOfDay =  "Night"}
  
  function handleSubmit(e) {
    console.log(day)
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

  
  
    let renderTodo = allTodo.sort((a,b) => a.id - b.id).map(el => {
      return (
<div className="todo" 
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
        </div>
      )
        
    })

    if (renderTodo.length === 0) {
      ""
    }
    
    
    if (renderTodo.length === 0) {
      renderTodo = [];
    }

    function onChangeee(e) {
      return setTodoContent(e.target.value)
    }

    function handleSort(type) {
      setTodoTypes(type)
    }
    
  return <UpdApp
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
    hours={time[0]}
    minutes={time[1]}
   />
}