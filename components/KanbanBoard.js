"use client"

import { Droppable } from "@hello-pangea/dnd"
import TaskCard from "./TaskCard"

export default function KanbanBoard({ tasks, onTaskClick }) {
  // Define our columns
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "inreview", title: "In Review" },
    { id: "done", title: "Done" },
  ]

  // Filter tasks by status
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg text-gray-700">{column.title}</h2>
            <div className="mt-2 text-sm text-gray-500">{getTasksByStatus(column.id).length} tasks</div>
          </div>

          <Droppable droppableId={column.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="p-3 min-h-[500px]">
                {getTasksByStatus(column.id).map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} onClick={() => onTaskClick(task)} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  )
}
