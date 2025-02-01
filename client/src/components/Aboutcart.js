import React from 'react';
import Image from 'react-bootstrap/Image';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


function Aboutcart() {
  let message = ' hii every one how are you ';
  
  // Data for team members
  const teamMembers = [
    {
      imgSrc: require('../assets/five.jpg'),
      name: 'Inner Peace Portal',
      title: 'Head Of Manager',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptatum possimus cum nesciunt, suscipit maiores deleniti earum officiis minima accusantium quibusdam fugit voluptates, enim facilis magnam doloribus eos maxime ullam!',
    },
    // Add other team members here
    {
      imgSrc: require('../assets/five.jpg'),
      name: 'Inner Peace Portal',
      title: 'Head Of Manager',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptatum possimus cum nesciunt, suscipit maiores deleniti earum officiis minima accusantium quibusdam fugit voluptates, enim facilis magnam doloribus eos maxime ullam!',
    },
    {
      imgSrc: require('../assets/five.jpg'),
      name: 'Inner Peace Portal',
      title: 'Head Of Manager',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptatum possimus cum nesciunt, suscipit maiores deleniti earum officiis minima accusantium quibusdam fugit voluptates, enim facilis magnam doloribus eos maxime ullam!',
    },
    {
      imgSrc: require('../assets/five.jpg'),
      name: 'Inner Peace Portal',
      title: 'Head Of Manager',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptatum possimus cum nesciunt, suscipit maiores deleniti earum officiis minima accusantium quibusdam fugit voluptates, enim facilis magnam doloribus eos maxime ullam!',
    },
    {
      imgSrc: require('../assets/five.jpg'),
      name: 'Inner Peace Portal',
      title: 'Head Of Manager',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptatum possimus cum nesciunt, suscipit maiores deleniti earum officiis minima accusantium quibusdam fugit voluptates, enim facilis magnam doloribus eos maxime ullam!',
    },
  ];

  return (
    <>
      <section className="section-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="section-title">The team behind</h2>
              <p className="section-subtitle">{message}</p>
            </div>
          </div>
          <div className="row">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div className="col-sm-6 col-md-4" key={index}>
                <div className="team-item small-card">
                  <img src={member.imgSrc} alt="" className="team-img small-image" />
                  <h3>{member.name}</h3>
                  <div className="team-info">
                    <p>{member.title}</p>
                    <p>{member.description}</p>
                    <div className="team-icon">
                      <span>
                        <a href="www.facebook.com" className="me-4 text-reset text-white" aria-label="Facebook">
                          <FaFacebookF />
                        </a>
                      </span>
                      <span>
                        <a href="www.twitter.com" className="me-4 text-reset text-white" aria-label="Twitter">
                          <FaTwitter />
                        </a>
                      </span>
                      <span>
                        <a href="www.instagram.com" className="me-4 text-reset text-white" aria-label="Instagram">
                          <FaInstagram />
                        </a>
                      </span>
                      <span>
                        <a href="www.google.com" className="me-4 text-reset text-white" aria-label="Google">
                          <FaGoogle />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="row">
            {teamMembers.slice(3).map((member, index) => (
              <div className="col-sm-6 col-md-6" key={index}>
                <div className="team-item small-card">
                  <img src={member.imgSrc} alt="" className="team-img small-image" />
                  <h3>{member.name}</h3>
                  <div className="team-info">
                    <p>{member.title}</p>
                    <p>{member.description}</p>
                    <div className="team-icon">
                      <span>
                        <a href="#" className="me-4 text-reset text-white" aria-label="Facebook">
                          <FaFacebookF />
                        </a>
                      </span>
                      <span>
                        <a href="#" className="me-4 text-reset text-white" aria-label="Twitter">
                          <FaTwitter />
                        </a>
                      </span>
                      <span>
                        <a href="#" className="me-4 text-reset text-white" aria-label="Instagram">
                          <FaInstagram />
                        </a>
                      </span>
                      <span>
                        <a href="#" className="me-4 text-reset text-white" aria-label="Google">
                          <FaGoogle />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutcart;
