import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
        <h1>Empowering Future Leaders!</h1>
        <img 
          src="https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-school-season-welcome-new-students-blackboard-hand-painted-image_12937.jpg" 
          alt="School Banner" 
          style={{ width: '100%', height: 'auto', marginTop: '16px' }} 
        />
      </header>
      <section id="courses">
        <h2>Featured Courses</h2>
        <div className="course-list grid-cols-3">
          <div className="course-item">
            <h3>Introduction to Programming</h3>
            <p>Learn the basics of programming using Python. Understand fundamental concepts and write your first code.</p>
          </div>
          <div className="course-item">
            <h3>Web Development</h3>
            <p>Build modern websites using HTML, CSS, and JavaScript. Create responsive and interactive web pages.</p>
          </div>
          <div className="course-item">
            <h3>Data Structures and Algorithms</h3>
            <p>Master data structures and algorithms. Enhance problem-solving skills and prepare for technical interviews.</p>
          </div>
        </div>
      </section>
      <section id="achievements">
        <h2>School Achievements</h2>
        <ul>
          <li>Achievement 1: Our students won the national coding competition.</li>
          <li>Achievement 2: Our school was ranked among the top 10 in the state for STEM education.</li>
        </ul>
      </section>
      <TestimonialsSlider />
      <footer className="footer">
        <p>&copy; 2025 . All rights reserved.</p>
        <p>
          <Link to="/">Home</Link> | 
          <Link to="/about">About</Link> | 
          <Link to="/courses">Courses</Link> | 
          <Link to="/contact">Contact</Link> | 
          <Link to="/admin">Admin</Link>
        </p>
      </footer>
    </div>
  );
};

const TestimonialsSlider = () => {
  const testimonials = [
    { id: 1, name: 'Ram', feedback: 'Great course!' },
    { id: 2, name: 'Hari', feedback: 'Learned a lot!' },
    { id: 3, name: 'Sita', feedback: 'Highly recommend!' },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [testimonials.length]);

  return (
    <div className="testimonials-slider">
      <h2>Student Testimonials</h2>
      <div className="testimonial">
        <p>"{testimonials[currentTestimonial].feedback}"</p>
        <p><strong>- {testimonials[currentTestimonial].name}</strong></p>
      </div>
    </div>
  );
};

export default Home;