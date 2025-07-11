"use client"

import { Github, Linkedin, Mail, ExternalLink, Triangle, Hexagon, Square } from "lucide-react"
import { useEffect, useRef } from "react"

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

interface GeometricPrismTemplateProps {
  data: ResumeData
}

export default function GeometricPrismTemplate({ data }: GeometricPrismTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated geometric background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ["#FF3366", "#33CCFF", "#FFCC33", "#33FF99"]

    interface Shape {
      x: number
      y: number
      size: number
      color: string
      type: "triangle" | "square" | "circle"
      rotation: number
      rotationSpeed: number
      opacity: number
      opacityDirection: number
    }

    const shapes: Shape[] = []

    // Create initial shapes
    for (let i = 0; i < 30; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ["triangle", "square", "circle"][Math.floor(Math.random() * 3)] as "triangle" | "square" | "circle",
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.1,
        opacityDirection: Math.random() > 0.5 ? 0.002 : -0.002,
      })
    }

    const drawTriangle = (x: number, y: number, size: number, rotation: number) => {
      ctx.beginPath()
      ctx.moveTo(x + Math.cos(rotation) * size, y + Math.sin(rotation) * size)
      ctx.lineTo(x + Math.cos(rotation + (2 * Math.PI) / 3) * size, y + Math.sin(rotation + (2 * Math.PI) / 3) * size)
      ctx.lineTo(x + Math.cos(rotation + (4 * Math.PI) / 3) * size, y + Math.sin(rotation + (4 * Math.PI) / 3) * size)
      ctx.closePath()
    }

    const drawSquare = (x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.rect(-size / 2, -size / 2, size, size)
      ctx.restore()
    }

    const drawCircle = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.fillStyle = shape.color

        // Draw shape based on type
        if (shape.type === "triangle") {
          drawTriangle(shape.x, shape.y, shape.size, shape.rotation)
        } else if (shape.type === "square") {
          drawSquare(shape.x, shape.y, shape.size, shape.rotation)
        } else {
          drawCircle(shape.x, shape.y, shape.size)
        }

        ctx.fill()
        ctx.restore()

        // Update shape properties
        shape.rotation += shape.rotationSpeed
        shape.opacity += shape.opacityDirection

        // Reverse opacity direction if needed
        if (shape.opacity > 0.4 || shape.opacity < 0.1) {
          shape.opacityDirection *= -1
        }
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
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen overflow-hidden">
      {/* Animated geometric background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="relative pt-20 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg transform rotate-45 mr-4"></div>
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                  {data.personal.name}
                </h1>
              </div>
              <h2 className="text-2xl font-light ml-16 text-gray-300">{data.personal.title}</h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${data.personal.email}`}
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-700 transition-colors"
              >
                <Mail size={18} className="text-pink-500 group-hover:text-pink-400" />
                <span>{data.personal.email}</span>
              </a>
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-700 transition-colors"
              >
                <Github size={18} className="text-cyan-500 group-hover:text-cyan-400" />
                <span>GitHub</span>
              </a>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md border border-gray-700 transition-colors"
              >
                <Linkedin size={18} className="text-purple-500 group-hover:text-purple-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Skills Section */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <Hexagon size={28} className="text-cyan-500 mr-3" />
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 overflow-hidden transition-all duration-500 hover:border-cyan-500/50"
              >
                {/* Animated background shape */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                <div className="absolute -left-8 -top-8 w-24 h-24 bg-pink-500/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100"></div>

                <h3 className="text-xl font-semibold mb-4 text-cyan-400">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {skillGroup.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-700/70 text-white rounded-md text-sm border border-gray-600 hover:border-cyan-500/50 hover:bg-gray-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <Triangle size={28} className="text-pink-500 mr-3" />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden transition-all duration-500 hover:border-pink-500/50"
              >
                {/* Animated diagonal line */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-pink-500/10 to-transparent transform -skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>

                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-semibold mb-2 text-pink-400">{project.name}</h3>
                  <p className="mb-4 text-gray-300">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
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
            <Square size={28} className="text-purple-500 mr-3" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 overflow-hidden transition-all duration-500 hover:border-purple-500/50"
              >
                {/* Animated corner shapes */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-l-[40px] border-t-purple-500/0 border-l-purple-500/0 group-hover:border-t-purple-500/20 group-hover:border-l-purple-500/20 transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-r-[40px] border-b-purple-500/0 border-r-purple-500/0 group-hover:border-b-purple-500/20 group-hover:border-r-purple-500/20 transition-all duration-300"></div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400">{exp.position}</h3>
                    <h4 className="text-lg text-gray-300">{exp.company}</h4>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0 md:ml-4 md:text-right">
                    <span className="inline-block px-3 py-1 bg-gray-700/70 rounded-md text-sm">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                </div>
                <p className="mb-4 text-gray-300">{exp.description}</p>
                <ul className="space-y-2 text-gray-300 relative z-10">
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-500 mt-2 mr-2 transform rotate-45"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
