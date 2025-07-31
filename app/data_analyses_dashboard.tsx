// /app/dashboard/page.tsx
"use client"
import NeonGridTemplate from "@/components/pages/main"

const dashboardData = {
  personal: {
    name: "Amisha Das",
    title: "Data Analysis Projects",
    email: "amishav.das@gmail.com",
    github: "https://github.com/avid00",
    linkedin: "https://linkedin.com/in/amisha-victoria-das",
    resume: "/amisha_resume.pdf",
  },
  projects: [
    {
      name: "Earthquake Dashboard",
      description: "Interactive R Shiny dashboard for earthquake data analysis.",
      deployedLink: "https://amishadas.shinyapps.io/quakes-data-insightful-plots/",
      githubUrl: "https://github.com/your-earthquake-dashboard-repo",
    },
    {
      name: "RMD Financial Report",
      description: "Automated PDF/HTML report using RMarkdown for financial insights",
      deployedLink: "https://your-financial-report-demo",
      githubUrl: "https://github.com/your-rmd-report",
    },
    {
      name: "Tableau Sales Insights",
      description: "Visual dashboard analyzing sales trends using Tableau",
      deployedLink: "https://public.tableau.com/your-dashboard",
      githubUrl: "https://github.com/your-tableau-project",
    },
  ],
  skills: [],
  experience: [],
}

export default function DashboardPage() {
  return <NeonGridTemplate data={dashboardData} only="projects" />
}
