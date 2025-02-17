import React, { useState, useEffect } from "react";
import "./about.css";

const About = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch faculty data");
        }
        const data = await response.json();
        setFaculty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="about-page">
      <h1>About Our School</h1>
      <p>
        Welcome to our institution, where we nurture young minds, foster
        innovation, and shape the future. Our school stands as a beacon of
        knowledge, providing quality education with a holistic approach.
      </p>

      {/* Mission & Vision Section */}
      <div className="mission-vision">
        <div className="vision">
          <h2>Our Vision</h2>
          <p>
            To be a world-class institution that inspires excellence, fosters
            creativity, and empowers students to become leaders of tomorrow.
          </p>
        </div>
        <div className="mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a transformative learning environment that
            promotes academic success, character development, and global
            citizenship. We strive to cultivate a culture of lifelong learning
            and innovation.
          </p>
        </div>
      </div>

      <h2>Faculty Members</h2>

      
      {loading ? (
        <p>Loading faculty members...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : faculty.length > 0 ? (
        <div className="grid grid-cols-3">
          {faculty.map((member) => (
            <div key={member.id} className="faculty-card">
              <img
                src={`https://i.pravatar.cc/150?img=${member.id}`} 
                alt={member.name}
              />
              <div className="content">
                <h3>{member.name}</h3>
                <p>{member.company.name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No faculty members found.</p>
      )}

      <h2>Additional Faculty Members</h2>
      <div className="faculty-list">
        {faculty.length > 0 ? (
          faculty.map((member) => (
            <div key={member.id} className="faculty-info">
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </div>
          ))
        ) : (
          <p>No additional faculty members available.</p>
        )}
      </div>
    </div>
  );
};

export default About;
