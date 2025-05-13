"use client"

import { useState } from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import KanbanBoard from "@/components/KanbanBoard"
import TaskModal from "@/components/TaskModal"
import { tasks as initialTasks } from "@/utils/data"

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Create a copy of the tasks
    const newTasks = [...tasks]

    // Find the task that was dragged
    const draggedTask = newTasks.find((task) => task.id === draggableId)

    // Update its status based on the destination column
    draggedTask.status = destination.droppableId

    // Update the state
    setTasks(newTasks)
  }

  const openTaskModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const closeTaskModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Kanban Board</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <KanbanBoard tasks={tasks} onTaskClick={openTaskModal} />
        </DragDropContext>

        {isModalOpen && selectedTask && <TaskModal task={selectedTask} onClose={closeTaskModal} />}
      </div>
    </main>
  )
}
