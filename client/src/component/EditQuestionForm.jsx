import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function EditQuestionForm() {
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')

  const createQuestion = async () => {
    await axios.post("http://localhost:4001/questions"), {
    }
  }

  
}

export default EditQuestionForm;