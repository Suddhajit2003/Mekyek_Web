import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  CheckSquare,
  Square,
  Calendar,
  Clock,
  Plus,
  User,
  Tag,
  Trash2
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  assignee: {
    name: string;
    avatar: string;
  };
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Update user documentation",
    description: "Review and update the user documentation with the latest features and changes.",
    dueDate: "2024-03-10",
    priority: "high",
    status: "todo",
    assignee: {
      name: "John Doe",
      avatar: ""
    }
  },
  {
    id: "2",
    title: "Fix navigation bug",
    description: "Investigate and fix the navigation issue reported in the mobile app.",
    dueDate: "2024-03-15",
    priority: "medium",
    status: "in-progress",
    assignee: {
      name: "Sarah Wilson",
      avatar: ""
    }
  }
];

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800"
};

export default function TaskTab() {
  const [selectedTask, setSelectedTask] = useState<string | null>("1");
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const selectedTaskData = mockTasks.find(
    (task) => task.id === selectedTask
  );

  return (
    <div className="flex h-full">
      {/* Task List */}
      <div className="w-1/2 border-r overflow-y-auto">
        <div className="p-4 border-b">
          <Button
            className="w-full"
            onClick={() => setShowNewTaskForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
        {mockTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 cursor-pointer hover:bg-accent ${
              selectedTask === task.id ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedTask(task.id)}
          >
            <div className="flex items-start gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="mt-0.5"
              >
                {task.status === "completed" ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5" />
                )}
              </Button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{task.title}</h3>
                  <Badge
                    className={`${priorityColors[task.priority]} capitalize`}
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {task.assignee.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Details */}
      <div className="flex-1 flex flex-col">
        {showNewTaskForm ? (
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <Input placeholder="Task title" />
              <textarea
                className="w-full h-24 p-2 border rounded-md resize-none"
                placeholder="Task description"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" aria-label="Due date" />
                <select 
                  className="border rounded-md p-2"
                  aria-label="Task priority"
                  title="Task priority"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <Input placeholder="Assignee" />
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowNewTaskForm(false)}
              >
                Cancel
              </Button>
              <Button>Create Task</Button>
            </div>
          </div>
        ) : selectedTaskData ? (
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                >
                  {selectedTaskData.status === "completed" ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </Button>
                <h2 className="text-xl font-semibold">
                  {selectedTaskData.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge
                  className={`${priorityColors[selectedTaskData.priority]} capitalize`}>
                  {selectedTaskData.priority}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {selectedTaskData.dueDate}
                </div>
              </div>
              <p className="text-muted-foreground">
                {selectedTaskData.description}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Assignee</p>
                    <p className="font-medium">{selectedTaskData.assignee.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{selectedTaskData.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a task to view details
          </div>
        )}
      </div>
    </div>
  );
}