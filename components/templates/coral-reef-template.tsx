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

interface CoralReefTemplateProps {
  data: ResumeData
}

export default function CoralReefTemplate({ data }: CoralReefTemplateProps) {
  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white min-h-screen">
      {/* Coral reef decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="coral-1 absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-tr-full"></div>
        <div className="coral-2 absolute bottom-0 left-40 w-24 h-40 bg-orange-500/20 rounded-t-full"></div>
        <div className="coral-3 absolute bottom-0 right-20 w-36 h-48 bg-yellow-500/20 rounded-t-full"></div>
        <div className="coral-4 absolute bottom-0 right-0 w-28 h-36 bg-pink-500/20 rounded-tl-full"></div>

        {/* Fish animations */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="fish absolute"
            style={{
              top: `${20 + Math.random() * 60}%`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className="w-4 h-2 bg-orange-400 rounded-full"></div>
            <div className="w-2 h-3 bg-orange-400 absolute -right-1 top-50 transform -translate-y-1/2 triangle"></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative max-w-5xl mx-auto pt-16 px-6">
        <div className="bg-blue-700/70 backdrop-blur-sm p-8 rounded-lg border-2 border-blue-500/50 text-center">
          <h1 className="text-5xl font-bold mb-2 text-white">{data.personal.name}</h1>
          <h2 className="text-2xl text-blue-200 mb-6">{data.personal.title}</h2>

          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a
              href={`mailto:${data.personal.email}`}
              className="flex items-center gap-2 text-blue-200 hover:text-pink-300 transition-colors"
            >
              <Mail size={20} />
              <span>{data.personal.email}</span>
            </a>
            <a
              href={data.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-200 hover:text-pink-300 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-200 hover:text-pink-300 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 grid gap-8">
        {/* Skills Section */}
        <section className="bg-blue-700/70 backdrop-blur-sm p-8 rounded-lg border-2 border-blue-500/50">
          <h2 className="text-3xl font-bold mb-8 text-pink-300 flex items-center">
            <span className="w-8 h-8 bg-pink-500 rounded-full mr-3"></span>
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="bg-blue-800/50 p-6 rounded-lg border border-blue-400/30">
                <h3 className="text-xl font-semibold mb-4 text-orange-300">{skillGroup.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-600/70 text-white rounded-full text-sm border border-blue-400/30"
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
        <section className="bg-blue-700/70 backdrop-blur-sm p-8 rounded-lg border-2 border-blue-500/50">
          <h2 className="text-3xl font-bold mb-8 text-orange-300 flex items-center">
            <span className="w-8 h-8 bg-orange-500 rounded-full mr-3"></span>
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {data.projects.map((project, index) => (
              <div key={index} className="bg-blue-800/50 p-6 rounded-lg border border-blue-400/30">
                <h3 className="text-2xl font-semibold mb-2 text-pink-200">{project.name}</h3>
                <p className="mb-4 text-blue-100">{project.description}</p>
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
        <section className="bg-blue-700/70 backdrop-blur-sm p-8 rounded-lg border-2 border-blue-500/50">
          <h2 className="text-3xl font-bold mb-8 text-yellow-300 flex items-center">
            <span className="w-8 h-8 bg-yellow-500 rounded-full mr-3"></span>
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="bg-blue-800/50 p-6 rounded-lg border border-blue-400/30">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-pink-200">{exp.position}</h3>
                    <h4 className="text-lg text-blue-200">{exp.company}</h4>
                  </div>
                  <div className="text-yellow-300 mt-2 md:mt-0">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="mb-4 text-blue-100">{exp.description}</p>
                <ul className="list-disc list-inside space-y-2 text-blue-100">
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
        .fish {
          animation: swim linear infinite;
        }
        
        .triangle {
          clip-path: polygon(0 0, 0 100%, 100% 50%);
        }
        
        @keyframes swim {
          0% {
            left: -30px;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  )
}
