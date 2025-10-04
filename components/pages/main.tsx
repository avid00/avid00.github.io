"use client"
import { Github, Linkedin, Mail, ExternalLink, Cpu, Code, Terminal, Zap, FileText } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import PdfModal from "@/components/pdf-viewer"




interface ResumeData {
  personal: {
    name: string
    title: string
    email: string
    github: string
    linkedin: string
    resume: string
  }
  projects: {
  name: string
  description: string
  deployedLink?: string
  githubUrl?: string
  reports?: { title: string; href: string }[]   
  images?:{src: string; alt?: string}[]
}[]

  skills: {
    name: string
    skills: string[]
  }[]
  // experience?: {
  //   position: string
  //   company: string
  //   startDate: string
  //   endDate: string
  //   description: string
  //   bulletPoints: string[]
  // }[]
}

interface NeonGridTemplateProps {
  data: ResumeData
 only?: "projects" | "skills" | null
}

export default function NeonGridTemplate({ data, only = null }: NeonGridTemplateProps) {


// export default function NeonGridTemplate({ data }: NeonGridTemplateProps) {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section based on scroll position
      const sections = document.querySelectorAll(".section-marker")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Grid animation
  useEffect(() => {
    const canvas = gridCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 2 // Make canvas taller for scrolling effect
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid properties
    const gridSize = 50
    const lineWidth = 1

    // Animation properties
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal grid lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)

        // Calculate distance from center for glow effect
        const distFromCenter = Math.abs(y - (scrollY + window.innerHeight / 2)) / window.innerHeight
        const alpha = Math.max(0.05, 1 - distFromCenter * 2)

        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)

        // Calculate distance from center for glow effect
        const distFromCenter = Math.abs(x - canvas.width / 2) / canvas.width
        const alpha = Math.max(0.05, 1 - distFromCenter * 2)

        ctx.strokeStyle = `rgba(255, 0, 255, ${alpha})`
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw pulsing effect at intersections
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5
          const size = pulse * 2 + 1

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.3})`
          ctx.fill()
        }
      }

      time += 0.02
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [scrollY])

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden font-mono">
      {/* Grid background */}
      <canvas
        ref={gridCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ transform: `translateY(${-scrollY * 0.5}px)` }}
      />

      {/* Glowing overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-fuchsia-900/20 via-transparent to-cyan-900/20 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-32 right-8 z-30 hidden lg:block">
        <ul className="space-y-6">
          {["header", "skills", "projects"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`flex items-center gap-3 group transition-all duration-300 ${
                  activeSection === section ? "text-cyan-400" : "text-gray-500 hover:text-white"
                }`}
              >
                <span
                  className={`block w-2 h-8 transition-all duration-300 ${
                    activeSection === section ? "bg-cyan-400" : "bg-gray-700 group-hover:bg-gray-400"
                  }`}
                ></span>
                <span className="uppercase text-xs tracking-widest">{section}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Header */}
      {!only && (
      <header id="header" className="section-marker relative pt-32 px-6 z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="glitch-container relative mb-4 inline-block">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter glitch-text" data-text={data.personal.name}>
              {data.personal.name}
            </h1>
            <div className="absolute inset-0 glitch-effect"></div>
          </div>

          <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-fuchsia-600 mb-6"></div>

          <h2 className="text-2xl md:text-3xl text-cyan-400 font-light mb-12 tracking-wide">
            <span className="typing-animation">{data.personal.title}</span>
            <span className="inline-block w-3 h-6 bg-cyan-400 animate-blink ml-1"></span>
          </h2>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href={`mailto:${data.personal.email}`}
              className="group flex items-center gap-2 px-4 py-2 bg-black border border-cyan-500 hover:bg-cyan-900/30 transition-colors duration-300"
            >
              <Mail size={18} className="text-cyan-400" />
              <span className="text-cyan-100 group-hover:text-cyan-300 transition-colors duration-300">
                {data.personal.email}
              </span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-black border border-fuchsia-500 hover:bg-fuchsia-900/30 transition-colors duration-300"
            >
              <Github size={18} className="text-fuchsia-400" />
              <span className="text-fuchsia-100 group-hover:text-fuchsia-300 transition-colors duration-300">
                GitHub
              </span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-black border border-cyan-500 hover:bg-cyan-900/30 transition-colors duration-300"
            >
              <Linkedin size={18} className="text-cyan-400" />
              <span className="text-cyan-100 group-hover:text-cyan-300 transition-colors duration-300">LinkedIn</span>
            </a>
            <a
              href={data.personal.resume}
              download="amisha_resume.pdf"
              // target="_blank"
              // rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-black border border-cyan-500 hover:bg-cyan-900/30 transition-colors duration-300"
            >
              <FileText size={18} className="text-cyan-400" />
              <span className="text-cyan-100 group-hover:text-cyan-300 transition-colors duration-300">Download Resume</span>
            </a>
          </div>

          <div className="animate-bounce">
            <a href="#skills" className="inline-block">
              <div className="border border-white/20 p-2 rounded-full">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/80 rounded-full mt-1 animate-scroll-down"></div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </header>
      )}


      <main className="relative z-10">
        {/* Skills Section */}
        {(only === null || only === "skills") && (
        <section id="skills" className="section-marker relative px-6 py-32 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-16">
              <Cpu size={28} className="text-cyan-400 mr-4" />
              <h2 className="text-3xl font-bold tracking-tight uppercase">Skills</h2>
              <div className="ml-4 h-px flex-grow bg-gradient-to-r from-cyan-500 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.skills.map((skillGroup, index) => (
                <div
                  key={index}
                  className="group border border-gray-800 hover:border-cyan-500/50 bg-black/80 backdrop-blur-sm p-8 transition-all duration-500"
                >
                  <h3 className="text-xl font-semibold mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                    <span className="inline-block w-2 h-6 bg-fuchsia-500 mr-3"></span>
                    {skillGroup.name}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 border border-gray-800 group-hover:border-cyan-800 text-gray-300 group-hover:text-cyan-100 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-8 h-1 bg-cyan-500"></div>
                    <div className="absolute top-0 right-0 w-1 h-8 bg-cyan-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Projects Section */}
{(only === null || only === "projects") && (
  <section id="projects" className="section-marker relative px-6 py-32 z-10">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-16">
        <Code size={28} className="text-fuchsia-400 mr-4" />
        <h2 className="text-3xl font-bold tracking-tight uppercase">Projects</h2>
        <div className="ml-4 h-px flex-grow bg-gradient-to-r from-fuchsia-500 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.projects.map((project, index) => (
          <div
            key={index}
            className="group relative border border-gray-800 hover:border-fuchsia-500/50 bg-black/80 backdrop-blur-sm p-8 transition-all duration-500"
          >
            {/* Decorative lines */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-fuchsia-500 group-hover:w-full transition-all duration-700"></div>
            <div className="absolute bottom-0 right-0 w-0 h-1 bg-cyan-500 group-hover:w-full transition-all duration-700"></div>

            <h3 className="text-2xl font-semibold mb-4 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300">
              {project.name}
            </h3>
{/* Images (optional) */}
{project.images && project.images.length > 0 && (
  <div
    className={
      project.images.length === 1
        ? "mb-6 w-full" // single image full width
        : "mb-6 grid grid-cols-2 gap-3" // multiple images in grid
    }
  >
    {project.images.map((img, i) => (
      <div
        key={i}
        className={`relative overflow-hidden border border-gray-800 group-hover:border-fuchsia-500/30 transition-colors ${
          project.images?.length === 1 ? "w-full" : "aspect-video"
        }`}
      >
        <img
          src={img.src}
          alt={img.alt ?? `${project.name} image ${i + 1}`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    ))}
  </div>
)}


            <p className="mb-6 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {project.description}
            </p>

            {/* Reports row (if any) */}
            {project.reports && project.reports.length > 0 && (
              <div className="flex flex-wrap gap-3">
  {project.reports?.map((r, i) => (
    <a
      key={i}
      href={r.href}                   // NOTE: starts with "/"
      target="_blank"
      rel="noopener noreferrer"
      className="px-3 py-1 text-sm border border-cyan-600/40 rounded hover:bg-cyan-900/10"
    >
      {r.title}
    </a>
  ))}
</div>

            )}

            {/* Action links */}
            <div className="flex gap-6 flex-wrap">
              {project.deployedLink && (
                <a
                  href={project.deployedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black border border-fuchsia-500/50 hover:border-fuchsia-500 hover:bg-fuchsia-900/20 transition-all duration-300"
                >
                  <ExternalLink size={16} className="text-fuchsia-400" />
                  <span className="text-fuchsia-100">Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black border border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-900/20 transition-all duration-300"
                >
                  <Github size={16} className="text-cyan-400" />
                  <span className="text-cyan-100">GitHub</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}


        
      </main>

      <style jsx global>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translateY(6px); opacity: 0; }
        }
        
        .glitch-text {
          position: relative;
          color: white;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip: rect(0, 0, 0, 0);
        }
        
        .glitch-text::before {
          left: -2px;
          text-shadow: 2px 0 #ff00ff;
          animation: glitch 1s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: 2px;
          text-shadow: -2px 0 #00ffff;
          animation: glitch 0.7s infinite linear alternate-reverse;
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
