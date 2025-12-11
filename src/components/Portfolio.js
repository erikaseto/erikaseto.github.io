import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ResumeItem from "./ResumeItem";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import bgImage from '../spirograph-pattern-drawing-backgrounds-textures-a17aa5-1024.webp';


export default function Portfolio() {
  const [bgColor, setBgColor] = useState("#6495ED"); 
  const [navColor, setNavColor] = useState("#6495ED");
  const [isPastExperience, setIsPastExperience] = useState(false);
  const sectionsRef = useRef({});
  const sectionIds = ["About", "Work Experience", "Contact"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = ([r, g, b]) =>
    `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;

  const interpolateColor = (color1, color2, factor) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
    return rgbToHex(result);
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false, offset: 100 });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const viewportBottom = scrollY + windowHeight;

      const snapshotEl = sectionsRef.current["snapshot"];
      const snapshotBottom = snapshotEl ? snapshotEl.offsetTop + snapshotEl.offsetHeight : 0;

      const contactTop = sectionsRef.current["contact"]?.offsetTop ?? 0;

      if (viewportBottom < snapshotBottom) {
        // While snapshot section is still visible
        setBgColor("#6495ED");
        setNavColor("#6495ED");
        setIsPastExperience(false);
      } else {
        // After snapshot section passed: transition solid background colors
        setIsPastExperience(viewportBottom >= contactTop);

        const aboutTop = sectionsRef.current["about"]?.offsetTop ?? 0;

        if (viewportBottom < aboutTop) {
          setBgColor("#6495ED");
          setNavColor("#6495ED");
        } else if (viewportBottom < contactTop) {
          const factor = Math.min(
            1,
            (viewportBottom - aboutTop) / (contactTop - aboutTop)
          );
          const bg = interpolateColor("#6495ED", "#CCCCFF", factor);
          setBgColor(bg);

          const navCol = interpolateColor("#6495ED", "#CCCCFF", factor);
          setNavColor(navCol);
        } else {
          setBgColor("#CCCCFF");
          setNavColor("#CCCCFF");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSnapshotEnd = () => {
    const snapshot = sectionsRef.current["snapshot"];
    if (snapshot) {
      const offset = snapshot.offsetTop + snapshot.offsetHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const scrollToSection = (id) => {
      const idMap = {
    "about": "about",
    "work experience": "experience",  // maps nav label to internal id
    "contact": "contact"
  };

  const section = sectionsRef.current[idMap[id.toLowerCase()]];
  if (section) {
    const offsetTop = section.offsetTop - 70;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
};

  const experiences = [
    {
      title: "District Support Pharmacist",
      company: "CVS Pharmacy",
      startDate: "November 2022",
      endDate: "October 2023",
      details: [
       "Trained new technicians and interns on system workflows, prescription fulfillment procedures, and inventory management processes.", 
       "Adapted quickly to different pharmacy locations, integrating into new teams and workflows, and resolving inherited tasks to maintain smooth operations and regulatory compliance.", 
       "Administered and documented immunizations during high-volume vaccination events, ensuring precise clinical documentation and adherence to record-keeping standards.",
      ],
    },
    {
      title: "Staff Pharmacist",
      company: "Walgreens",
      startDate: "February 2022",
      endDate: "November 2022",
      details: [
        "Reviewed medication profiles for potential drug interactions and therapy conflicts, coordinating with prescribers to ensure clinically appropriate treatment plans.",
        "Educated patients on proper medication use, safety considerations, and adherence strategies while maintaining compliance with HIPAA.", 
        "Supervised 2 pharmacy technicians and oversaw fulfillment of 1,400+ prescriptions weekly while ensuring operational efficiency and regulatory compliance."
      ],
    },
    {
      title: "Pharmacy Intern",
      company: "CVS Pharmacy",
      startDate: "September 2017",
      endDate: "May 2021",
      details: [
       "Conducted 200+ weekly patient care calls to strengthen patient relationships, improve medication adherence, and proactively address compliance risks.", 
       "Delivered high-quality customer support in a fast-paced environment, managing high call volumes and resolving patient inquiries efficiently.", 
       "Resolved third-party payer rejections and facilitated prescription transfers to ensure timely medication access and continuity of care."
      ],
    },
    {
      title: "Pharmacy Technician",
      company: "CVS Pharmacy",
      startDate: "March 2017",
      endDate: "September 2017",
      details: [
      ],
    }
  ];



  return (
    <>
      {/* Full page background with dynamic bgColor */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 transition-all duration-300 ease-linear"
        style={{ background: bgColor }}
      />

      {/* Header with navigation */}
      <header className="bg-white shadow-md py-6 sticky top-0 z-30 w-full">
        <div className="max-w-6xl mx-auto flex justify-end items-center px-4">
      
      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6">
        {sectionIds.map((id) =>
          id.toLowerCase() === "about" ? (
            <button
              key={id}
              onClick={scrollToSnapshotEnd}
              className="hover:underline capitalize transition-colors duration-300"
              style={{ color: navColor }}
            >
              {id}
            </button>
          ) : (
            <button
              key={id}
              onClick={() => scrollToSection(id.toLowerCase())}
              className="hover:underline capitalize transition-colors duration-300"
              style={{ color: navColor }}
            >
              {id}
            </button>
          )
        )}
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl text-black focus:outline-none"
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="flex flex-col space-y-2 p-4">
              {sectionIds.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (id.toLowerCase() === "about") scrollToSnapshotEnd();
                      else scrollToSection(id.toLowerCase());
                    }}
                    className="block w-full text-left text-gray-800 hover:text-blue-500"
                  >
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 min-h-screen text-gray-900 font-sans max-w-6xl mx-auto">
        {/* Snapshot section: transparent background*/}
        <section
          id="snapshot"
          ref={(el) => (sectionsRef.current["snapshot"] = el)}
          className="relative w-full h-screen flex flex-col justify-center items-center px-4"
          style={{ backgroundColor: "transparent" }}
        >
          <img
            src={bgImage}
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg text-center">
            Erika Seto, PharmD, RPh
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md text-center">
            Software Development Student
          </p>
        </section>

        {/* About section */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current["about"] = el)}
          data-aos="fade-up"
          className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"

        >
          <h2 className="text-4xl font-semibold mb-4">About Me</h2>
          <p className="text-lg text-left mb-6">
            I’m a licensed pharmacist and emerging software developer with experience in fast-paced healthcare environments, 
            where I gained firsthand insight into the importance of efficient systems, accurate data, and 
            user-centered design for achieving reliable and effective outcomes. I’m currently completing a Master’s 
            in Software Development, where I’ve gained hands-on experience with Python, SQL, data structures, 
            and system design.
            </p>
            <p className="text-lg text-left">
            I am driven by the goal of developing software and systems that empower users, helping them achieve their 
            goals more efficiently, confidently, and effectively. By combining my clinical background with technical 
            skills, I strive to design solutions that solve real-world problems, improve outcomes, and create 
            meaningful impact.
          </p>
        </section>

        {/* Experience section */}
        <section
          id="experience"
          ref={(el) => (sectionsRef.current["experience"] = el)}
          data-aos="fade-up"
          className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"
        >
          <h2 className="text-4xl font-semibold mb-16 text-center">Work Experience</h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical timeline line */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 z-0 transition-colors duration-500"
              style={{ backgroundColor: navColor }}
            />

            {experiences.map((item, idx) => {
              const index = idx + 1;
              const isLeft = index % 2 === 1;

              return (
                <div
                  key={index}
                  className="relative w-full mb-8 md:mb-10"
                  style={{ minHeight: "8rem" }}
                >
                  {/* Timeline Dot */}
            <div
              className="hidden md:block absolute left-1/2 w-6 h-6 border-2 border-white rounded-full z-10"
              style={{
                top: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: navColor,
              }}
            />

            {/* Card + arrow container */}
            <div
              className={`
                flex flex-col md:flex-row items-center gap-4
                w-full md:w-1/2 md:max-w-3xl
                px-4 md:px-6
                ${isLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"}
              `}
            >

            {/* Left-side arrow for right-side card */}
            {!isLeft && (
              <div className="hidden md:flex items-center">
                <div
                  className="w-0 h-0 border-y-[12px] border-y-transparent border-r-[12px]"
                  style={{ borderRightColor: navColor }}
                />
              </div>
            )}

            {/* Card itself */}
            <ResumeItem
              index={index}
              title={item.title}
              company={item.company}
              startDate={item.startDate}
              endDate={item.endDate}
              details={item.details}
            />

            {/* Right-side arrow for left-side card */}
            {isLeft && (
              <div className="hidden md:flex items-center">
                <div
                  className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[12px]"
                  style={{ borderLeftColor: navColor }}
                />
              </div>
            )}
          </div>
              </div>
            );
          })}
          </div>
        </section>
        
        {/* Clinical Rotations section
        <section
        id="rotations"
        ref={(el) => (sectionsRef.current["rotations"] = el)}
        data-aos="fade-up"
        className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"
        >
        <h2 className="text-4xl font-semibold mb-8 text-center">
            Clinical Rotations - Advanced Pharmacy Practice Experiences
        </h2>

        <div className="max-w-4xl mx-auto">
            <ul className="list-disc list-inside space-y-2 text-left text-lg mb-6">
            {rotations.map((item, idx) => (
                <li key={idx} className="text-gray-900">
                {item.title}  ({item.company}), {item.startDate} - {item.endDate}
                </li>
            ))}
            </ul>
        </div>
        </section> */}

        {/* Contact section */}
        <section
          id="contact"
          ref={(el) => (sectionsRef.current["contact"] = el)}
          data-aos="fade-up"
          className="scroll-mt-16 bg-white rounded-3xl px-4 sm:px-8 py-8 sm:py-12 my-16 shadow-lg"
        >
          <h2 className="text-4xl font-semibold mb-8">Contact</h2>
          <p className="mb-6"></p>

          <div className="flex justify-center space-x-8">
            <a
              href="https://www.linkedin.com/in/erika-seto/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 bg-[#CCCCFF] 
              text-white rounded-md hover:bg-[#6495ED] transition select-none"
            >
              <FaLinkedin className="w-12 h-12 sm:w-20 sm:h-20 mb-1" />
              <span className="text-xs font-medium text-center leading-none">
                LinkedIn
              </span>
            </a>

            <a
              href="mailto:seto.erika@gmail.com"
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 bg-[#CCCCFF] 
              text-white rounded-md hover:bg-[#6495ED] transition select-none"
            >
              <HiOutlineMail className="w-12 h-12 sm:w-20 sm:h-20 mb-1" />
              <span className="text-xs font-medium text-center leading-none">
                Email
              </span>
            </a>
          </div>
        </section>

        <footer className="text-center py-6 text-sm text-gray-500 mb-10">
          &copy; {new Date().getFullYear()} Erika Seto. All rights reserved.
        </footer>
      </main>
    </>
  );
}
