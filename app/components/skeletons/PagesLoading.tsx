import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import '../../../public/styles/loadingPage.css'

export default function PagesLoading() {
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-white">
      {/*<div className="text-center space-y-4">
        <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
        <h2 className="text-2xl font-semibold text-foreground">Cargando...</h2>
        <p className="text-muted-foreground">Por favor, espere mientras preparamos todo para ti.</p>
      </div>*/}
      <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
      </div>
      <p className="text-muted-foreground mt-8">Cargando...</p>
      {/*<Progress className="w-64 mt-8" value={33} />*/}
    </div>
  )
}