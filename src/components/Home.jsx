import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyD0o9wer8j-Fn6tOBdlo59D98Q3EajFHz4",
  authDomain: "portfolio-2c7c9.firebaseapp.com",
  projectId: "portfolio-2c7c9",
  storageBucket: "portfolio-2c7c9.firebasestorage.app",
  messagingSenderId: "319705367078",
  appId: "1:319705367078:web:65d851bbd621ec376a9ce7",
  measurementId: "G-TK911QPF0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projects, setProjects] = useState([]);
  
  const text = "Mathan";
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 2000;

  // Fetch projects from Firebase
  useEffect(() => {
    const projectsRef = ref(database, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectList = Object.entries(data).map(([id, project]) => ({
          id,
          ...project
        }));
        setProjects(projectList);
      }
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(text.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEvent

  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0"></div>
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-500/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #FFD700 0%, transparent 50%), radial-gradient(circle at 75% 75%, #FFD700 0%, transparent 50%)',
          backgroundSize: '200px 200px sm:400px sm:400px'
        }}></div>
      </div>

      <div className="relative z-10">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/30 shadow-lg shadow-yellow-500/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">
              Mathan
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navLinks.map(link => (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  className={`transition-all hover:text-yellow-400 relative font-medium text-sm lg:text-base ${
                    activeSection === link.id ? 'text-yellow-400' : 'text-white'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-400"></span>
                  )}
                </a>
              ))}
            </div>
            <button 
              className="md:hidden flex items-center p-2 rounded-lg hover:bg-yellow-500/20 transition-colors text-yellow-400"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-yellow-500/30">
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                {navLinks.map(link => (
                  <a 
                    key={link.id}
                    href={`#${link.id}`} 
                    className={`py-3 px-4 rounded-lg transition-colors font-medium text-center ${
                      activeSection === link.id ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-yellow-500/10 text-white'
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <section id="hero" className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 min-h-screen flex items-center">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <div className="relative mb-6 lg:mb-8">
          <div className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 rounded-full bg-yellow-400/20 animate-pulse"></div>
          <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 rounded-full bg-yellow-400/20 animate-pulse"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Hi, I'm <span className="relative inline-block">
              <span className="relative z-10 text-yellow-400">
                {displayText}
                <span className="animate-pulse text-yellow-400">|</span>
              </span>
              <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 bg-yellow-400/30 rounded-lg blur-sm"></span>
            </span>
          </h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-none lg:max-w-lg mx-auto lg:mx-0">
          Software Engineer & Web Developer specializing in creating luxurious web experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a 
            href="#contact" 
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all transform hover:-translate-y-1 text-center"
          >
            Contact Me
          </a>
          <a 
            href="#projects" 
            className="bg-gray-800/80 backdrop-blur-sm border border-yellow-400/50 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-yellow-500/10 transition-all transform hover:-translate-y-1 text-yellow-400 text-center"
          >
            View Projects
          </a>
        </div>
         <div className="flex justify-center lg:justify-start mt-8 sm:mt-12 space-x-4 sm:space-x-6">
          {/* GitHub */}
          <a 
            href="https://github.com/Mathan999" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
          >
            <span className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-800/80 rounded-full hover:bg-yellow-500/20 transition-colors border border-yellow-500/20">
              <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </span>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/mathan-kumar-2b989a358/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
          >
            <span className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-800/80 rounded-full hover:bg-yellow-500/20 transition-colors border border-yellow-500/20">
              <svg className="h-3 sm:h-4 w-3 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </span>
          </a>

          {/* Twitter */}
          <a 
            href="https://twitter.com/YOUR_TWITTER_USERNAME" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2"
          >
            <span className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-800/80 rounded-full hover:bg-yellow-500/20 transition-colors border border-yellow-500/20">
              <svg className="h-3 sm:h-4 w-3 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
      
      {/* Photo Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-yellow-400/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-12 h-12 bg-yellow-400/15 rounded-full animate-pulse"></div>
          
          {/* Photo Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-2xl blur-xl transform rotate-3"></div>
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-1 border border-yellow-400/30">
              <img 
                src="https://res.cloudinary.com/dxfqqm0yt/image/upload/v1747199998/WhatsApp_Image_2024-11-18_at_6.40.42_PM_kh655c.jpg" 
                alt="Profile Photo" 
                className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-2 right-8 w-6 h-6 bg-yellow-400/40 rounded-full animate-bounce"></div>
          <div className="absolute bottom-8 -left-2 w-4 h-4 bg-yellow-400/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
    </div>
  </div>
</section>

        <section id="about" className="py-12 sm:py-16 lg:py-24 bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold inline-block text-yellow-400">
                About Me
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mt-2"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-yellow-500/30">
                  <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
                    I'm a passionate frontend developer with expertise in React, JavaScript, and modern UI frameworks like Tailwind CSS. 
                    I love creating luxurious user experiences and bringing designs to life with cutting-edge web technologies.
                  </p>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                    With a strong background in both design and development, I bridge the gap between beautiful interfaces and solid functionality.
                    My approach combines clean code with creative solutions to build responsive, accessible and performant web applications.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { icon: "M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z", text: "Clean Code" },
                      { icon: "M10 12a2 2 0 100-4 2 2 0 000 4z", text: "UI/UX Focus" },
                      { icon: "M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z", text: "Fast Performance" },
                      { icon: "M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z", text: "Responsive Design" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-yellow-400 font-medium text-sm sm:text-base">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="h-full bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-500/30">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-yellow-400">Experience</h3>
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      { year: "2023 - Present", role: "Senior Frontend Developer", company: "Tech Innovations Inc." },
                      { year: "2020 - 2023", role: "UI/UX Designer", company: "Creative Solutions Ltd." },
                      { year: "2018 - 2020", role: "Web Developer", company: "Digital Agency Co." }
                    ].map((exp, index) => (
                      <div key={index} className="border-l-2 border-yellow-400 pl-4">
                        <div className="text-xs sm:text-sm text-yellow-400/80">{exp.year}</div>
                        <div className="font-medium text-white text-sm sm:text-base">{exp.role}</div>
                        <div className="text-xs sm:text-sm text-gray-300">{exp.company}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold inline-block text-yellow-400">
                My Skills
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mt-2"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: 'React', icon: '⚛️' },
                { name: 'JavaScript', icon: '🟨' },
                { name: 'Tailwind CSS', icon: '🌊' },
                { name: 'HTML/CSS', icon: '🌐' },
                { name: 'Three.js', icon: '🧊' },
                { name: 'UI/UX Design', icon: '🎨' },
                { name: 'Responsive Design', icon: '📱' },
                { name: 'Git', icon: '🔄' }
              ].map((skill) => (
                <div 
                  key={skill.name} 
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/20 group"
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-yellow-400/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-yellow-400/30 transition-colors border border-yellow-500/30">
                    <span className="text-xl sm:text-2xl">{skill.icon}</span>
                  </div>
                  <span className="font-medium text-sm sm:text-base lg:text-lg text-yellow-400">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 sm:py-16 lg:py-24 bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold inline-block text-yellow-400">
                Featured Projects
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mt-2"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group hover:shadow-xl hover:shadow-yellow-500/20 border border-yellow-500/30 hover:border-yellow-400/50 transition-all hover:-translate-y-2"
                >
                  <div className="h-40 sm:h-48 lg:h-52 relative overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-yellow-500 text-sm sm:text-base"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.languages.map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 sm:px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-500/30 text-yellow-400 font-medium">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 text-center">
              <a 
                href="#" 
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all hover:-translate-y-1 text-yellow-400 font-medium hover:bg-yellow-500/10 text-sm sm:text-base"
              >
                View All Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold inline-block text-yellow-400">
                Get In Touch
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mt-2"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-yellow-500/30">
                  <form className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-yellow-400 font-medium mb-2 text-sm sm:text-base">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-gray-700/80 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-400 text-sm sm:text-base"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-yellow-400 font-medium mb-2 text-sm sm:text-base">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 bg-gray-700/80 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-400 text-sm sm:text-base"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-yellow-400 font-medium mb-2 text-sm sm:text-base">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-3 bg-gray-700/80 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-400 text-sm sm:text-base"
                        placeholder="Project Discussion"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-yellow-400 font-medium mb-2 text-sm sm:text-base">Message</label>
                      <textarea
                        id="message"
                        rows="6"
                        className="w-full px-4 py-3 bg-gray-700/80 border border-yellow-500/30 rounded-lg focus:outline-none focus:border-yellow-400 text-white placeholder-gray-400 resize-none text-sm sm:text-base"
                        placeholder="Tell me about your project..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 sm:py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all transform hover:-translate-y-1 text-sm sm:text-base"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586l-8 8-8-8V4z",
                    title: "Email",
                    info: "mathan@example.com",
                    link: "mailto:mathan@example.com"
                  },
                  {
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    title: "Phone",
                    info: "+1 (555) 123-4567",
                    link: "tel:+15551234567"
                  },
                  {
                    icon: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                    title: "Location",
                    info: "New York, NY",
                    link: "#"
                  }
                ].map((contact, index) => (
                  <div key={index} className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 sm:h-6 w-5 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-yellow-400 text-sm sm:text-base">{contact.title}</h3>
                        <a href={contact.link} className="text-gray-300 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                          {contact.info}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-yellow-500/30">
                  <h3 className="font-semibold text-yellow-400 mb-4 text-sm sm:text-base">Follow Me</h3>
                  <div className="flex space-x-4">
                    {[
                      { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                      { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                      { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-400/30 transition-all transform hover:-translate-y-1 border border-yellow-500/30 hover:border-yellow-400/50"
                      >
                        <svg className="h-4 sm:h-5 w-4 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-yellow-500/30 py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
                © 2024 Mathan. All rights reserved.
              </div>
              <div className="flex space-x-4 sm:space-x-6">
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">Terms</a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;