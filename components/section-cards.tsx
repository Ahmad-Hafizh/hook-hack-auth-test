import {
  TrendingDownIcon,
  TrendingUpIcon,
  Video,
  Users,
  Target,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Videos Analyzed</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            2,847
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <Video className="size-3" />
              +15.2%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Increased analysis volume <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Last 30 days performance</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Content Generated</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            156
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <Zap className="size-3" />
              +8.7%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            AI-powered content creation <Zap className="size-4" />
          </div>
          <div className="text-muted-foreground">High engagement content</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Avg. CVR Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            4.8%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <Target className="size-3" />
              +2.1%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Above industry average <Target className="size-4" />
          </div>
          <div className="text-muted-foreground">Conversion optimization</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            1,234
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <Users className="size-3" />
              +12.3%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing user base <Users className="size-4" />
          </div>
          <div className="text-muted-foreground">Monthly active users</div>
        </CardFooter>
      </Card>
    </div>
  );
}
