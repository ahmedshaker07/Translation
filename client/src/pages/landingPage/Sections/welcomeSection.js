import React from "react"
import Animate from 'animate.css-react'

export default function WelcomeSection(){
    return(
        <div className="wsMain">            
            <div className="container">
            <Animate appear="fadeInLeft">
                <h1 className="title">Your Story Starts With Us.</h1>
                <h4 > All your translation needs, anywhere, anytime!</h4>
            </Animate>
            </div>
        </div>
    )
}
