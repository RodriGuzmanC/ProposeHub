import { Card, CardContent } from "@/components/ui/card"

export default function CardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 p-2 rounded-full animate-pulse">
            <div className="h-6 w-6" />
          </div>
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex space-x-2 mt-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}