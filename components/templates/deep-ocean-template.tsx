import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

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

interface DeepOceanTemplateProps {
  data: ResumeData
}

export default function DeepOceanTemplate({ data }: DeepOceanTemplateProps) {
  return (
    <div className="bg-gradient-to-b from-blue-950 to-blue-900 text-white min-h-screen">
      {/* Bubbles animation */}
      <div className="bubble-container absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble absolute rounded-full bg-cyan-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <header className="relative max-w-5xl mx-auto pt-16 px-6 text-center">
        <div className="glow-effect absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <h1 className="text-5xl font-bold mb-2 text-cyan-100">{data.personal.name}</h1>
        <h2 className="text-2xl text-cyan-300 mb-6">{data.personal.title}</h2>

        <div className="flex justify-center gap-6 mb-12">
          <a
            href={`mailto:${data.personal.email}`}
            className="flex items-center gap-2 text-cyan-200 hover:text-cyan-400 transition-colors"
          >
            <Mail size={20} />
            <span>{data.personal.email}</span>
          </a>
          <a
            href={data.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-200 hover:text-cyan-400 transition-colors"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
          <a
            href={data.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-200 hover:text-cyan-400 transition-colors"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* Skills Section */}
        <section className="mb-16 relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
          <h2 className="text-3xl font-bold mb-8 text-cyan-300">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-800/50 hover:border-cyan-400/50 transition-all"
              >
                <h3 className="text-xl font-semibold mb-4 text-cyan-200">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-900/70 text-cyan-100 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16 relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
          <h2 className="text-3xl font-bold mb-8 text-cyan-300">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-800/50 hover:border-cyan-400/50 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-2 text-cyan-200">{project.name}</h3>
                <p className="mb-4 text-cyan-100/80">{project.description}</p>
                <div className="flex gap-4">
                  <a
                    href={project.deployedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-300 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-300 hover:text-cyan-400 transition-colors"
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
        <section className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
          <h2 className="text-3xl font-bold mb-8 text-cyan-300">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-800/50 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-200">{exp.position}</h3>
                    <h4 className="text-lg text-cyan-300">{exp.company}</h4>
                  </div>
                  <div className="text-cyan-400 mt-2 md:mt-0">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="mb-4 text-cyan-100/80">{exp.description}</p>
                <ul className="list-disc list-inside space-y-2 text-cyan-100/90">
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .bubble {
          animation: rise linear infinite;
          opacity: 0.6;
        }
        
        @keyframes rise {
          0% {
            bottom: -100px;
            opacity: 0.6;
          }
          100% {
            bottom: 100vh;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
