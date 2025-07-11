"use client"

import { Github, Linkedin, Mail, ExternalLink, Award, Code, Briefcase } from "lucide-react"
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

interface BioluminescentAbyssTemplateProps {
  data: ResumeData
}

export default function BioluminescentAbyssTemplate({ data }: BioluminescentAbyssTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      alphaSpeed: number
    }[] = []

    const colors = ["#00ffff", "#00bfff", "#1e90ff", "#87cefa", "#4682b4"]

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
        alphaSpeed: Math.random() * 0.01 + 0.005,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.alpha
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        // Pulsating effect
        particle.alpha += particle.alphaSpeed
        if (particle.alpha > 0.6 || particle.alpha < 0.1) {
          particle.alphaSpeed *= -1
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
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
    <div className="relative bg-[#050A18] text-white min-h-screen overflow-hidden">
      {/* Particle animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Glowing orb background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute top-3/4 left-1/3 w-40 h-40 rounded-full bg-teal-500/10 blur-3xl"></div>

      {/* Header */}
      <header className="relative pt-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 tracking-tight">
            {data.personal.name}
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"></div>
          <h2 className="text-2xl text-cyan-300 mb-8 font-light tracking-wide">{data.personal.title}</h2>

          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <a
              href={`mailto:${data.personal.email}`}
              className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <div className="p-2 rounded-full bg-cyan-900/30 group-hover:bg-cyan-900/50 transition-colors">
                <Mail size={18} />
              </div>
              <span>{data.personal.email}</span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <div className="p-2 rounded-full bg-cyan-900/30 group-hover:bg-cyan-900/50 transition-colors">
                <Github size={18} />
              </div>
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <div className="p-2 rounded-full bg-cyan-900/30 group-hover:bg-cyan-900/50 transition-colors">
                <Linkedin size={18} />
              </div>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Skills */}
          <div className="lg:col-span-4 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-cyan-900/30">
                  <Code size={20} className="text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-300">Skills</h2>
              </div>

              <div className="space-y-8">
                {data.skills.map((skillGroup, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-sm p-6 rounded-lg border border-cyan-900/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-cyan-200">{skillGroup.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-cyan-900/40 text-cyan-300 rounded-full text-sm border border-cyan-800/30 hover:border-cyan-600/50 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column - Projects and Experience */}
          <div className="lg:col-span-8 space-y-12">
            {/* Projects Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-cyan-900/30">
                  <Award size={20} className="text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-300">Projects</h2>
              </div>

              <div className="space-y-6">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-sm p-6 rounded-lg border border-cyan-900/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 hover:from-cyan-900/30 hover:to-blue-900/30 transition-colors"
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-cyan-200">{project.name}</h3>
                    <p className="mb-4 text-cyan-100/80">{project.description}</p>
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
                ))}
              </div>
            </section>

            {/* Experience Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-cyan-900/30">
                  <Briefcase size={20} className="text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-cyan-300">Experience</h2>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500"></div>

                <div className="space-y-8 relative">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="pl-12 relative">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-2 w-6 h-6 rounded-full border-2 border-cyan-500 bg-[#050A18]"></div>

                      <div className="backdrop-blur-sm p-6 rounded-lg border border-cyan-900/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-cyan-200">{exp.position}</h3>
                            <h4 className="text-lg text-cyan-300">{exp.company}</h4>
                          </div>
                          <div className="text-cyan-400 mt-2 md:mt-0 md:ml-4 md:text-right">
                            {exp.startDate} - {exp.endDate}
                          </div>
                        </div>
                        <p className="mb-4 text-cyan-100/80">{exp.description}</p>
                        <ul className="space-y-2 text-cyan-100/90">
                          {exp.bulletPoints.map((point, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 mr-2"></span>
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
          </div>
        </div>
      </main>
    </div>
  )
}
