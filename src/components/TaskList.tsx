import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function generatedIdRandom() {
    let idRandom = 0;
    let verify = true;

    while (verify) {

      idRandom = Math.floor(Math.random() * 1000);

      if (tasks.find(task => task.id == idRandom)) {
        verify = true;
      } else {
        verify = false;
      }

    }
    return idRandom;
  }

  function handleCreateNewTask() {
    /*
      Deve ser possível adicionar uma nova task no estado de tasks, 
      com os campos id que deve ser gerado de forma aleatória(random), 
      title que deve ser um texto e não permitir criar uma nova task caso o 
      título seja vazio e isComplete que deve iniciar como false.
    */

    const generateId = generatedIdRandom();

    if (newTaskTitle != '') {
      const newTaskCreate = {
        "id": generateId,
        "title": newTaskTitle,
        "isComplete": false
      };
      setTasks(state => [...state, newTaskCreate]);
      setNewTaskTitle('');
    }

  }

  function handleToggleTaskCompletion(id: number) {
    /*
      Deve alterar o status de isComplete(entre `true` ou `false`) 
      para uma task com um ID específico que é recebido por parâmetro. 
    */

      const newTaskComplete = tasks.map(task => task.id == id ? { 
        ...task, isComplete: !task.isComplete 
      } : task);

      setTasks(newTaskComplete);
  }

  function handleRemoveTask(id: number) {
    /*
      Deve receber um ID por parâmetro e remover a task que contém 
      esse ID do estado.
    */
    
    const newTaskRemove = tasks.filter(task => task.id != id);

    setTasks(newTaskRemove);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}