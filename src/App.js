    import { useState } from "react";
import "./App.css";

function App() {

    const [todo,setTodo] = useState("")
    const [error,setError] = useState({textarea:""})
    const [todos,setTodos] = useState([
        {
            id:1,
            desc:"Hey its google Man",
            date:new Date("September,07,21"),
            completed:true
        },
        {
            id:2,
            desc:"Hey its Rahul",
            date:new Date("September,08,21"),
            completed:false
        }
    ])

    let handleClick=({target:{name,value,type}})=>{
        setTodo(value)
        const regex=new RegExp(/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g);
        if(value.length<15  || value.length>20){
            setError({...error,textarea:"Use 15 to 20 limit words"})
        }
        else if(!regex.test(value)){
            setError({...error,textarea:"Use only Special Characters"})
        }
        else{
            setError({...error,textarea:""})
        }
    }

    let handleSubmit=(event)=>{
        event.preventDefault()
        let obj={
            decs:todo,
            date:new Date(),
            completed:false
        }
        setTodos([...todos,obj])
        setTodo("")
    }

    let changeState=(a)=>{
        a.completed = !a.completed
        setTodos([...todos])
    }

    return(
        <>
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label><h1>ToDossssss</h1></label>
                <textarea name="todo" value={todo} onChange={handleClick} rows="2"></textarea>
                <span>{error.textarea}</span>
                <div><button type="submit">Add</button></div>
            </form>
        </div>
        <div className="list">
            <h2>To-Do-List</h2>
            <div className="listItem">
                <ol>
                    {todos.map(a=>{
                        let btn;
                        if(a.completed)
                        btn = <i className="fas fa-check-circle tick"></i>
                        else
                        btn = <i className="fas fa-times-circle wrong"></i>
                        return <li key={a.desc.toString()}>
                            <span className="btn" onClick={()=>{changeState(a)}}>{btn}</span>
                            <span className="desc">{a.desc}</span>
                            <span className="date">{a.date.toDateString()}</span>
                        </li>
                    })}
                </ol>
            </div>
        </div>
        </>
    )
}

export default App;