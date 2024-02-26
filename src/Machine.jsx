import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Machine = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirement: [],
    language: '',
    techStack: [],
    timeRequired: [],
    difficulty: '',
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
    } else if (name === 'requirement' || name === 'techStack' || name === 'timeRequired') {
      setFormData({
        ...formData,
        [name]: value.split(',').map(item => item.trim()),
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
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            formDataToSend.append(`${key}[${index}]`, item);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      // POST request
      const response = await axios.post(
        process.env.REACT_APP_MACHINE,
        formDataToSend,
        { headers }
      );
      toast.success('Data Submitted Successfully')
      
      setFormData({
        title: '',
        description: '',
        requirement: [],
        language: '',
        techStack: [],
        timeRequired: [],
        difficulty: '',
        thumbnail: null,
        figmaLink: '',
      });
    } catch (error) {
      toast.error('An Error Occured')
    }
  };

  return (
    <div className='machine'>
      <Header />

      <div className="interviewcon">
        <form onSubmit={handleSubmit}>
          <p className='atext'>Machine Learning Upload</p>
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
          <input
            type="text"
            name="requirement"
            placeholder="Requirements (comma-separated)"
            value={formData.requirement.join(',')}
            onChange={handleChange}
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
          />
          <input
            type="text"
            name="techStack"
            placeholder="Tech Stack (comma-separated)"
            value={formData.techStack.join(',')}
            onChange={handleChange}
          />
          <input
            type="text"
            name="timeRequired"
            placeholder="Time Required (comma-separated)"
            value={formData.timeRequired.join(',')}
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

export default Machine;
