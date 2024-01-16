import { ObjectId } from "mongodb";
import { Router } from "express";

import { db } from "../utils/db.js"

const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  const title = req.query.title
  const category = req.query.category

  const query = {};

  if (title) {
    query.title = new RegExp(title, "i")
  }

  if (category) {
    query.category = new RegExp(category, "i");
  }

  const collection = db.collection("questions")
  
  try{
    const questions = await collection.find(query).limit(10).toArray()
    return res.json({
      data : questions
    })
  } catch {
    return res.status(500).json({
      message: 'Cannot connect to data from DB'
    })
  }
    
})


questionRouter.get("/:questionId", async(req, res) => {
  const collection = db.collection("questions")
  const questionId = new ObjectId(req.params.questionId) 
  
  const question =  collection.findOne({_id: questionId})

  if (!question) {
    return res.status(404).json({
      message: 'No question to show'
    })
  }

  try{
    const questions =  await collection.find({_id: questionId}).toArray();
    return res.json({
      data: questions
    })
  }catch {
    return res.status(500).json({
      message: 'Cannot connect to data fron DB'
    })
  }

})

questionRouter.post("/", async (req, res) => {
  const collection = db.collection("questions")
  const questionData = {...req.body};
  

  try{
    await collection.insertOne(questionData)
  }catch {
    return res.status(500).json({
      message: 'Cannot connect to data'
    })
  }

  return res.json ({
    message: `Question has been created successfully`
  })
})

questionRouter.put("/:questionId", async (req, res) => {
  const collection = db.collection("questions")
  const questionId = new ObjectId(req.params.questionId)
  const newQuestionData = {...req.body}
  const question = await collection.findOne({_id: questionId})

  if (!question) {
    return res.status(404).json({
      message: 'No question to edit'
    })
  }

  try{
    await collection.updateOne({
      _id: questionId,
    },{
      $set: newQuestionData,
    })  
  }catch {
    return res.status(500).json({
      message: 'Cannot edit document because DB failed'
    })
  }

  return res.json({
    message : 'Question has been update successfully'
  })
})


questionRouter.delete("/:questionId", async (req, res) => {
  const collection = db.collection("questions")
  const questionId = new ObjectId(req.params.questionId)

  const question = await collection.findOne({_id: questionId})

  if(!question) {
    return res.status(404).json({
      message: 'No question to delete'
    })
  }

    try{
      await collection.deleteOne({
        _id: questionId,
      })     
    } catch {
      return res.status(500).json({
        message: 'Cannot delete document because DB failed'
      })
    }
    
    return res.json({
      message: 'Question has been delete successfully'
    })
})


export default questionRouter ;