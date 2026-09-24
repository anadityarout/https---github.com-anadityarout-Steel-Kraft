import React from "react";
import "./NatureApplications.css";

import natureImage from "../../assets/nature-home.jpg";

import {
  FaHome,
  FaUmbrellaBeach,
  FaWarehouse,
  FaBriefcase,
  FaCity,
  FaArrowRight,
} from "react-icons/fa";

const NatureApplications = () => {
  const applications = [
    {
      title: "Residential",
      subtitle: "Homes",
      icon: <FaHome />,
    },
    {
      title: "Resort",
      subtitle: "Cottages",
      icon: <FaUmbrellaBeach />,
    },
    {
      title: "Farmhouses",
      subtitle: "",
      icon: <FaWarehouse />,
    },
    {
      title: "Holiday",
      subtitle: "Homes",
      icon: <FaHome />,
    },
    {
      title: "Office",
      subtitle: "Cabins",
      icon: <FaBriefcase />,
    },
    {
      title: "Commercial",
      subtitle: "Spaces",
      icon: <FaCity />,
    },
  ];

  return (
    <section className="nature-applications-section">

      <div className="nature-applications-container">

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className="nature-visual">

          <img
            src={natureImage}
            alt="Homes closer to nature"
            className="nature-visual-image"
          />

          <div className="nature-visual-overlay"></div>

          <div className="nature-visual-content">

            <span className="nature-visual-eyebrow">
              Live Better
            </span>

            <h2>
              Be Closer
              <br />
              to Nature
            </h2>

            <p>
              Where modern living meets breathtaking natural beauty.
            </p>

            <button className="nature-visual-btn" type="button">
              Discover More <FaArrowRight />
            </button>

          </div>

        </div>


        {/* =================================================
            CENTER APPLICATIONS
        ================================================= */}

        <div className="nature-applications">

          <div className="nature-applications-eyebrow">
            <span className="nature-eyebrow-line"></span>
            <span>Our Spaces</span>
            <span className="nature-eyebrow-line"></span>
          </div>

          <h2>
            Multiple Applications
          </h2>

          <div className="nature-application-grid">

            {applications.map((application, index) => (

              <div
                className="nature-application-item"
                key={index}
              >

                <div className="nature-application-icon">
                  {application.icon}
                </div>

                <div className="nature-application-title">
                  <span>
                    {application.title}
                  </span>

                  {application.subtitle && (
                    <span>
                      {application.subtitle}
                    </span>
                  )}
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =================================================
            RIGHT QUOTE
        ================================================= */}

        <div className="nature-quote">

          <span className="nature-quote-eyebrow">
            More Than Buildings
          </span>

          <blockquote>
            we create
            <br />
            experiences.
          </blockquote>

          <button className="nature-quote-btn" type="button">
            Let's Build Together <FaArrowRight />
          </button>

        </div>

      </div>

    </section>
  );
};

export default NatureApplications;
