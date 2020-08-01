import React from "react";


export default function ContactSection(props) {
  const img = props.image;
  const [name,setName]= React.useState("");
  const [email,setEmail]= React.useState("");
  const [message,setMessage]= React.useState("");
  

  const handleName = (event) =>{
    setName(event.target.value)
  }
  const handleEmail = (event) =>{
    setEmail(event.target.value)
  }
  const handleMessage = (event) =>{
    setMessage(event.target.value)
  }
  const handleSubmit =() =>{
    if(name === "" || email === ""|| message === ""){
      alert("Please fill in all fields")
    }
    else{
      alert("Message Sent Successfully")
      window.location.replace("/");
    }
  }
  
  return (
    <div style={{backgroundImage: "url(" + img + ")",paddingTop:"30px",paddingBottom:"50px"}}>
      <div className="titleDiv">
        <h1 className="csTitle">Contact Us</h1>
        <p className="csDesc">We aim to reach you anytime and everywhere.. Your satisfaction is our mission.</p>
      </div>
      <form className="csForm">
        <input className="input" autoComplete="off" placeholder="Name" onChange={handleName}/>
        <input className="input" type="email" autoComplete="off" id="email" name="email" placeholder="Email" onChange={handleEmail}/>
        <textarea className="message" autoComplete="off" placeholder="Message" onChange={handleMessage}></textarea>
      </form>
      <button className="button bouncy" onClick={handleSubmit}>Send Message</button>
    </div>
  );
}