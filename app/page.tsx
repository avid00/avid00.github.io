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
    },

    {
      name: "Data Reports",
            reports: [
    { title: "1. As Above So Below: How NASA’s Space Technology Saved Millions of Lives", href: "/reports/RMD/nasa.pdf" },
    { title: "2. Growth on Paper, Loss on the Ground: Crops, Global Warming, and Farmer Incomes", href: "/reports/RMD/wheat.pdf" },
  ],
      description: "Reports | R/Rstudio/RMD, LaTeX",
    },

    {
      name: "Distributed ETL Streaming Pipeline for Astroinformatics",
      images: [
        {src: "/images/etl.png"},
      ],
      description: "A production-style streaming ETL pipeline built for astroinformatics. The system ingests survey CSVs via Kafka, processes them with Spark streaming, writes normalized tables to PostgreSQL (with pgAdmin), and exposes interactive analysis via Jupyter — all reproducible with Docker Swarm and a Makefile for quick deployment.",
      githubUrl: "https://github.com/avid00/Spark-Kafka-PostgreSQL-Jupyter-Streaming-Service-with-Docker-Swarm",
    },

    {
      name: "CNN to Classify Galaxies",
      description: "Convolutional Neural Network (CNN) for classifying galaxy morphologies using the Galaxy10 dataset. The project utilizes TensorFlow for building and training the model and follows standard preprocessing steps to ensure efficient data handling and model performance.",
      deployedLink: "https://cnnapp-amisha.streamlit.app/%255D%28https:/cnnapp-amisha.streamlit.app/",
      githubUrl: "https://github.com/avid00/Basic-Galaxy-Morphology-CNN?tab=readme-ov-file",
    },
    //  {
    //   name: "Plasmalead",
    //   description: "xxxxxxxxxxxxxx",
    //   //plasmalead video
    //   deployedLink: "xxxxxxxxxxxxxx",
    //   githubUrl: "https://github.com/Ishj21/coviguard",
    // },
    {
      name: "Gametrax",
      description: "Full Stack development of an Android app (built with Flutter/Dart + Firebase + Figma) that helps gamers search, track and organise games, view latest gaming news, and check basic store info — all in one place.",
      reports: [
    { title: "Concept Presentation", href: "/gametrax/presentation.pdf" },
    { title: "Software Requirement Specificatoin (SRS)", href: "/gametrax/report.pdf" },
  
  ],
  images: [
        {src: "/gametrax/1.png"},
        {src: "/gametrax/2.png"},
        {src: "/gametrax/3.png"},

      ],
      deployedLink: "https://youtu.be/uQ6j9-H9pJU",
      githubUrl: "https://github.com/avid00/Gametrax/tree/second",
    },
    {
      name: "EDHREC to Archidekt Python Script",
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
  // experience: [
  //   {
  //     position: "1xxxxxxxxx",
  //     company: "xxxxxxxxx",
  //     startDate: "xxxxxxxxx",
  //     endDate: "xxxxxxxxx",
  //     description: "xxxxxxxxx",
  //     bulletPoints: [
  //       "xxxxxxxxx",
  //       "xxxxxxxxx",
  //       "xxxxxxxxx",

  //     ],
  //   },
  // ],
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
