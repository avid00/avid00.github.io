"use client"

import { Github, Linkedin, Mail, ExternalLink, Anchor, Compass, Map } from "lucide-react"
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

interface TropicalLagoonTemplateProps {
  data: ResumeData
}

export default function TropicalLagoonTemplate({ data }: TropicalLagoonTemplateProps) {
  const waterCanvasRef = useRef<HTMLCanvasElement>(null)

  // Water animation
  useEffect(() => {
    const canvas = waterCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 300

    let time = 0
    const waves = 3
    const waveAmplitude = [15, 8, 5]
    const waveFrequency = [0.02, 0.04, 0.06]
    const waveSpeed = [0.01, 0.02, 0.03]
    const colors = ["rgba(0, 191, 255, 0.3)", "rgba(64, 224, 208, 0.3)", "rgba(127, 255, 212, 0.3)"]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let w = 0; w < waves; w++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * waveFrequency[w] + time * waveSpeed[w]) * waveAmplitude[w] + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = colors[w]
        ctx.fill()
      }

      time += 0.05
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="bg-gradient-to-b from-sky-400 to-cyan-600 text-white min-h-screen">
      {/* Header with water animation */}
      <header className="relative pt-16 pb-32 px-6 overflow-hidden">
        <canvas ref={waterCanvasRef} className="absolute bottom-0 left-0 w-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-block p-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-sm font-medium">
              {data.personal.title}
            </div>
          </div>

          <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-md">{data.personal.name}</h1>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href={`mailto:${data.personal.email}`}
              className="flex items-center gap-2 text-white hover:text-teal-100 transition-colors"
            >
              <Mail size={20} className="text-teal-200" />
              <span>{data.personal.email}</span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-teal-100 transition-colors"
            >
              <Github size={20} className="text-teal-200" />
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-teal-100 transition-colors"
            >
              <Linkedin size={20} className="text-teal-200" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative -mt-16 z-10">
        <div className="max-w-5xl mx-auto px-6 pb-20">
          {/* Main content container */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            {/* Skills Section */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-full bg-teal-500/20">
                  <Compass size={24} className="text-teal-200" />
                </div>
                <h2 className="text-3xl font-bold text-white">Skills</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.skills.map((skillGroup, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-teal-200">{skillGroup.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-teal-500/20 text-white rounded-full text-sm border border-teal-500/30"
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
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-full bg-teal-500/20">
                  <Anchor size={24} className="text-teal-200" />
                </div>
                <h2 className="text-3xl font-bold text-white">Projects</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-teal-200 transition-colors">
                        {project.name}
                      </h3>
                      <p className="mb-4 text-white/80">{project.description}</p>
                      <div className="flex gap-4">
                        <a
                          href={project.deployedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-teal-200 hover:text-white transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-teal-200 hover:text-white transition-colors"
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
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-full bg-teal-500/20">
                  <Map size={24} className="text-teal-200" />
                </div>
                <h2 className="text-3xl font-bold text-white">Experience</h2>
              </div>

              <div className="space-y-8">
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                        <h4 className="text-lg text-teal-200">{exp.company}</h4>
                      </div>
                      <div className="text-white/70 mt-2 md:mt-0 md:ml-4 md:text-right">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="mb-4 text-white/80">{exp.description}</p>
                    <ul className="space-y-2 text-white/90">
                      {exp.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-2 h-2 rounded-full bg-teal-400 mt-2 mr-2"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
