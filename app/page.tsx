"use client"
import { useState } from "react"
import DeepOceanTemplate from "@/components/templates/deep-ocean-template"
import CoralReefTemplate from "@/components/templates/coral-reef-template"
import CoastalWatersTemplate from "@/components/templates/coastal-waters-template"
import BioluminescentAbyssTemplate from "@/components/templates/bioluminescent-abyss-template"
import TropicalLagoonTemplate from "@/components/templates/tropical-lagoon-template"
import OceanSunsetTemplate from "@/components/templates/ocean-sunset-template"
import GeometricFusionTemplate from "@/components/templates/geometric-fusion-template"
import AbstractMosaicTemplate from "@/components/templates/abstract-mosaic-template"
import NeonGridTemplate from "@/components/templates/neon-grid-template"
import CubismFlowTemplate from "@/components/templates/cubism-flow-template"
// import TemplateSelector from "@/components/template-selector"

// Sample resume data
const sampleResumeData = {
  personal: {
    name: "Amisha Das",
    title: "Passionate Data Scientist, Astroinformatician and Developer",
    email: "amishav.das@gmail.com",
    github: "https://github.com/avid00",
    linkedin: "https://linkedin.com/amisha-victoria-das",
  },
  projects: [
    {
      name: "xxxxxxxxxxxxxx",
      description: "xxxxxxxxxxxxxx",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "xxxxxxxxxxxxxx",
    },
     {
      name: "xxxxxxxxxxxxxx",
      description: "xxxxxxxxxxxxxx",
      deployedLink: "xxxxxxxxxxxxxx",
      githubUrl: "xxxxxxxxxxxxxx",
    },
  ],
  skills: [
    {
      name: "Astroinformatics and Data Science",
      skills: ["Python", "PyTorch", "SQL, astroquery", "Jupyter Lab", "RStudio/RMD","MongoDB",],
    },
    {
      name: "Machine Learning",
      skills: ["XGBoost/Decision Trees","MLP and Dropout","CNN",],
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
      case "deep-ocean":
        return <DeepOceanTemplate data={sampleResumeData} />
      case "coral-reef":
        return <CoralReefTemplate data={sampleResumeData} />
      case "coastal-waters":
        return <CoastalWatersTemplate data={sampleResumeData} />
      case "bioluminescent-abyss":
        return <BioluminescentAbyssTemplate data={sampleResumeData} />
      case "tropical-lagoon":
        return <TropicalLagoonTemplate data={sampleResumeData} />
      case "ocean-sunset":
        return <OceanSunsetTemplate data={sampleResumeData} />
      case "geometric-fusion":
        return <GeometricFusionTemplate data={sampleResumeData} />
      case "abstract-mosaic":
        return <AbstractMosaicTemplate data={sampleResumeData} />
      case "neon-grid":
        return <NeonGridTemplate data={sampleResumeData} />
      case "cubism-flow":
        return <CubismFlowTemplate data={sampleResumeData} />
      default:
        return <NeonGridTemplate data={sampleResumeData} />
    }
  }

  // return (
  //   <main className="min-h-screen">
  //     <TemplateSelector
  //       templates={templates}
  //       selectedTemplate={selectedTemplate}
  //       onSelectTemplate={setSelectedTemplate}
  //     />
  //     <div className="mt-8 pt-4">{renderTemplate()}</div>
  //   </main>
  // )
}
