import React from "react";

const About = () => (
  <div className="about-page">
    <h2>About This Application</h2>
    <p>
      This Task Manager is a React single-page application that demonstrates:
    </p>
    <ul>
      <li>Rendering lists with keys</li>
      <li>React Router for multi-page navigation</li>
      <li>Error boundaries for stability</li>
      <li>React Portals for modal UI</li>
      <li>Responsive styling across devices</li>
    </ul>
    <p>
      Data persists locally in <code>localStorage</code> so tasks remain when you
      refresh the page.
    </p>
  </div>
);

export default About;
