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

interface CoastalWatersTemplateProps {
  data: ResumeData
}

export default function CoastalWatersTemplate({ data }: CoastalWatersTemplateProps) {
  return (
    <div className="bg-gradient-to-b from-sky-300 to-blue-400 min-h-screen text-blue-900">
      {/* Wave decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="wave-1 absolute bottom-0 left-0 right-0 h-24 bg-blue-300/50"></div>
        <div className="wave-2 absolute bottom-0 left-0 right-0 h-16 bg-blue-200/50"></div>
        <div className="wave-3 absolute bottom-0 left-0 right-0 h-8 bg-amber-100/50"></div>

        {/* Seagulls */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="seagull absolute"
            style={{
              top: `${10 + Math.random() * 20}%`,
              left: `${Math.random() * 80}%`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            <div className="w-4 h-1 bg-white relative">
              <div className="absolute w-2 h-1 bg-white -left-2 -top-0.5 transform rotate-45"></div>
              <div className="absolute w-2 h-1 bg-white -right-2 -top-0.5 transform -rotate-45"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative max-w-5xl mx-auto pt-16 px-6">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-5xl font-bold mb-2 text-blue-700">{data.personal.name}</h1>
          <h2 className="text-2xl text-blue-500 mb-6">{data.personal.title}</h2>

          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a
              href={`mailto:${data.personal.email}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Mail size={20} />
              <span>{data.personal.email}</span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 grid gap-8">
        {/* Skills Section */}
        <section className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-blue-700 border-b-2 border-blue-200 pb-2">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm border border-blue-200"
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
        <section className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-blue-700 border-b-2 border-blue-200 pb-2">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2 text-blue-600">{project.name}</h3>
                <p className="mb-4 text-blue-800">{project.description}</p>
                <div className="flex gap-4">
                  <a
                    href={project.deployedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors"
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
        <section className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-blue-700 border-b-2 border-blue-200 pb-2">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">{exp.position}</h3>
                    <h4 className="text-lg text-blue-500">{exp.company}</h4>
                  </div>
                  <div className="text-blue-400 mt-2 md:mt-0">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="mb-4 text-blue-800">{exp.description}</p>
                <ul className="list-disc list-inside space-y-2 text-blue-800">
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
        .wave-1 {
          border-radius: 100% 100% 0 0;
        }
        
        .wave-2 {
          border-radius: 100% 100% 0 0;
        }
        
        .wave-3 {
          border-radius: 100% 100% 0 0;
        }
        
        .seagull {
          animation: fly 20s linear infinite;
        }
        
        @keyframes fly {
          0% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(50px) translateY(-20px);
          }
          50% {
            transform: translateX(100px) translateY(0);
          }
          75% {
            transform: translateX(50px) translateY(20px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
