"use client"

export default function TaskModal({ task, onClose }) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
              <div className="text-sm font-medium">
                {task.status === "todo" && "To Do"}
                {task.status === "inprogress" && "In Progress"}
                {task.status === "inreview" && "In Review"}
                {task.status === "done" && "Done"}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Assignee</h3>
              <div className="text-sm font-medium">{task.assignee}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
          </div>

          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Subtasks</h3>
              <ul className="list-disc pl-5 space-y-1">
                {task.subtasks.map((subtask, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        readOnly
                        className="mr-2 h-4 w-4 text-blue-600 rounded"
                      />
                      <span className={subtask.completed ? "line-through text-gray-500" : ""}>{subtask.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
              <div className="text-sm font-medium">{task.dueDate}</div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
              <div className="text-sm font-medium">{task.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
