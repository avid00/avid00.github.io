"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
}

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: string
  onSelectTemplate: (id: string) => void
}

export default function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedTemplateName = templates.find((t) => t.id === selectedTemplate)?.name || ""

  // return (
  //   <div className="sticky top-0 z-50 max-w-4xl mx-auto p-4 bg-gradient-to-r from-cyan-900 to-blue-900 rounded-lg shadow-lg">
  //     <h1 className="text-3xl font-bold text-white mb-4 text-center">Ocean-Themed Portfolio Templates</h1>

  //     <div className="relative">
  //       <button
  //         onClick={() => setIsOpen(!isOpen)}
  //         className="w-full flex items-center justify-between p-3 bg-cyan-800 hover:bg-cyan-700 text-white rounded-md"
  //       >
  //         <span>Selected Template: {selectedTemplateName}</span>
  //         {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
  //       </button>

  //       {isOpen && (
  //         <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg overflow-hidden">
  //           <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
  //             {templates.map((template) => (
  //               <button
  //                 key={template.id}
  //                 className={`w-full text-left p-3 transition-all ${
  //                   selectedTemplate === template.id
  //                     ? "bg-cyan-100 text-cyan-900"
  //                     : "bg-white text-gray-800 hover:bg-gray-50"
  //                 }`}
  //                 onClick={() => {
  //                   onSelectTemplate(template.id)
  //                   setIsOpen(false)
  //                 }}
  //               >
  //                 <div className="font-medium">{template.name}</div>
  //                 <div className="text-sm text-gray-500">{template.description}</div>
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}
