import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Problem = () => {
  const [formData, setFormData] = useState({
    question: '',
    difficulty: '',
    tag: [],
    language: '',
    frequency: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(
        process.env.REACT_APP_PROBLEM,
        formData,
        { headers }
      );
     
  
      toast.success('Data Submitted Successfully')
      setFormData({
        question: '',
        difficulty: '',
        tag: [],
        language: '',
        frequency: '',
      });
    } catch (error) {
      toast.error('An Error Occured')
    }
  };
  

  return (
    <div className='interview'>
      <Header />

      <div className="interviewcon">
        <form onSubmit={handleSubmit}>
        <p className='atext'>Problem Solving Upload</p>
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={formData.question}
            onChange={handleChange}
          />
         
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">Choose an Option</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            type="text"
            name="tag"
            placeholder="Tags (comma-separated)"
            value={formData.tag.join(',')}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value.split(',') })}
          />
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Choose an Option</option>
            <option value="javascript">JavaScript</option>
            <option value="javascript">CSS</option>
            <option value="javascript">HTML</option>
       
          </select>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <option value="">Choose an Option</option>
            <option value="Frequently Asked">Frequently Asked</option>
            <option value="Rarely Asked">Rarely Asked</option>
            <option value="Rarely Asked">Mostly Asked</option>
          </select>
          <input className='btn' type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Problem;



