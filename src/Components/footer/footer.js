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
                      <FiInstagram color='#525255' size={25} />
                      <RiLinkedinBoxLine color='#525255' size={30} />
                      <FiGithub color='#525255' size={25} />
                </div>
               

               
            </div>

                <span><p>Created by Angeluz</p></span>

        </div>
    );
}