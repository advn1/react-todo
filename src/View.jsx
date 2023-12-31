import { useState } from "react"

export default function UpdApp({handleSubmit,
    todoContent,
    handleTodoCheck,
    handleTodoDelete,
    setTodoContent,
    renderTodo,
    onChangeee,
    handleSort,
    whatTypeOfDay,
    hours,
    minutes,weekDay,month,day,openSort,setOpenSort
}) {
    

    return (
        <div className="app-container">
            <div className="good-day-div"><h1 className="good-day">Good {whatTypeOfDay}, User!</h1>
            <h1>Current time is: {hours + ":" + minutes}</h1></div>
            <div className="quote-div"><h1 className="quote">Be so good no one can ignore you</h1></div>
            <div className="menu-div">
                <div className="current-date-div">
                    <p className="day">{weekDay}</p>
                    <p className="day-number">{day}</p>
                    <p className="month">{month}</p>
                </div>
                <div className="buttons">
                    <div className="button">
                        <img onClick={() => setOpenSort(!openSort)} className="icon sort" src="./src/assets/sort.png"></img>
                        <p>Sort by</p>
                    </div>
                    {openSort && <div className="dropdown-sort">
                        <ul>
                            <li className="sort-type" onClick={() => handleSort("all")}>All</li>
                            <li className="sort-type" onClick={() => handleSort("active")}>Active</li>
                            <li className="sort-type" onClick={() => handleSort("completed")}>Completed</li>
                        </ul>
                    </div>}
                </div>
            </div>

            <div className="all-todo-div">
            {renderTodo}
            </div>
            <div className="add-task-div">
                <img className="icon plus" src="./src/assets/plus.png" alt="" />
                <form onSubmit={handleSubmit} className="add-task-form"action="">
                    <input onChange={(e) => onChangeee(e)} type="text" className="add-task-input" placeholder="Add task" value={todoContent}/>
                </form>
            </div>
            
        </div>
    
    )
}

            
        //   <div className="todo" key={el.id}>
        //     {el.content.length <= 35 ? <p className="todo-content">{el.content}</p> : <p className="todo-content">{el.content.slice(0,35) + "..."}</p>}
        //     <img className="icon dots" src="./src/assets/dots.png"></img>
        //     <div className="hover-info">
        //       <p>Creation date: {el.date}</p>
        //     </div>
        //     <img onClick={() => handleTodoDelete(el.id)}className='icon x' src="./src/assets/x.png"></img>
        //   </div>