import { Construction } from 'lucide-react'
import { Button } from './ui/button'

interface PlaceholderPageProps {
  title: string
  description: string
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <Construction className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      <Button variant="outline">
        Continue prompting to build this page
      </Button>
    </div>
  )
}
