import {getTodos, toggleTodo, removeTodo} from './todos'
import {getFilters} from './filters'

const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const filters = getFilters()
    let filteredTodos =  getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodo = filteredTodos.filter((todo) => todo.completed === false)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodo))

  if(filteredTodos.length === 0){
    const messageEl = document.createElement('p')
    messageEl.classList.add('empty-message')
    messageEl.textContent = 'There are no to-dos to show'
    todoEl.appendChild(messageEl)
  }else{
  filteredTodos.forEach((todo) => {
    todoEl.appendChild(generateTodoDOM(todo))
  })
  }
  
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //Setup todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',() => {
        toggleTodo(todo.id)
        renderTodos()
    })

    //Setup todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)
        
    //Setup a remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button','button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',() => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

const generateSummaryDOM = (incompleteTodo) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = incompleteTodo.length === 1 ? 'todo' :'todos'
    summary.textContent = `You have ${incompleteTodo.length} ${plural} left`
    return summary
  }


export {generateSummaryDOM, generateTodoDOM, renderTodos}
// Make sure to set up the exports