
import { Perspective, Square, Eye, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewControlsProps {
  onChangeView: (view: 'front' | 'top' | 'side' | 'perspective') => void;
}

export function ViewControls({ onChangeView }: ViewControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button 
        onClick={() => onChangeView('front')}
        variant="outline" 
        className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
      >
        <Square size={18} />
        Фронт
      </Button>
      <Button 
        onClick={() => onChangeView('top')}
        variant="outline"
        className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
      >
        <Layers size={18} />
        Сверху
      </Button>
      <Button 
        onClick={() => onChangeView('side')}
        variant="outline"
        className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md"
      >
        <Eye size={18} />
        Сбоку
      </Button>
      <Button 
        onClick={() => onChangeView('perspective')}
        variant="default"
        className="flex items-center gap-2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-md"
      >
        <Perspective size={18} />
        Перспектива
      </Button>
    </div>
  );
}
