import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorProps {
  message: string;
  title?: string;
}

export function Error({ message, title = "Error" }: ErrorProps) {
  return (
    <div className="px-4 lg:px-6">
      <Card className="border-destructive">
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <h3 className="font-semibold text-destructive">{title}</h3>
          </div>
          <p className="text-destructive mt-2">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
