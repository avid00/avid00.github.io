"use client"

import { Github, Linkedin, Mail, ExternalLink, Zap, Layers, Activity } from "lucide-react"
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

interface AbstractWavesTemplateProps {
  data: ResumeData
}

export default function AbstractWavesTemplate({ data }: AbstractWavesTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated waves background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const waves = [
      { amplitude: 50, frequency: 0.01, speed: 0.02, color: "rgba(255, 0, 128, 0.1)", phase: 0 },
      { amplitude: 30, frequency: 0.02, speed: 0.03, color: "rgba(0, 204, 255, 0.1)", phase: 2 },
      { amplitude: 20, frequency: 0.03, speed: 0.01, color: "rgba(255, 102, 0, 0.1)", phase: 4 },
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x += 5) {
          const y = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = wave.color
        ctx.fill()

        // Update phase for animation
        wave.phase += wave.speed
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
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white min-h-screen overflow-hidden">
      {/* Animated waves background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Header */}
      <header className="relative pt-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur opacity-75 animate-pulse"></div>
            <div className="relative px-6 py-3 bg-black rounded-lg">
              <h2 className="text-xl text-white">{data.personal.title}</h2>
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            {data.personal.name}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <a
              href={`mailto:${data.personal.email}`}
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-full border border-white/10 transition-colors"
            >
              <Mail size={18} className="text-pink-400 group-hover:text-pink-300" />
              <span>{data.personal.email}</span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-full border border-white/10 transition-colors"
            >
              <Github size={18} className="text-purple-400 group-hover:text-purple-300" />
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-full border border-white/10 transition-colors"
            >
              <Linkedin size={18} className="text-blue-400 group-hover:text-blue-300" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {/* Skills Section */}
        <section className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Zap size={24} className="text-pink-400" />
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-colors duration-500"></div>

                <h3 className="text-xl font-semibold mb-4 text-gradient bg-gradient-to-r from-pink-400 to-purple-400">
                  {skillGroup.name}
                </h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {skillGroup.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/10 text-white rounded-full text-sm border border-white/10 hover:border-white/30 hover:bg-white/15 transition-all duration-300"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        animation: "fadeIn 0.5s ease-out forwards",
                      }}
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
          <div className="flex items-center justify-center gap-3 mb-12">
            <Layers size={24} className="text-purple-400" />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>

          <div className="space-y-12">
            {data.projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden">
                {/* Card with hover effect */}
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 transform group-hover:scale-[0.98]">
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 -m-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur-sm animate-spin-slow"></div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-purple-400">
                      {project.name}
                    </h3>
                    <p className="mb-4 text-white/80">{project.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Github size={16} />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Activity size={24} className="text-blue-400" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 transform md:translate-x-px"></div>

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot with pulse effect */}
                  <div className="absolute left-0 md:left-1/2 top-0 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur opacity-50 animate-pulse"></div>
                      <div className="relative w-4 h-4 bg-black rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="md:w-1/2 pl-8 md:pl-0 md:pr-8 md:text-right">
                    <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm border border-white/10">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 pl-8">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-pink-400 to-purple-400">
                        {exp.position}
                      </h3>
                      <h4 className="text-lg text-white mb-4">{exp.company}</h4>
                      <p className="mb-4 text-white/80">{exp.description}</p>
                      <ul className="space-y-2 text-white/90">
                        {exp.bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-2 mr-2"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  )
}
