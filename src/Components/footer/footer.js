import React from 'react';
import '../footer/footer.css'
import { Link } from 'react-router-dom';
import { FiInstagram, FiGithub } from 'react-icons/fi'
import { RiLinkedinBoxLine } from 'react-icons/ri'
//CiLinkedin
export default function Footer() {
    return (
        <div className='footer-main'>
            <hr />
            <div> 
                <div className='social-btns'>
                      
                      <a href='https://www.instagram.com/angeluzj27/'><FiInstagram color='#525255' size={25} /></a> 
                       <a href='https://www.linkedin.com/in/est%C3%AAv%C3%A3o-a-11268910b/'> <RiLinkedinBoxLine color='#525255' size={30} /></a>
                      <a href='https://github.com/Angeluz20'>  <FiGithub color='#525255' size={25} /> </a>
                </div>
               

               
            </div>

                <span><p>Created by Angeluz</p></span>

        </div>
    );
}