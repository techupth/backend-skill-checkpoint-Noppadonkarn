import './App.css'
import Homepage from './page/homepage'
import CreateQuestionPage from './page/CreateQuestionpage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/question/create' element={<CreateQuestionPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
