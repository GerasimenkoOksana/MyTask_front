import React from "react";
import {Carousel} from "react-bootstrap";
import image1 from "../images/image1.jpg"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.png"

export default function Slider(){
    return(
        <Carousel>
           <Carousel.Item style={{'height':'80vh'}}>
                <img className="d-block w-100" src = {image3} alt="first slide" />
               <Carousel.Caption className="txtCarouselBottom">
                   <h2>MyTasks helps to effectively solve work tasks </h2>
                   <h4>Plan, manage and take productivity to the next level in your own unique way with MyTasks</h4>
               </Carousel.Caption>
           </Carousel.Item>
            <Carousel.Item style={{'height':'80vh'}}>
                <img className="d-block w-100" src = {image1} alt="first slide" />
                <Carousel.Caption className="txtCarousel">
                    <h2>MyTasks helps to effectively solve work tasks </h2>
                    <h4>Plan, manage and take productivity to the next level in your own unique way with MyTasks</h4>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{'height':'80vh'}}>
                <img className="d-block w-100" src = {image2} alt="first slide" />
                <Carousel.Caption className="txtCarousel">
                    <h2>MyTasks helps to effectively solve work tasks </h2>
                    <h4>Plan, manage and take productivity to the next level in your own unique way with MyTasks</h4>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    )
}