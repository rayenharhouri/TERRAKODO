import Task from "../models/tasks.js";   


/*************************** ADD TASK ***************************/
export async function addTask(req, res) {
  try {
    const { title, description, priority } = req.body;
    if (!(title && description && priority)) {
      res.status(400).json({ message: "All Fields are required" });
    }
      const task = await Task.create({
        title,
        description,
        priority,
      });
      res.status(201).json({ task: task });
  } catch (err) {
    console.log(err);
  }
}
/*************************** UPDATE TASK ***************************/
export async function updateTask(req, res) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }



/*************************** DELETE TASK ***************************/
export async function deleteTask(req, res) {
    try {
      const deletedTask = await Task.findByIdAndRemove(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({ message: ' Task not found' });
      }
      res.status(204).json({ message: ' Task Deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }


