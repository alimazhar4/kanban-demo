"use client"

import { Draggable } from "@hello-pangea/dnd"

export default function TaskCard({ task, index, onClick }) {
  // Function to determine priority badge color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className="bg-white border rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>{task.priority}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                {task.assignee
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
              <span className="ml-2 text-xs text-gray-500">{task.assignee}</span>
            </div>
            <span className="text-xs text-gray-500">{task.dueDate}</span>
          </div>
        </div>
      )}
    </Draggable>
  )
}
