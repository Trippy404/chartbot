import React from "react";
import  { useState } from "react";
import Chatboticon from "./components/Chatboticon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";


const App = () => {

  const [chatHistory , setChatHistory] = useState([]);
  const updatedHistory = chatHistory.map(({role, text})=>({role,parts:[{text}]}));


  const generateBotResponse =async (history)=>{
   const requtstOption = {
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({contents: history})
   }

   try{
    //Make the API call to
    const response = await fetch(import.meta.env.VITE_API_URL, requtstOption);
    const data = await response.json();
    if(!response.ok)throw new Error(data.message || "Something went wrong");
    console.log(data)
   }catch (error){
     console.log(error)
   }






  }
  return (
    <div className="container">
      <div className="chatbot-popup">
      {/* Chat bot header */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">Chat bot</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        {/* Chat bot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <Chatboticon/>
            <p className="message-text">Hi! I am Chat bot. How can I help you today?</p>
          </div>
        {/* Render the chat hostory dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}    />
          ))}
         
        </div>  


        {/* Chat bot footer */}
       <div className="chat-footer">
           <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
       </div>
      </div>
    </div>
  );
};

export default App;
