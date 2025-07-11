import { Github, Linkedin, Mail, ExternalLink, Sunset, Layers, Clock } from "lucide-react"

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

interface OceanSunsetTemplateProps {
  data: ResumeData
}

export default function OceanSunsetTemplate({ data }: OceanSunsetTemplateProps) {
  return (
    <div className="bg-gradient-to-b from-orange-400 via-pink-500 to-purple-700 text-white min-h-screen">
      {/* Wave decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="wave-1 absolute bottom-0 left-0 right-0 h-24 bg-purple-800/30 animate-wave-slow"></div>
        <div className="wave-2 absolute bottom-0 left-0 right-0 h-16 bg-purple-700/30 animate-wave-medium"></div>
        <div className="wave-3 absolute bottom-0 left-0 right-0 h-12 bg-purple-600/30 animate-wave-fast"></div>
      </div>

      {/* Header */}
      <header className="relative pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="sun-circle mx-auto mb-8 w-24 h-24 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/30"></div>

          <h1 className="text-6xl font-bold mb-2 text-white">{data.personal.name}</h1>
          <h2 className="text-2xl text-orange-100 mb-8">{data.personal.title}</h2>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a
              href={`mailto:${data.personal.email}`}
              className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors"
            >
              <Mail size={20} />
              <span>{data.personal.email}</span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-orange-200 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {/* Skills Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Layers size={24} className="text-orange-300" />
            <h2 className="text-3xl font-bold text-white">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4 text-orange-200">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-900/30 text-orange-100 rounded-full text-sm border border-purple-500/30"
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
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sunset size={24} className="text-orange-300" />
            <h2 className="text-3xl font-bold text-white">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-2xl font-semibold mb-2 text-orange-200">{project.name}</h3>
                <p className="mb-4 text-white/80">{project.description}</p>
                <div className="flex gap-4">
                  <a
                    href={project.deployedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-orange-300 hover:text-orange-200 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-orange-300 hover:text-orange-200 transition-colors"
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
          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock size={24} className="text-orange-300" />
            <h2 className="text-3xl font-bold text-white">Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 to-purple-500 transform md:translate-x-px"></div>

            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-orange-400 border-2 border-white transform -translate-x-2 md:-translate-x-2.5"></div>

                  {/* Date */}
                  <div className="md:w-1/2 pl-8 md:pl-0 md:pr-8 md:text-right">
                    <div className="inline-block px-4 py-1 rounded-full bg-purple-900/30 text-orange-200 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 pl-8">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                      <h3 className="text-xl font-semibold text-orange-200">{exp.position}</h3>
                      <h4 className="text-lg text-white mb-4">{exp.company}</h4>
                      <p className="mb-4 text-white/80">{exp.description}</p>
                      <ul className="space-y-2 text-white/90">
                        {exp.bulletPoints.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-2 h-2 rounded-full bg-orange-400 mt-2 mr-2"></span>
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
        .wave-1, .wave-2, .wave-3 {
          border-radius: 100% 100% 0 0;
        }
        
        @keyframes wave-slow {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          50% {
            transform: translateY(-10px) scaleX(1.05);
          }
        }
        
        @keyframes wave-medium {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          50% {
            transform: translateY(-15px) scaleX(1.03);
          }
        }
        
        @keyframes wave-fast {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          50% {
            transform: translateY(-8px) scaleX(1.02);
          }
        }
        
        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }
        
        .animate-wave-medium {
          animation: wave-medium 6s ease-in-out infinite;
        }
        
        .animate-wave-fast {
          animation: wave-fast 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
