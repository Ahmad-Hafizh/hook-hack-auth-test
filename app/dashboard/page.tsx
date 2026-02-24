"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderKanban, Video, Coins, Sparkles, ArrowUpRight } from "lucide-react"

interface DashboardStats {
  totalProjects: number
  totalVideos: number
  creditsRemaining: number
  subscription: {
    status: string
    planNameJa: string | null
    planType: string | null
    plans: { planKey: string; planNameJa: string; isSupportPlan: boolean }[]
  }
  latestProjects: {
    id: string
    name: string
    updatedAt: string
  }[]
  latestVideos: {
    id: string
    url: string | null
    projectName: string
    sessionName: string
    createdAt: string
  }[]
}

function StatSkeleton() {
  return <div className="h-7 w-12 rounded bg-muted animate-pulse" />
}

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="size-9 rounded-md bg-muted animate-pulse" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/new-dashboard/stats")
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">ダッシュボード</h1>
        <p className="text-[13px] text-muted-foreground">アカウントの概要</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">プロジェクト</CardTitle>
            <FolderKanban className="size-4 text-muted-foreground/50 stroke-[1.5]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <StatSkeleton /> : (
              <div className="text-2xl font-bold tracking-tight">{stats?.totalProjects ?? 0}</div>
            )}
            <p className="text-[11px] text-muted-foreground mt-0.5">アクティブなプロジェクト</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">動画</CardTitle>
            <Video className="size-4 text-muted-foreground/50 stroke-[1.5]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <StatSkeleton /> : (
              <div className="text-2xl font-bold tracking-tight">{stats?.totalVideos ?? 0}</div>
            )}
            <p className="text-[11px] text-muted-foreground mt-0.5">生成済み動画数</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">クレジット</CardTitle>
            <Coins className="size-4 text-muted-foreground/50 stroke-[1.5]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <StatSkeleton /> : (
              <div className="text-2xl font-bold tracking-tight">{stats?.creditsRemaining ?? 0}</div>
            )}
            <p className="text-[11px] text-muted-foreground mt-0.5">残りクレジット</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[13px] font-medium text-muted-foreground">プラン</CardTitle>
            <Sparkles className="size-4 text-muted-foreground/50 stroke-[1.5]" />
          </CardHeader>
          <CardContent>
            {isLoading ? <StatSkeleton /> : (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight">{stats?.subscription?.planNameJa || stats?.subscription?.status || "Free"}</span>
                <Badge variant="secondary" className="text-[10px] font-normal px-1.5 py-0">
                  <Link href="/dashboard/credits">変更</Link>
                </Badge>
              </div>
            )}
            <p className="text-[11px] text-muted-foreground mt-0.5">現在のサブスクリプション</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">最近のプロジェクト</CardTitle>
            <CardDescription className="text-[12px]">直近のプロジェクト活動</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <ListSkeleton /> : stats?.latestProjects && stats.latestProjects.length > 0 ? (
              <div className="space-y-1">
                {stats.latestProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/app-v3/projects/${project.id}`}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 -mx-2 transition-colors hover:bg-accent"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                      <FolderKanban className="size-3.5 text-muted-foreground stroke-[1.5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium leading-none truncate">
                        {project.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {new Date(project.updatedAt).toLocaleDateString("ja-JP")} 更新
                      </p>
                    </div>
                    <ArrowUpRight className="size-3.5 text-muted-foreground/50 shrink-0 stroke-[1.5]" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-[13px] text-muted-foreground">プロジェクトがまだありません</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">最近の動画</CardTitle>
            <CardDescription className="text-[12px]">直近で生成された動画</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <ListSkeleton /> : stats?.latestVideos && stats.latestVideos.length > 0 ? (
              <div className="space-y-1">
                {stats.latestVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-3 rounded-md px-2 py-2.5 -mx-2"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
                      <Video className="size-3.5 text-muted-foreground stroke-[1.5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium leading-none truncate">
                        {video.projectName}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {new Date(video.createdAt).toLocaleDateString("ja-JP")} 作成
                      </p>
                    </div>
                    {video.url && (
                      <button
                        onClick={() => window.open(video.url!, "_blank")}
                        className="text-[12px] text-muted-foreground hover:text-foreground font-medium transition-colors"
                      >
                        再生
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8">
                <p className="text-[13px] text-muted-foreground">動画がまだありません</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
