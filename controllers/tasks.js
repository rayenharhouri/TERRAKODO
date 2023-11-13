import Task from "../models/tasks.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

/*************************** ADD TASK ***************************/
export async function addTask(req, res) {
  try {
    const { title, description, priority,dueDate } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "VerySecret");
    const userId = decodedToken.id;

    const user = await UserModel.findById(userId);

    if (!(title && description && priority && dueDate)) {
      res.status(400).json({ message: "All Fields are required" });
    }
    const task = await Task.create({
      title,
      description,
      priority,
      owner: userId,
      dueDate,
    });
    user.tasks.push(task);
    user.save();
    res.status(201).json({ task: task });
  } catch (err) {
    console.log(err);
  }
}
/*************************** UPDATE TASK ***************************/
export async function updateTask(req, res) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

/*************************** DELETE TASK ***************************/
export async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: " Task not found" });
    }
    res.status(204).json({ message: " Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

/*************************** Update TASK Status ***************************/
export async function updateTaskStatus(req, res) {
  try {
    const newStatus = req.body.status;
    const taskId = req.params.id;
    if (!(taskId && newStatus)) {
      return res
        .status(400)
        .json({ message: "Task ID and new status are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(403).json({ message: "Task not found" });
    }
    res.status(200).json({ task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/*************************** Get All TASKS ***************************/
export async function getTasksByUser(req, res) {
  try {

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "VerySecret");
    const userId = decodedToken.id;
    console.log(userId);

    const tasks = await Task.find({ owner : userId });

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
/*************************** Get TASK BY ID ***************************/
export async function getTaskById(req,res) {
  let id = await req.body.id
  if(!id) res.send({message: "id is required"})
  else res.send({ task: await Task.findOne({id}) })
}