import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import githubImage from "../image/icons8-github-96.png"
import linkedinImage from "../image/icons8-linkedin-128.png"
import facebookImage from "../image/icons8-facebook-100.png"
import instagramImage from "../image/icons8-instagram-96.png"

function Homepage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(9);
  const [questions, setQuestions] = useState([])
  const [questionText, setQuestionText] = useState('')
  const [comment, setComment] = useState(0)
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const categorys = ["Food", "Travel", "Software", "Science", "Etc."]
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const getQuestion = async () => {
      try{
        setIsError(false)
        setIsLoading(true)
        const result = await axios("http://localhost:4000/questions")
        setQuestions(result.data.data)
        setIsLoading(false)
      }catch(error) {
        setIsError(true)
        setIsLoading(true)
      }
  }

  const getQuestionInput = async () => {
    const checkCategory = questionText.includes(categorys)

    if(!checkCategory) {
      try{
        setIsError(false)
        setIsLoading(true)
        const result = await axios(`http://localhost:4000/questions?title=${questionText}`)
        setQuestions(result.data.data)
        setIsLoading(false)
      }catch(error) {
        setIsError(true)
        setIsLoading(true)
      }
    } else {
      try{
        setIsError(false)
        setIsLoading(true)
        const result = await axios(`http://localhost:4000/questions?category=${questionText}`)
        setQuestions(result.data.data)
        setIsLoading(false)
      }catch(error) {
        setIsError(true)
        setIsLoading(true)
      }
    }
  }

  const handleChange = (event) =>{
    setQuestionText(event)
  }


  const deleteQuestion = async (questionId) => {
    await axios.delete(`http://localhost:4000/questions/${questionId}`);
    const newQuestions = questions.filter((question) => question._id !== questionId);
    setQuestions(newQuestions)
  }

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect (() => {
    getQuestionInput();
  }, [questionText])

  return (
    <div className="w-screen h-full md:h-screen justify-between flex flex-col gap-10 bg-gray-200">
      <div>
        <div className="flex justify-between items-center px-5 py-5 bg-white h-16">
          <h1 className="text-3xl tracking-[10px]  text-gray-600 w-5/12">Question</h1>
          <div className="flex gap-16 w-2/12 justify-center">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <h2 href='' className="text-xl text-gray-300 hover:text-gray-500 hover:underline">Home</h2>
            </div> 
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <h2 href='' className="text-xl text-gray-300 hover:text-gray-500 hover:underline">Edit</h2>
            </div> 
            <div className="cursor-pointer" onClick={() => navigate('question/create')}>
              <h2 href='' className="text-xl text-gray-300 hover:text-gray-500 hover:underline">Contact</h2>
            </div>    
          </div>
          <div className="flex gap-5 items-center w-5/12 justify-end"> 
            <button className="border rounded-xl px-4 py-1 border-transparent bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500" onClick={() => navigate('question/create')}>
              + Question
            </button> 
            <svg xmlns="http://www.w3.org/2000/svg" width='45' viewBox="0 0 16 16" id="user" className="cursor-pointer"><path fill="#231f20" d="M7.763 2A6.77 6.77 0 0 0 1 8.763c0 1.807.703 3.505 1.98 4.782a6.718 6.718 0 0 0 4.783 1.981 6.77 6.77 0 0 0 6.763-6.763A6.77 6.77 0 0 0 7.763 2ZM3.675 13.501a5.094 5.094 0 0 1 3.958-1.989c.024.001.047.007.071.007h.023c.022 0 .042-.006.064-.007a5.087 5.087 0 0 1 3.992 2.046 6.226 6.226 0 0 1-4.02 1.468 6.212 6.212 0 0 1-4.088-1.525zm4.032-2.494c-.025 0-.049.004-.074.005a2.243 2.243 0 0 1-2.167-2.255 2.246 2.246 0 0 1 2.262-2.238 2.246 2.246 0 0 1 2.238 2.262c0 1.212-.97 2.197-2.174 2.232-.028-.001-.056-.006-.085-.006Zm4.447 2.215a5.594 5.594 0 0 0-3.116-2.052 2.749 2.749 0 0 0 1.428-2.412A2.747 2.747 0 0 0 7.704 6.02a2.747 2.747 0 0 0-2.738 2.762 2.73 2.73 0 0 0 1.422 2.386 5.602 5.602 0 0 0-3.081 1.995 6.22 6.22 0 0 1-1.806-4.398 6.27 6.27 0 0 1 6.263-6.263 6.27 6.27 0 0 1 6.263 6.263 6.247 6.247 0 0 1-1.873 4.457z"></path></svg>
          </div>  
        </div>
        <div className="w-screen border border-gray-400"></div>
        <div className="flex flex-col w-screen justify-center gap-10 p-5">
        <div className="flex justify-between items-center">
          <div className="relative border rounded-xl h-6">
            <div className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width='35' viewBox="0 0 50 50" id="search"><path fill="#231F20" d="M20.745 32.62c2.883 0 5.606-1.022 7.773-2.881L39.052 40.3a.996.996 0 0 0 1.414.002 1 1 0 0 0 .002-1.414L29.925 28.319c3.947-4.714 3.717-11.773-.705-16.205-2.264-2.27-5.274-3.52-8.476-3.52s-6.212 1.25-8.476 3.52c-4.671 4.683-4.671 12.304 0 16.987a11.9 11.9 0 0 0 8.477 3.519zm-7.06-19.094c1.886-1.891 4.393-2.932 7.06-2.932s5.174 1.041 7.06 2.932c3.895 3.905 3.895 10.258 0 14.163-1.886 1.891-4.393 2.932-7.06 2.932s-5.174-1.041-7.06-2.932c-3.894-3.905-3.894-10.258 0-14.163z"></path></svg>
            </div>
            <input type="text" placeholder="Search your question..." className="h-10 rounded-xl w-96 pl-10" onChange={(e) => {handleChange(e.target.value)}}/>
          </div> 
          <button className="border rounded-md bg-white w-48 h-10 mt-5 hover:bg-orange-500 hover:text-white">
            <p className="text-xl">Filter</p>
          </button>        
        </div>
        <div className="flex flex-wrap gap-5 ">
          {
          currentQuestions.map((question) => {
            return (
              <div className="flex flex-col justify-between gap-12 border rounded-lg w-[500px] h-[300px] p-10 bg-white relative shadow-2xl" key={question._id}>
                <div className="absolute top-[10px] end-[15px]">
                  <button className="w-7 text-xl font-semibold rounded-[50%] hover:bg-red-400 hover:text-white" onClick={() => {deleteQuestion(question._id)}}>X</button>
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="text-3xl font-semibold text-gray-700">Q: {question.title}</h2>
                  <div className="flex gap-5 items-center">
                    <p>Category</p>
                    <div className={`border rounded-lg p-2 text-white ${question.category === 'Travel' ? 'bg-green-400' : question.category === 'Software' ? 'bg-red-400' : question.category === 'Food' ? 'bg-blue-400': question.category === 'Science' ? 'bg-yellow-400' : 'bg-orange-400'}`}>
                      {question.category}
                    </div>
                  </div>
                </div>    
                <div className="flex justify-between items-center">
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width='35' viewBox="0 0 32 32" id="comment"><path fill="#231F20" d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"></path></svg>
                      <p className="text-2xl text-gray-700">{comment}</p>
                    </div>
                    <div className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width='35' viewBox="0 0 64 64" id="eye" onClick={() => setShowDetail (true)}><path d="M32 44c6.6 0 12-5.4 12-12s-5.4-12-12-12-12 5.4-12 12 5.4 12 12 12zm0-20c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z"></path><path d="M32 51c10.6 0 20.4-8.8 25.4-14 2.6-2.8 2.6-7.1 0-9.9C52.4 21.8 42.6 13 32 13S11.6 21.8 6.6 27C4 29.8 4 34.2 6.6 37c5 5.2 14.8 14 25.4 14zM9.6 29.8C14 25 22.9 17 32 17s18 8 22.4 12.8c1.2 1.2 1.2 3.2 0 4.4C50 39 41.1 47 32 47S14 39 9.6 34.2c-1.2-1.2-1.2-3.2 0-4.4z"></path><circle cx="32" cy="32" r="4"></circle></svg>
                    </div>
                  </div>  
                  <button>Answer</button>     
                </div>   
              </div>
            )
          })
        }
        </div>
      </div> 
      <div className="w-screen flex justify-center items-center gap-5 text-2xl pt-16">
        {Array.from({ length: Math.ceil(questions.length / questionsPerPage) }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className="pagination-button">
            {index + 1}
          </button>
        ))}
      </div> 
      </div>   
      <div className="w-screen h-16 bg-gray-500">
        <div className="w-screen flex justify-between px-5 py-3">
          <h1 className="text-3xl tracking-[10px]  text-white">Noppadon</h1>
          <div className="flex items-center gap-[15px]">
          <a href="https://github.com/Noppadonkarn/" target="_blank" rel="noopener noreferrer">
            <img src={githubImage} className="w-[25px] h-[25px]" />
          </a>
          <a href="https://www.linkedin.com/in/noppadon-sangthong-68b590285/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinImage} className="w-[30px] h-[30px]" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100049151163223" target="_blank" rel="noopener noreferrer">
            <img src={facebookImage} className="w-[30px] h-[30px]" />
          </a>
          <a href="https://www.instagram.com/_karun.karn/" target="_blank" rel="noopener noreferrer">
            <img src={instagramImage} className="w-[25px] h-[25px]" />
          </a>
        </div>
        </div> 
      </div> 
    </div>
  )
}

export default Homepage;