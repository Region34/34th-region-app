import { Card, CardContent } from "@/components/ui/card"

interface AdSlotProps {
  type: "banner" | "square" | "sidebar"
  className?: string
}

export default function AdSlot({ type, className = "" }: AdSlotProps) {
  const getAdDimensions = () => {
    switch (type) {
      case "banner":
        return "h-24 md:h-32"
      case "square":
        return "h-64 w-64"
      case "sidebar":
        return "h-96 w-full max-w-xs"
      default:
        return "h-24"
    }
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <Card className={`${getAdDimensions()} border-2 border-dashed border-muted-foreground/30`}>
        <CardContent className="flex items-center justify-center h-full p-4">
          <div className="text-center text-muted-foreground">
            <div className="text-lg font-semibold mb-1">Ad Space</div>
            <div className="text-sm">Advertisement Here</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
