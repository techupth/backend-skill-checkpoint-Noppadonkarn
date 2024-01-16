import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function CreateQuestionForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  const navigate = useNavigate()

  const createQuestion = async () => {
    await axios.post("http://localhost:4000/questions", {
      title,
      description,
      category,
    })
    navigate('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createQuestion();
  }

  return (
    <form className="flex flex-col border rounded-lg bg-white w-6/12 p-10 gap-16" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold">Crate Question</h1>
        <div>
          <span className="text-2xl font-semibold">Question :</span>
          <input type="text" value={title} placeholder="Your question.." className="ml-5 p-5 border rounded-md w-9/12 text-xl font-semibold" onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        <div>
          <span className="text-2xl font-semibold">Description :</span>
          <input type="text" value={description} placeholder="Your question.." className="ml-5 p-5 border rounded-md w-9/12 text-xl font-semibold" onChange={(e) => {setDescription(e.target.value)}}/>
        </div>
        <div className="input-container">
          <label htmlFor="category">
          <span className="text-2xl font-semibold">Category :</span>
            <select id="category" name="category" value={category} className="border h-16 ml-5 rounded-md text-2xl font-semibold w-9/12 text-center" onChange={(e) => {setCategory(e.target.value)}}>
              <option disabled value="">
              -- Select a category --
              </option>
              <option value="Software">Software</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Science">Science</option>
              <option value="Etc.">Etc.</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="border border-transparent rounded-lg w-36 bg-blue-400 h-16">
            <p className="text-2xl font-semibold text-white">Create</p>
          </button>
        </div>
    </form>  
  )
}

export default CreateQuestionForm;