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
    name: "Data Dashboards",
    reports: [
    { title: "1. Insights Into Earthquakes Data", href: "https://amishadas.shinyapps.io/quakes-data-insightful-plots/" },
    { title: "2. Cool FIFA Facts ", href: "https://public.tableau.com/views/FIFAPROJECT_16769275033780/FIFAReportforFans?:language=en-US&:sid=&:redirect=auth&showOnboarding=true&:display_count=n&:origin=viz_share_link" },
    { title: "3. Employee Attrition Insights", href: "  https://public.tableau.com/views/AttritionProject_16754448584050/AttritionatXYZ?:language=en-US&:sid=&:redirect=auth&showOnboarding=true&:display_count=n&:origin=viz_share_link" },
    { title: "4. Spectroscopy Lab", href: "https://amishadas.shinyapps.io/spectroscopy_lab/" },
  ],
      description: "Data Analysis Dashboards | Tableau, R/RStudio, Shiny",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "xxxxxxxxxxxxxx",
    },
    {
      name: "Data Reports",
            reports: [
    { title: "1. As Above So Below: How NASA’s Space Technology Saved Millions of Lives", href: "/reports/RMD/nasa.pdf" },
    { title: "2. Growth on Paper, Loss on the Ground: Crops, Global Warming, and Farmer Incomes", href: "/reports/RMD/wheat.pdf" },
  ],
      description: "Reports | R/Rstudio/RMD, LaTeX",
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
      reports: [
    { title: "View Video", href: "/reports/RMD/nasa.pdf" },
  ],
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
      skills: ["XGBoost/Decision Trees","MLP and MC-Dropout","CNN","LLM"],
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
