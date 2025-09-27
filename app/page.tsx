"use client"
import { useState } from "react"
import NeonGridTemplate from "@/components/pages/main"
import PdfModal from "@/components/pdf-viewer"


const sampleResumeData = {
  personal: {
    name: "Amisha Das",
    title: "Passionate Data Scientist, Astroinformatician and Developer",
    email: "amishav.das@gmail.com",
    github: "https://github.com/avid00",
    linkedin: "https://linkedin.com/in/amisha-victoria-das",
    resume: "/amisha_resume.pdf"
  },
  projects: [
    {
      name: "Data Dashboards and Reports",
      //shiny dashboard for earth quake
      // 2 RMD Reporting
      // report: "As Above So Below: How NASA’s Space Technology Saved Millions of Lives",
      // report: "Growth on Paper, Loss on the Ground: Crops, Global Warming, and Farmer Incomes",
      reports: [
    { title: "As Above So Below: How NASA’s Space Technology Saved Millions of Lives", href: "/reports/nasa.pdf" },
    { title: "Growth on Paper, Loss on the Ground: Crops, Global Warming, and Farmer Incomes", href: "/reports/wheat.pdf" },

  ],
      description: "xxxxxxxxxxxxxx",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "xxxxxxxxxxxxxx",
    },
    {
      name: "Roleplay Chatbot",
      description: "xxxxxxxxxxxxxx",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "xxxxxxxxxxxxxx",
    },
     {
      name: "Plasmalead",
      description: "xxxxxxxxxxxxxx",
      //plasmalead video
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "https://github.com/Ishj21/coviguard",
    },
    {
      name: "Gametrax",
      description: "xxxxxxxxxxxxxx (add link to thesis)",
      //demo + thesis
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "https://github.com/avid00/Gametrax/tree/second",
    },
    {
      name: "EDHREC to Archidekt Python Script",
      description: "Converts any EDHREC deck JSON into a clean card list (.txt) for importing into Archidekt (or really any other deck-building platform).",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "https://github.com/avid00/edhrec-to-archidekt/tree/main",
    },
     {
      name: "Master's Thesis:",
      description: "Converts any EDHREC deck JSON into a clean card list (.txt) for importing into Archidekt (or really any other deck-building platform).",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "https://github.com/avid00/edhrec-to-archidekt/tree/main",
    },
  ],
  skills: [
    {
      name: "Astroinformatics and Data Science",
      skills: ["Python", "PyTorch", "Statistics", "SQL, astroquery", "Jupyter Lab", "RStudio/RMD","MongoDB",],
    },
    {
      name: "Machine Learning",
      skills: ["XGBoost/Decision Trees","MLP and MC-Dropout","CNN","\LLM"],
    },
  ],
  experience: [
    {
      position: "1xxxxxxxxx",
      company: "xxxxxxxxx",
      startDate: "xxxxxxxxx",
      endDate: "xxxxxxxxx",
      description: "xxxxxxxxx",
      bulletPoints: [
        "xxxxxxxxx",
        "xxxxxxxxx",
        "xxxxxxxxx",

      ],
    },
    {
      position: "1xxxxxxxxx",
      company: "xxxxxxxxx",
      startDate: "xxxxxxxxx",
      endDate: "xxxxxxxxx",
      description: "xxxxxxxxx",
      bulletPoints: [
        "xxxxxxxxx",
        "xxxxxxxxx",
        "xxxxxxxxx",

      ],
    },
  ],
}

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("neon-grid")

  const templates = [
    {
      id: "neon-grid",
      name: "Neon Grid",
      description: "Cyberpunk-inspired design with neon grid lines and glowing elements",
    },
  
  ]

  const renderTemplate = () => {
    switch (selectedTemplate) {
  
      case "neon-grid":
        return <NeonGridTemplate data={sampleResumeData} />
      default:
        return <NeonGridTemplate data={sampleResumeData} />
    }
  }

   return (
    <main className="min-h-screen">
      <NeonGridTemplate data={sampleResumeData} />
    </main>
  )
}
