"use client"
import { Github, Linkedin, Mail, ExternalLink, Zap, Layers, Clock } from "lucide-react"
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

interface AbstractMosaicTemplateProps {
  data: ResumeData
}

export default function AbstractMosaicTemplate({ data }: AbstractMosaicTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeSection, setActiveSection] = useState("skills")

  // Blob animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Blob parameters
    const blobs = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 150, color: "#6366F1", speed: 0.001 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 180, color: "#EC4899", speed: 0.002 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 200, color: "#8B5CF6", speed: 0.0015 },
    ]

    let time = 0

    const drawBlob = (x: number, y: number, radius: number, color: string, time: number) => {
      ctx.beginPath()

      // Create a wavy circle using parametric equations
      for (let i = 0; i < Math.PI * 2; i += 0.01) {
        const noiseFactor = 0.3 // How wavy the blob is
        const r = radius * (1 + noiseFactor * Math.sin(i * 8 + time))
        const px = x + r * Math.cos(i)
        const py = y + r * Math.sin(i)

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }

      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = 0.15
      ctx.fill()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob) => {
        drawBlob(blob.x, blob.y, blob.radius, blob.color, time * blob.speed * 10)

        // Move blobs slowly
        blob.x += Math.sin(time * blob.speed) * 0.5
        blob.y += Math.cos(time * blob.speed) * 0.5

        // Keep blobs within canvas
        if (blob.x < 0) blob.x = canvas.width
        if (blob.x > canvas.width) blob.x = 0
        if (blob.y < 0) blob.y = canvas.height
        if (blob.y > canvas.height) blob.y = 0
      })

      time += 0.01
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reposition blobs after resize
      blobs[0].x = canvas.width * 0.2
      blobs[0].y = canvas.height * 0.3
      blobs[1].x = canvas.width * 0.8
      blobs[1].y = canvas.height * 0.7
      blobs[2].x = canvas.width * 0.5
      blobs[2].y = canvas.height * 0.5
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative bg-gray-950 text-white min-h-screen overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="relative pt-16 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {data.personal.name}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4"></div>
            <h2 className="text-2xl text-gray-300 font-light">{data.personal.title}</h2>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href={`mailto:${data.personal.email}`}
                className="group flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-full transition-colors duration-300"
              >
                <Mail
                  size={18}
                  className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                />
                <span>{data.personal.email}</span>
              </a>
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full transition-colors duration-300"
              >
                <Github
                  size={18}
                  className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                />
                <span>GitHub</span>
              </a>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 rounded-full transition-colors duration-300"
              >
                <Linkedin
                  size={18}
                  className="text-pink-400 group-hover:text-pink-300 transition-colors duration-300"
                />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center mb-12">
            <div className="flex bg-gray-900/50 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setActiveSection("skills")}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  activeSection === "skills"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveSection("projects")}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  activeSection === "projects"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveSection("experience")}
                className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                  activeSection === "experience"
                    ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Experience
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Skills Section */}
        <section
          className={`transition-all duration-500 ${activeSection === "skills" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 absolute pointer-events-none"}`}
        >
          <div className="flex items-center mb-12">
            <Zap size={28} className="text-indigo-500 mr-4" />
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="transform transition-all duration-700"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl overflow-hidden group border border-gray-800 hover:border-indigo-500/30 transition-colors duration-300">
                  {/* Decorative blob */}
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-300"></div>

                  <h3 className="text-xl font-semibold mb-6 text-indigo-400">{skillGroup.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-800/50 hover:bg-indigo-500/20 text-white rounded-full text-sm border border-gray-700 hover:border-indigo-500/30 transition-all duration-300"
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
        <section
          className={`transition-all duration-500 ${activeSection === "projects" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 absolute pointer-events-none"}`}
        >
          <div className="flex items-center mb-12">
            <Layers size={28} className="text-purple-500 mr-4" />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="transform transition-all duration-700"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl overflow-hidden group border border-gray-800 hover:border-purple-500/30 transition-colors duration-300">
                  {/* Decorative blob */}
                  <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors duration-300"></div>

                  <h3 className="text-2xl font-semibold mb-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-gray-300 max-w-3xl">{project.description}</p>
                  <div className="flex gap-6">
                    <a
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full transition-colors duration-300"
                    >
                      <ExternalLink size={16} className="text-purple-400" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-full transition-colors duration-300"
                    >
                      <Github size={16} className="text-purple-400" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section
          className={`transition-all duration-500 ${activeSection === "experience" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 absolute pointer-events-none"}`}
        >
          <div className="flex items-center mb-12">
            <Clock size={28} className="text-pink-500 mr-4" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-16">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="transform transition-all duration-700"
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                <div className="relative bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl overflow-hidden group border border-gray-800 hover:border-pink-500/30 transition-colors duration-300">
                  {/* Decorative blob */}
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl group-hover:bg-pink-500/20 transition-colors duration-300"></div>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-pink-400">{exp.position}</h3>
                      <h4 className="text-lg text-gray-300">{exp.company}</h4>
                    </div>
                    <div className="mt-2 md:mt-0 px-4 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-300 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>
                  <p className="mb-6 text-gray-300">{exp.description}</p>
                  <ul className="space-y-3 text-gray-300">
                    {exp.bulletPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-pink-500 mt-2 mr-3 rounded-full"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
