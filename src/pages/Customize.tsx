import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Laptop, Smartphone, Tablet, RotateCcw, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { WebsiteGoals } from "@/components/customize/WebsiteGoals";
import { ColorSection } from "@/components/customize/ColorSection";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Customize() {
  const { toast } = useToast();
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [primaryColor, setPrimaryColor] = useState("#0EA5E9");
  const [secondaryColor, setSecondaryColor] = useState("#6366F1");
  const [accentColor, setAccentColor] = useState("#8B5CF6");
  const [selectedFont, setSelectedFont] = useState("inter");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [savedSchemes, setSavedSchemes] = useState<Array<{name: string; colors: any}>>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const loadSavedSchemes = async () => {
      const { data, error } = await supabase
        .from('color_schemes')
        .select('*');
      
      if (error) {
        console.error('Error loading color schemes:', error);
        return;
      }

      if (data) {
        setSavedSchemes(data);
      }
    };

    loadSavedSchemes();
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedSections((sections) => {
        const oldIndex = sections.indexOf(active.id);
        const newIndex = sections.indexOf(over.id);
        return arrayMove(sections, oldIndex, newIndex);
      });
    }
  };

  const handleColorChange = (type: string, value: string) => {
    switch (type) {
      case "primary":
        setPrimaryColor(value);
        break;
      case "secondary":
        setSecondaryColor(value);
        break;
      case "accent":
        setAccentColor(value);
        break;
    }
  };

  const handleReset = () => {
    setPrimaryColor("#0EA5E9");
    setSecondaryColor("#6366F1");
    setAccentColor("#8B5CF6");
    setSelectedFont("inter");
    setSelectedSections([]);
    toast({
      title: "Zurückgesetzt",
      description: "Alle Einstellungen wurden auf Standard zurückgesetzt.",
    });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('website_settings')
      .upsert([{
        id: 1,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
        font: selectedFont,
        sections: selectedSections,
      }]);

    if (error) {
      toast({
        title: "Fehler beim Speichern",
        description: "Die Änderungen konnten nicht gespeichert werden.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Änderungen gespeichert",
      description: "Ihre Anpassungen wurden erfolgreich gespeichert.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-neutral-50 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column - Customization Options */}
        <div className="space-y-8">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Website anpassen
            </h1>
            <p className="text-muted-foreground text-lg">
              Passen Sie das Design Ihrer Website nach Ihren Wünschen an.
            </p>
          </div>

          <WebsiteGoals />
          
          <ColorSection
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            accentColor={accentColor}
            onColorChange={handleColorChange}
            onThemeSelect={(theme) => {
              setPrimaryColor(theme.primary);
              setSecondaryColor(theme.secondary);
              setAccentColor(theme.accent);
            }}
          />

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50 animate-fade-up">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex-1 hover:scale-105 transition-transform"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Zurücksetzen
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity hover:scale-105"
            >
              <Save className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-20 space-y-4">
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Live-Vorschau</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`hover:scale-105 transition-transform ${previewDevice === "desktop" ? "bg-accent/10" : ""}`}
                >
                  <Laptop className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice("tablet")}
                  className={`hover:scale-105 transition-transform ${previewDevice === "tablet" ? "bg-accent/10" : ""}`}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`hover:scale-105 transition-transform ${previewDevice === "mobile" ? "bg-accent/10" : ""}`}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div 
              className={`
                border rounded-lg overflow-hidden transition-all duration-300
                ${previewDevice === "desktop" ? "w-full" : ""}
                ${previewDevice === "tablet" ? "w-[768px] mx-auto" : ""}
                ${previewDevice === "mobile" ? "w-[375px] mx-auto" : ""}
              `}
            >
              <div
                className="aspect-video bg-gradient-to-br animate-scale-in"
                style={{
                  backgroundColor: primaryColor,
                  backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
                }}
              >
                <div className={`p-8 font-${selectedFont} text-white`}>
                  <h1 className="text-4xl font-bold mb-4">Ihre Website</h1>
                  <p className="text-lg">Vorschau Ihres personalisierten Designs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}