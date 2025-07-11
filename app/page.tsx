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
import TemplateSelector from "@/components/template-selector"

// Sample resume data
const sampleResumeData = {
  personal: {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex@example.com",
    github: "https://github.com/alexj",
    linkedin: "https://linkedin.com/in/alexj",
  },
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
      deployedLink: "https://ecommerce.example.com",
      githubUrl: "https://github.com/alexj/ecommerce",
    },
    {
      name: "Weather App",
      description: "Developed a weather application using React and OpenWeatherMap API.",
      deployedLink: "https://weather.example.com",
      githubUrl: "https://github.com/alexj/weather-app",
    },
  ],
  skills: [
    {
      name: "Frontend",
      skills: ["React", "Vue.js", "HTML5", "CSS3", "JavaScript"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL"],
    },
  ],
  experience: [
    {
      position: "Senior Developer",
      company: "Tech Innovations Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "Lead developer for multiple high-impact projects.",
      bulletPoints: [
        "Architected and implemented scalable solutions for enterprise clients",
        "Mentored junior developers and conducted code reviews",
        "Improved system performance by 40% through optimizations",
      ],
    },
    {
      position: "Full Stack Developer",
      company: "StartUp Solutions",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      description: "Full stack developer working on various client projects.",
      bulletPoints: [
        "Developed and maintained client websites using React and Node.js",
        "Implemented responsive designs and ensured cross-browser compatibility",
        "Integrated third-party APIs and services into applications",
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
    {
      id: "cubism-flow",
      name: "Cubism Flow",
      description: "Overlapping geometric shapes with isometric elements and flowing animations",
    },
    {
      id: "geometric-fusion",
      name: "Geometric Fusion",
      description: "Modern design with dynamic polygons and bold colors",
    },
    {
      id: "abstract-mosaic",
      name: "Abstract Mosaic",
      description: "Fluid shapes and vibrant color transitions",
    },
    {
      id: "bioluminescent-abyss",
      name: "Bioluminescent Abyss",
      description: "Dark depths with glowing neon elements and particle animations",
    },
    {
      id: "tropical-lagoon",
      name: "Tropical Lagoon",
      description: "Vibrant turquoise with flowing water animations and tropical accents",
    },
    {
      id: "ocean-sunset",
      name: "Ocean Sunset",
      description: "Warm sunset gradients with gentle wave animations",
    },
    {
      id: "deep-ocean",
      name: "Deep Ocean",
      description: "Dark blues with bioluminescent accents",
    },
    {
      id: "coral-reef",
      name: "Coral Reef",
      description: "Vibrant blues with coral accents",
    },
    {
      id: "coastal-waters",
      name: "Coastal Waters",
      description: "Light blues with sandy/beachy elements",
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

  return (
    <main className="min-h-screen">
      <TemplateSelector
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
      />
      <div className="mt-8 pt-4">{renderTemplate()}</div>
    </main>
  )
}
