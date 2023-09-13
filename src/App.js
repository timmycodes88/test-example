import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([
    {
      id: 0,
      done: false,
      content: 'Hello, World',
      createdAt: Date.now(),
    },
  ])

  const addTodo = () => {
    if (!text) return
    const newTodo = {
      id: todos.length,
      done: false,
      content: text,
      createdAt: Date.now(),
    }
    setTodos([...todos, newTodo])
    setText('')
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        }
        return todo
      })
    )
  }

  return (
    <div className='flex flex-col gap-4 p-20'>
      <input type='text' value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => addTodo()}>Add Todo</button>
      {todos.map(({ id, done, content, createdAt }) => (
        <Todo
          key={id}
          id={id}
          done={done}
          content={content}
          createdAt={createdAt}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
      ))}
    </div>
  )
}

const Todo = ({ id, done, content, createdAt, onDeleteTodo, onToggleTodo }) => {
  return (
    <div className='flex gap-2 bg-gray-900 text-white rounded-lg p-2 w-[30rem]'>
      <input type='checkbox' checked={done} onClick={() => onToggleTodo(id)} />
      <span>{content}</span>
      <button className='ml-auto' onClick={() => onDeleteTodo(id)}>
        Delete
      </button>
    </div>
  )
}

// Todo Component
