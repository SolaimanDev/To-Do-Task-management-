<?php

namespace App\Http\Controllers\Admin;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function index(Request $request) {
        return $request->user()->tasks;
    }

    public function store(Request $request) {
        $request->validate(['title' => 'required', 'body' => 'required','is_completed' => 'nullable|boolean', ]);

        return $request->user()->tasks()->create($request->only('title', 'body','is_completed'));
    }

    public function show(Task $task) {
        // $this->authorize('view', $task);
        return $task;
    }

    public function update(Request $request, Task $task) {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            // 'is_completed' => 'nullable|boolean', 
        ]);
    

        if ($request->user()->id !== $task->user_id) {
            abort(403, 'Unauthorized action.'); // Return a 403 Forbidden error
        }
        // $task->update($request->only('title', 'body'));
        $task->update([
            'title' => $request->title,
            'body' => $request->body,
           // 'is_completed' => $request->is_completed,
        ]);
        
        return response()->json($task);
    }

    public function destroy(Task $task) {
       // $this->authorize('delete', $task);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    public function markComplete(Task $task, Request $request)
    {
        // Toggle the completion status of the task
        $task->is_completed = !$task->is_completed;  // Toggle between true/false
        $task->save();

        // Return the updated task as JSON
        return response()->json($task);
    }
  
}
