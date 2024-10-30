import { Skeleton } from "@/components/ui/skeleton"

export default function SessionLoading({ isCollapsed = false }: { isCollapsed?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      {!isCollapsed && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      )}
    </div>
  )
}