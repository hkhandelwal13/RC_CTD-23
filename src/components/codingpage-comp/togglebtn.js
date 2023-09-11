import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Submission from "../submission-comp/submission"
import "./tinymce.css"
import HtmlReactParser from 'html-react-parser'
const QuestionHubPage = (props) => {
  const [viewType, setViewType] = useState('question'); // Default to showing questions
  const qdata = localStorage.getItem('qdata');
  // console.log(qdata);
  return (

    <div>
      
      <div>
        <button onClick={() => setViewType('question')}  class="console-btn  btn-outline-dark">Question</button>
        <button onClick={() => setViewType('submissions')}  class="console-btn  btn-outline-dark">Submissions</button>
      </div>
      {viewType === 'question' ? <QuestionDetailSection QuesData={props.QuesData}/> : <SubmissionsSection questionId={props.QuesData.questionId} />}
    </div>
  );
};

const QuestionDetailSection = (props) => {
  // Your question detail section JSX
  return (
    <div className="question-sec">  
      {/* {QuesData.map((item) => (
        <Question key={question.questionId} questionData={question} />
      ))} */}
        <div className="que-name">  
          
          <h2> {props.QuesData.title} </h2>
          <h8>Points : {props.QuesData.points}</h8>

          
        </div>
        <div className="quepart que-description" style={{ height: "auto" }}>
          {/* <h4>Description</h4> */}
          {HtmlReactParser(String(props.QuesData.description))}
          
          <h6>Input Format</h6>
           {HtmlReactParser(String(props.QuesData.ipFormate))}


       <h6>Output Format</h6>
       {HtmlReactParser(String(props.QuesData.opFormate))}

       <h6>Sample Input-Output</h6>
       {HtmlReactParser(String(props.QuesData.inputOutputBlock))}
          
         
        
          <h6>Constraints</h6>
          {HtmlReactParser(String(props.QuesData.constraints))}
         

          <h6>Author</h6>
          <p>{props.QuesData.author}
          </p>

          
      </div>
      {/* <div className="iop">
        <div className="rc-input-output">
          <div className="inputrc">
            <h6>INPUT</h6>
            <textarea></textarea>
          </div>
          <div className="outputrc">
            <h6>OUTPUT</h6>
            <textarea className="inputs-output"></textarea>
          </div>
        </div>
        {"\n"}
        {"\n"}
  
        <div className="get-output">
          <button>GET OUTPUT</button>
        </div> 
      </div> */}


<div className="grid-container">
        <div className="grid-item">
            <h3>Input</h3>
         
        </div>
        <div className="grid-item">
            <h3>Output</h3>
            {/* <!-- Add your output content here --> */}
        </div>
    </div>
      
    </div>
  );
};

const SubmissionsSection = (props) => {
  // Your submissions section JSX
  return (
    <Submission questionId = {props.questionId}/>
  );
};

export default QuestionHubPage;
