import React, { useState, useEffect } from 'react';
import './admin.css'; 

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courseForm, setCourseForm] = useState({ title: '', description: '', category: '' });
  const [facultyForm, setFacultyForm] = useState({ name: '', designation: '', profileImage: '', email: '' });
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const [currentFacultyPage, setCurrentFacultyPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setCourses(data));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setFaculty(data));
  }, []);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm({ ...courseForm, [name]: value });
  };

  const handleFacultyChange = (e) => {
    const { name, value } = e.target;
    setFacultyForm({ ...facultyForm, [name]: value });
  };

  const addCourse = (course) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(newCourse => setCourses([...courses, newCourse]));
  };

  const addFaculty = (member) => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(member),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(newMember => setFaculty([...faculty, newMember]));
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    addCourse(courseForm);
    setCourseForm({ title: '', description: '', category: '' });
  };

  const handleFacultySubmit = (e) => {
    e.preventDefault();
    addFaculty(facultyForm);
    setFacultyForm({ name: '', designation: '', profileImage: '', email: '' });
  };

  
  const indexOfLastCourse = currentCoursePage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalCoursePages = Math.ceil(courses.length / itemsPerPage);

  const handleCoursePageChange = (pageNumber) => {
    setCurrentCoursePage(pageNumber);
  };

 
  const indexOfLastFaculty = currentFacultyPage * itemsPerPage;
  const indexOfFirstFaculty = indexOfLastFaculty - itemsPerPage;
  const currentFaculty = faculty.slice(indexOfFirstFaculty, indexOfLastFaculty);
  const totalFacultyPages = Math.ceil(faculty.length / itemsPerPage);

  const handleFacultyPageChange = (pageNumber) => {
    setCurrentFacultyPage(pageNumber);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Add Course</h2>
      <form onSubmit={handleCourseSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={courseForm.title}
          onChange={handleCourseChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={courseForm.description}
          onChange={handleCourseChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={courseForm.category}
          onChange={handleCourseChange}
          required
        />
        <button type="submit">Add Course</button>
      </form>
      <h2>Courses</h2>
      <div className="grid grid-cols-3">
        {currentCourses.map(course => (
          <div key={course.id} className="card">
            <div className="content">
              <h3>{course.title}</h3>
              <p>{course.body}</p>
              <p><strong>Category:</strong> {course.category}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalCoursePages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleCoursePageChange(index + 1)}
            className={currentCoursePage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <h2>Add Faculty Member</h2>
      <form onSubmit={handleFacultySubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={facultyForm.name}
          onChange={handleFacultyChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={facultyForm.designation}
          onChange={handleFacultyChange}
          required
        />
        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={facultyForm.profileImage}
          onChange={handleFacultyChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={facultyForm.email}
          onChange={handleFacultyChange}
          required
        />
        <button type="submit">Add Faculty Member</button>
      </form>
      <h2>Faculty Members</h2>
     
<div className="grid grid-cols-3">
  {currentFaculty.map(member => (
    <div key={member.id} className="card">
      <img
        src={member.profileImage || `https://i.pravatar.cc/150?img=${member.id}`}
        alt={member.name}
      />
      <div className="content">
        <h3>{member.name}</h3>
        <p>{member.designation || "Faculty Member"}</p>
        <p>{member.email}</p>
      </div>
    </div>
  ))}
</div>

      <div className="pagination">
        {Array.from({ length: totalFacultyPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleFacultyPageChange(index + 1)}
            className={currentFacultyPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Admin;