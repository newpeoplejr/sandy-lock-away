
import { Box, Boxes, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewControlsProps {
  onChangeView: (view: 'front' | 'top' | 'side' | 'perspective') => void;
}

export function ViewControls({ onChangeView }: ViewControlsProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-center">
      <Button 
        onClick={() => onChangeView('front')}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Box size={20} />
        Front View
      </Button>
      <Button 
        onClick={() => onChangeView('top')}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Boxes size={20} />
        Top View
      </Button>
      <Button 
        onClick={() => onChangeView('side')}
        variant="outline"
        className="flex items-center gap-2"
      >
        <TerminalSquare size={20} />
        Side View
      </Button>
      <Button 
        onClick={() => onChangeView('perspective')}
        variant="default"
        className="flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9.5V4a1 1 0 0 1 1-1h5.5" />
          <path d="M2 14.5V20a1 1 0 0 0 1 1h5.5" />
          <path d="M15.5 21H20a1 1 0 0 0 1-1v-5.5" />
          <path d="M15.5 3H20a1 1 0 0 1 1 1v5.5" />
        </svg>
        Perspective
      </Button>
    </div>
  );
}
