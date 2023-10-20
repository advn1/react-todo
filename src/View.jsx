import React from "react"



export default function View({ handleSort, handleSubmit, todoContent, handleTodoCheck, handleTodoDelete, setTodoContent,renderTodo,onChangeee,weekDay,month,day,}) {
  return (
    <div className="app-container">
        <div className="good-day-div"><h1 className="good-day">Good, User!</h1></div>
        <div className="quote-div"><h1 className="quote">Be so good no one can ignore you</h1></div>
        <div className="current-date-div">
          <p className="day">{weekDay}</p>
          <p className="day-number">{day}</p>
          <p className="month">{month}</p>
        </div>
        <div className="all-todo-div">
          <div className="todo">
            <form onSubmit={handleSubmit}className="checkbox-form">
              <input 
                className="checkbox" 
                type="checkbox"
                />
            </form>
            <p className="content-todo">Read the report</p>
            <img className='icon' src="./src/assets/checked-new.png"></img>
            <img className="icon dots" src="./src/assets/dots.png"></img>
            <img className='icon x' src="./src/assets/x.png"></img>
          </div>
        </div>
        
    </div>
    // <div className='app-container'>
    //   <div className='create-todo'>
    //   <img className='icon' src="./src/assets/empty.png"></img>
    //     <form onSubmit={handleSubmit}>
    //       <input 
    //         type="text" 
    //         placeholder='Create a new todo'
    //         name="" 
    //         id=""
    //         value={todoContent}
    //         onChange={(e) => onChangeee(e)} />
    //     </form>
    //     </div>
    //     <div className='all-todo'>
    //       {renderTodo}
    //     </div>
    //     <div className="show-types">
    //       <p className="type" onClick={() => handleSort("all")}>All</p>
    //       <p className="type" onClick={() => handleSort("active")}>Active</p>
    //       <p className="type" onClick={() => handleSort("completed")}>Completed</p>
    //     </div>
    // </div>
  )
}