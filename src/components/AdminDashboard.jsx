import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
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

function AdminDashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    languages: '',
    projectLink: '',
    imageUrl: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    setShowProjectForm(false);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectsRef = ref(database, 'projects');
      const newProjectRef = push(projectsRef);
      
      // Split languages into an array
      const projectToSave = {
        ...projectData,
        languages: projectData.languages.split(',').map(lang => lang.trim()),
        createdAt: Date.now()
      };

      await set(newProjectRef, projectToSave);
      alert("Project added successfully!");
      setShowProjectForm(false);
      setProjectData({
        title: '',
        description: '',
        category: '',
        languages: '',
        projectLink: '',
        imageUrl: ''
      });
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project. Please try again.");
    }
  };

  const navItems = [
    { id: 'projects', name: 'Projects', icon: '📁' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white shadow fixed top-0 left-0 right-0 z-20 h-16">
        <div className="flex items-center justify-between px-4 h-full">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-indigo-600 text-white"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-300 ease-in-out z-30 w-64 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-xl overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <button 
              onClick={toggleSidebar} 
              className="lg:hidden text-white"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="mt-8 space-y-2">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 transform ${
                  activeItem === item.id
                    ? 'bg-white text-indigo-800 translate-x-2 shadow-lg scale-105'
                    : 'hover:bg-indigo-500 text-white hover:translate-x-1'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {activeItem === item.id && (
                  <span className="ml-auto">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-200 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0'
      } ${isMobile ? 'mt-16' : ''}`}>
        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-gray-700">Welcome to the admin panel. This is a protected area.</p>
          </div>

          {activeItem === 'projects' && (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Projects Management</h3>
              
              {showProjectForm ? (
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={projectData.title} 
                        onChange={handleProjectChange} 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input 
                        type="text" 
                        name="category" 
                        value={projectData.category} 
                        onChange={handleProjectChange} 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border" 
                        placeholder="e.g., Web Development, Mobile App, etc." 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                    <textarea 
                      name="description" 
                      value={projectData.description} 
                      onChange={handleProjectChange} 
                      rows="4" 
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border" 
                      required 
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Programming Languages (comma-separated)</label>
                      <input 
                        type="text" 
                        name="languages" 
                        value={projectData.languages} 
                        onChange={handleProjectChange} 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border" 
                        placeholder="e.g., JavaScript, Python, etc." 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                      <input 
                        type="url" 
                        name="projectLink" 
                        value={projectData.projectLink} 
                        onChange={handleProjectChange} 
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border" 
                        placeholder="https://example.com" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      name="imageUrl" 
                      value={projectData.imageUrl} 
                      onChange={handleProjectChange} 
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border" 
                      placeholder="https://res.cloudinary.com/your-cloud-name/image/upload/..." 
                      required 
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter the full URL of your image from Cloudinary or any other image hosting service.
                    </p>
                    {projectData.imageUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-1">Preview:</p>
                        <img 
                          src={projectData.imageUrl} 
                          alt="Project preview" 
                          className="w-32 h-32 object-cover rounded-md border border-gray-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setShowProjectForm(false)} 
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div 
                    className="p-4 hover:bg-gray-50 rounded-md transition duration-200 cursor-pointer border border-gray-100"
                    onClick={() => setShowProjectForm(true)}
                  >
                    <p className="text-gray-800 font-medium">Add New Project</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 rounded-md transition duration-200 cursor-pointer border border-gray-100">
                    <p className="text-gray-800 font-medium">View All Projects</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50 rounded-md transition duration-200 cursor-pointer border border-gray-100">
                    <p className="text-gray-800 font-medium">Project Categories</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;