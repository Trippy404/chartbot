import React, { useRef } from "react";

export default function ChatForm({ chatHistory,setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handeleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage) return;
    inputRef.current.value = "";

    //Update the chat history
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    //Add a "Thinking..." placeholder for bot's response
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking......" },
      ]);
      //Cll the function to generate bot's response
      generateBotResponse(...chatHistory,{ role: "user", text: userMessage });
    }, 600);

    
  };
  return (
    <form action="#" className="chat-form" onSubmit={handeleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
}
