// src/components/questions.js

import React from 'react'

const Questions = ({ questions }) => {
  return (
    <div>
      <center><h1>React Frontend --> Spring Boot API sample</h1></center>
      {questions.map((question) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{question.title}</h5>
            <p class="card-text">{question.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Questions