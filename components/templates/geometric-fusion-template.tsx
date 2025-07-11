"use client"
import { Github, Linkedin, Mail, ExternalLink, Hexagon, Triangle, Square, Circle } from "lucide-react"
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

interface GeometricFusionTemplateProps {
  data: ResumeData
}

export default function GeometricFusionTemplate({ data }: GeometricFusionTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-section")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Geometric shapes
    const shapes: {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      type: "triangle" | "square" | "hexagon"
      color: string
      opacity: number
      speedX: number
      speedY: number
    }[] = []

    const colors = ["#FF3366", "#33CCFF", "#FFCC00", "#66CC99", "#9966FF"]
    const shapeTypes = ["triangle", "square", "hexagon"]

    // Create shapes
    for (let i = 0; i < 30; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)] as any,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    const drawTriangle = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6))
      ctx.lineTo(-size * Math.cos(Math.PI / 6), size * Math.sin(Math.PI / 6))
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.restore()
    }

    const drawSquare = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.rect(-size / 2, -size / 2, size, size)
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.restore()
    }

    const drawHexagon = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const px = size * Math.cos(angle)
        const py = size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        // Draw shape based on type
        if (shape.type === "triangle") {
          drawTriangle(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity)
        } else if (shape.type === "square") {
          drawSquare(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity)
        } else if (shape.type === "hexagon") {
          drawHexagon(shape.x, shape.y, shape.size, shape.rotation, shape.color, shape.opacity)
        }

        // Update position and rotation
        shape.x += shape.speedX
        shape.y += shape.speedY
        shape.rotation += shape.rotationSpeed

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="relative pt-20 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="inline-flex items-center mb-4">
                <div className="w-3 h-12 bg-pink-500 mr-4"></div>
                <h1 className="text-5xl font-bold tracking-tight">{data.personal.name}</h1>
              </div>
              <h2 className="text-2xl text-gray-300 font-light ml-7">{data.personal.title}</h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${data.personal.email}`}
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-pink-600 rounded-md transition-colors duration-300"
              >
                <Mail size={18} className="text-pink-400 group-hover:text-white transition-colors duration-300" />
                <span>{data.personal.email}</span>
              </a>
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-blue-600 rounded-md transition-colors duration-300"
              >
                <Github size={18} className="text-blue-400 group-hover:text-white transition-colors duration-300" />
                <span>GitHub</span>
              </a>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-yellow-600 rounded-md transition-colors duration-300"
              >
                <Linkedin size={18} className="text-yellow-400 group-hover:text-white transition-colors duration-300" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Skills Section */}
        <section className="mb-24 animate-section">
          <div className="flex items-center mb-12">
            <Hexagon size={28} className="text-pink-500 mr-4" />
            <h2 className="text-3xl font-bold">Skills</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-pink-500 to-transparent ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative bg-gray-800 p-6 rounded-lg overflow-hidden group">
                  {/* Decorative geometric shape */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    {index % 2 === 0 ? (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500 fill-current">
                        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
                        <rect x="10" y="10" width="80" height="80" />
                      </svg>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-pink-400">{skillGroup.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm border-l-2 border-pink-500 transition-colors duration-300"
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
        <section className="mb-24 animate-section">
          <div className="flex items-center mb-12">
            <Triangle size={28} className="text-blue-500 mr-4" />
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-blue-500 to-transparent ml-4"></div>
          </div>

          <div className="space-y-12">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isInView ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative bg-gray-800 p-8 rounded-lg overflow-hidden group">
                  {/* Decorative lines */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500"></div>
                  <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-r from-yellow-500 to-blue-500"></div>

                  <h3 className="text-2xl font-semibold mb-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="mb-6 text-gray-300">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-300"
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
        <section className="animate-section">
          <div className="flex items-center mb-12">
            <Square size={28} className="text-yellow-500 mr-4" />
            <h2 className="text-3xl font-bold">Experience</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-yellow-500 to-transparent ml-4"></div>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500 via-pink-500 to-blue-500"></div>

            <div className="space-y-16">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative pl-12 transform transition-all duration-700 ${
                    isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 top-0 transform -translate-x-1/2">
                    {index % 3 === 0 ? (
                      <Square size={20} className="text-yellow-500 fill-current" />
                    ) : index % 3 === 1 ? (
                      <Triangle size={20} className="text-pink-500 fill-current" />
                    ) : (
                      <Circle size={20} className="text-blue-500 fill-current" />
                    )}
                  </div>

                  <div className="bg-gray-800 p-8 rounded-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-yellow-400">{exp.position}</h3>
                        <h4 className="text-lg text-gray-300">{exp.company}</h4>
                      </div>
                      <div className="mt-2 md:mt-0 px-3 py-1 bg-gray-700 rounded-md text-gray-300 text-sm">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="mb-4 text-gray-300">{exp.description}</p>
                    <ul className="space-y-2 text-gray-300">
                      {exp.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-yellow-500 mt-2 mr-2 transform rotate-45"></span>
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
