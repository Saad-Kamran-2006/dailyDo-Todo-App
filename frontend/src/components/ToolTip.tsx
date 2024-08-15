import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ToolTip({
  children,
  tool_tip_content,
}: {
  children: React.ReactNode;
  tool_tip_content: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tool_tip_content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
