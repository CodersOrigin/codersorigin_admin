import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UiPrac = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    language: '',
    thumbnail: null,
    figmaLink: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      };

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // POST request
      const response = await axios.post(
        process.env.REACT_APP_UIPRACTICE,
        formDataToSend,
        { headers }
      );
      toast.success('Data Submitted Successfully')

  
      setFormData({
        title: '',
        description: '',
        difficulty: '',
        language: '',
        thumbnail: null,
        figmaLink: '',
      });
    } catch (error) {
      toast.error('An Error Occured')
    }
  };

  return (
    <div className='uiprac'>
      <Header />

      <div className="interviewcon">
        <form onSubmit={handleSubmit}>
          <p className='atext'>UI Practice Upload</p>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
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
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
          />
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
          />
          <input
            type="text"
            name="figmaLink"
            placeholder="Figma Link"
            value={formData.figmaLink}
            onChange={handleChange}
          />
          <input className='btn' type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UiPrac;
