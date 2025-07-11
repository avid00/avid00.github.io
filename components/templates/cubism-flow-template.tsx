"use client"
import { Github, Linkedin, Mail, ExternalLink, Box, Layers, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ResumeData {
  personal: {
    name: string
    title: string
    email: string
    github: string
    linkedin: string
  }
  projects: {
    name: string
    description: string
    deployedLink: string
    githubUrl: string
  }[]
  skills: {
    name: string
    skills: string[]
  }[]
  experience: {
    position: string
    company: string
    startDate: string
    endDate: string
    description: string
    bulletPoints: string[]
  }[]
}

interface CubismFlowTemplateProps {
  data: ResumeData
}

export default function CubismFlowTemplate({ data }: CubismFlowTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Isometric cubes animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cube properties
    const cubes: {
      x: number;
      y: number;
      size: number;
      color: string;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      rotationSpeedX: number;
      rotationSpeedY: number;
      rotationSpeedZ: number;
      opacity: number;
    }[] = [];

    const colors = ['#FF5555', '#55FF55', '#5555FF', '#FFFF55', '#FF55FF', '#55FFFF'];

    // Create cubes
    // for (let i = 0; i < 20; i++) {
    //   cubes.push({
    //     x: '#55FFFF'
    //   });
    // Create cubes
    for (let i = 0; i < 20; i++) {
      cubes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        rotationSpeedX: (Math.random() - 0.5) * 0.01,
        rotationSpeedY: (Math.random() - 0.5) * 0.01,
        rotationSpeedZ: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const drawIsometricCube = (
      x: number, 
      y: number, 
      size: number, 
      rotationX: number, 
      rotationY: number, 
      rotationZ: number, 
      color: string, 
      opacity: number,
      mouseX: number,
      mouseY: number,
      isHovering: boolean
    ) => {
      // Calculate distance from mouse
      const dx = x - mouseX;
      const dy = y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 300;
      const distanceFactor = Math.max(0, 1 - distance / maxDistance);
      
      // Adjust rotation based on mouse position if hovering
      const adjustedRotationX = rotationX + (isHovering ? distanceFactor * 0.5 : 0);
      const adjustedRotationY = rotationY + (isHovering ? distanceFactor * 0.5 : 0);
      
      // Isometric projection constants
      const angle = Math.PI / 6;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);
      
      // Cube vertices in 3D space
      const vertices = [
        [-size/2, -size/2, -size/2], // 0: back-bottom-left
        [size/2, -size/2, -size/2],  // 1: back-bottom-right
        [size/2, size/2, -size/2],   // 2: back-top-right
        [-size/2, size/2, -size/2],  // 3: back-top-left
        [-size/2, -size/2, size/2],  // 4: front-bottom-left
        [size/2, -size/2, size/2],   // 5: front-bottom-right
        [size/2, size/2, size/2],    // 6: front-top-right
        [-size/2, size/2, size/2]    // 7: front-top-left
      ];
      
      // Apply 3D rotations
      const rotatedVertices = vertices.map(([vx, vy, vz]) => {
        // Rotation around X axis
        const x1 = vx;
        const y1 = vy * Math.cos(adjustedRotationX) - vz * Math.sin(adjustedRotationX);
        const z1 = vy * Math.sin(adjustedRotationX) + vz * Math.cos(adjustedRotationX);
        
        // Rotation around Y axis
        const x2 = x1 * Math.cos(adjustedRotationY) + z1 * Math.sin(adjustedRotationY);
        const y2 = y1;
        const z2 = -x1 * Math.sin(adjustedRotationY) + z1 * Math.cos(adjustedRotationY);
        
        // Rotation around Z axis
        const x3 = x2 * Math.cos(rotationZ) - y2 * Math.sin(rotationZ);
        const y3 = x2 * Math.sin(rotationZ) + y2 * Math.cos(rotationZ);
        const z3 = z2;
        
        // Isometric projection
        const projX = x3 * cosAngle - y3 * cosAngle;
        const projY = x3 * sinAngle + y3 * sinAngle - z3;
        
        return [x + projX, y + projY];
      });
      
      // Define cube faces (each face is defined by 4 vertices)
      const faces = [
        [0, 1, 2, 3], // back
        [4, 5, 6, 7], // front
        [0, 1, 5, 4], // bottom
        [2, 3, 7, 6], // top
        [0, 3, 7, 4], // left
        [1, 2, 6, 5]  // right
      ];
      
      // Draw each face
      faces.forEach((face, i) => {
        ctx.beginPath();
        face.forEach((vertexIndex, j) => {
          const [px, py] = rotatedVertices[vertexIndex];
          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        });
        ctx.closePath();
        
        // Different shade for each face
        const shade = 0.6 + (i * 0.1);
        const r = Number.parseInt(color.slice(1, 3), 16);
        const g = Number.parseInt(color.slice(3, 5), 16);
        const b = Number.parseInt(color.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${r * shade}, ${g * shade}, ${b * shade}, ${opacity})`;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 2})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      cubes.forEach(cube => {
        // Update rotation
        cube.rotationX += cube.rotationSpeedX;
        cube.rotationY += cube.rotationSpeedY;
        cube.rotationZ += cube.rotationSpeedZ;
        
        // Draw cube
        drawIsometricCube(
          cube.x, 
          cube.y, 
          cube.size, 
          cube.rotationX, 
          cube.rotationY, 
          cube.rotationZ, 
          cube.color, 
          cube.opacity,
          mousePosition.x,
          mousePosition.y,
          isHovering
        );
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePosition, isHovering]);

  return (
    <div 
      className="relative bg-gray-100 text-gray-900 min-h-screen overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Canvas background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Header */}
      <header className="relative pt-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="inline-flex items-center mb-4">
                <div className="w-3 h-12 bg-blue-600 mr-4"></div>
                <h1 className="text-5xl font-bold tracking-tight">{data.personal.name}</h1>
              </div>
              <h2 className="text-2xl text-gray-600 font-light ml-7">{data.personal.title}</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href={`mailto:${data.personal.email}`} 
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-600 text-gray-800 hover:text-white rounded-md shadow-md transition-colors duration-300"
              >
                <Mail size={18} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                <span>{data.personal.email}</span>
              </a>
              <a 
                href={data.personal.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-600 text-gray-800 hover:text-white rounded-md shadow-md transition-colors duration-300"
              >
                <Github size={18} className="text-red-600 group-hover:text-white transition-colors duration-300" />
                <span>GitHub</span>
              </a>
              <a 
                href={data.personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-green-600 text-gray-800 hover:text-white rounded-md shadow-md transition-colors duration-300"
              >
                <Linkedin size={18} className="text-green-600 group-hover:text-white transition-colors duration-300" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Skills Section */}
        <section className="mb-24">
          <div className="flex items-center mb-12">
            <Box size={28} className="text-blue-600 mr-4" />
            <h2 className="text-3xl font-bold">Skills</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-blue-600 to-transparent ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-700 hover:translate-y-[-5px]"
              >
                <div className="relative bg-white p-6 rounded-lg shadow-lg overflow-hidden group">
                  {/* Decorative geometric shape */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    {index % 2 === 0 ? (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600 fill-current">
                        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-red-600 fill-current">
                        <rect x="10" y="10" width="80" height="80" />
                      </svg>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">{skillGroup.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-800 rounded-md text-sm border-l-2 border-blue-600 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-24">
          <div className="flex items-center mb-12">
            <Layers size={28} className="text-red-600 mr-4" />
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-red-600 to-transparent ml-4"></div>
          </div>
          
          <div className="space-y-12">
            {data.projects.map((project, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-700 hover:translate-x-[5px]"
              >
                <div className="relative bg-white p-8 rounded-lg shadow-lg overflow-hidden group">
                  {/* Decorative geometric elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-blue-600 to-green-600"></div>
                  <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-r from-green-600 to-blue-600"></div>
                  
                  <h3 className="text-2xl font-semibold mb-2 text-red-600 group-hover:text-red-700 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-gray-600">{project.description}</p>
                  <div className="flex gap-4">
                    <a 
                      href={project.deployedLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <div className="flex items-center mb-12">
            <Clock size={28} className="text-green-600 mr-4" />
            <h2 className="text-3xl font-bold">Experience</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-green-600 to-transparent ml-4"></div>
          </div>
          
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-green-600 via-blue-600 to-red-600"></div>
            
            <div className="space-y-16">
              {data.experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative pl-12 transform transition-all duration-700 hover:translate-y-[-5px]"
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 top-0 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-white border-2 border-green-600 rounded-md transform rotate-45"></div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-green-600">{exp.position}</h3>
                        <h4 className="text-lg text-gray-600">{exp.company}</h4>
                      </div>
                      <div className="mt-2 md:mt-0 px-3 py-1 bg-gray-100 rounded-md text-gray-600 text-sm">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="mb-4 text-gray-600">{exp.description}</p>
                    <ul className="space-y-2 text-gray-600">
                      {exp.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-600 mt-2 mr-2 transform rotate-45"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
