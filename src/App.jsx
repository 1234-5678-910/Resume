import { useState, useEffect } from 'react';
import { Mail, Linkedin, Download, Sun, Moon, QrCode } from 'lucide-react';
import { resumeData } from './resumeData';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 flex flex-col items-center">
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl ml-56 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">GV</span>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <a 
                href="/resume.pdf" 
                download="Gagan_Veeravelly_Resume.pdf" 
                className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-transform duration-300 hover:scale-105"
              >
                <Download size={16} className="mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 ml-56">
        <div className="w-full py-12">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
              {resumeData.name}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-medium mb-8">
              {resumeData.tagline}
            </p>
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-4">
                {resumeData.contactInfo.location} | {resumeData.contactInfo.email} | 
                <a 
                  href={resumeData.contactInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  LinkedIn
                </a>
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href={resumeData.contactInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-transform duration-300 hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href={`mailto:${resumeData.contactInfo.email.replace('✉️', '').trim()}`} 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-transform duration-300 hover:scale-110"
                >
                  <Mail size={24} />
                </a>
                <div className="relative group">
                  <QrCode size={24} className="text-gray-600 dark:text-gray-300 cursor-pointer" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${resumeData.contactInfo.linkedin}`} 
                      alt="LinkedIn QR Code" 
                      className="w-32 h-32" 
                    />
                    <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">Scan for LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-16">
            {/* About Section */}
            <section id="about" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                About Me
              </h2>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                {resumeData.careerObjective}
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Projects Section */}
                <section id="projects" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                    Projects & Experience
                  </h2>
                  <div className="space-y-8">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{project.name}</h3>
                        <ul className="space-y-3 text-lg">
                          {project.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-3 text-xl">•</span>
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Interests Section */}
                <section id="interests" className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                    Interests
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {resumeData.interests.map((interest, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg py-4 px-8 transform hover:scale-105 transition-transform duration-300">
                        <p className="font-medium text-lg text-gray-800 dark:text-white">{interest}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-12">
                {/* Skills Section */}
                <section id="skills" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                    Skills
                  </h2>
                  <div className="space-y-8">
                    {Object.entries(resumeData.skills).map(([category, skills]) => (
                      <div key={category}>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 capitalize">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 text-base font-medium rounded-full shadow-sm hover:shadow-md transition-shadow"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education Section */}
                <section id="education" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                    Education
                  </h2>
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {resumeData.education.degree}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 mt-2 text-lg">
                      {resumeData.education.university}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {resumeData.education.graduation}
                    </p>
                  </div>
                </section>

                {/* Achievements Section */}
                <section id="achievements" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
                    Achievements & Certifications
                  </h2>
                  <ul className="space-y-5">
                    {resumeData.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 dark:bg-blue-400 text-white flex items-center justify-center mr-4 mt-1 font-bold text-base transition-transform group-hover:scale-110">
                          ✓
                        </div>
                        <span className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-16 pt-12 border-t-2 border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Get In Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of an innovative team.
                  </p>
                  <div className="space-y-5">
                    <p className="flex items-center text-lg text-gray-700 dark:text-gray-300">
                      <Mail size={24} className="mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <a href={`mailto:${resumeData.contactInfo.email.replace('✉️', '').trim()}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {resumeData.contactInfo.email.replace('✉️', '').trim()}
                      </a>
                    </p>
                    <p className="flex items-center text-lg">
                      <Linkedin size={24} className="mr-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <a 
                        href={resumeData.contactInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </p>
                  </div>
                </div>
                <form className="space-y-5">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-5 py-3 text-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-5 py-3 text-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your Message" 
                      rows="4" 
                      className="w-full px-5 py-3 text-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Gagan Veeravelly. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App
