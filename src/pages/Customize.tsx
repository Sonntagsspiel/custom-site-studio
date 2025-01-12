import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
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
import { useToast } from "@/hooks/use-toast";
import { Laptop, Smartphone, Tablet, RotateCcw, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Predefined themes
const themes = {
  modern: { primary: "#0EA5E9", secondary: "#6366F1", accent: "#8B5CF6" },
  pastel: { primary: "#F9A8D4", secondary: "#93C5FD", accent: "#A5B4FC" },
  dark: { primary: "#1F2937", secondary: "#374151", accent: "#4B5563" },
  contrast: { primary: "#000000", secondary: "#FFFFFF", accent: "#FF0000" },
};

// Available sections with preview images
const availableSections = [
  { 
    id: "hero", 
    label: "Hero-Bereich", 
    icon: "🎯",
    preview: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=100&fit=crop" 
  },
  { 
    id: "about", 
    label: "Über uns", 
    icon: "ℹ️",
    preview: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=100&fit=crop" 
  },
  { 
    id: "gallery", 
    label: "Galerie", 
    icon: "🖼️",
    preview: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=100&fit=crop" 
  },
  { 
    id: "contact", 
    label: "Kontaktformular", 
    icon: "📝",
    preview: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=100&fit=crop" 
  },
];

// Font categories
const fontCategories = {
  serif: [
    { value: "merriweather", label: "Merriweather" },
    { value: "playfair", label: "Playfair Display" },
  ],
  sansSerif: [
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "opensans", label: "Open Sans" },
  ],
  display: [
    { value: "montserrat", label: "Montserrat" },
    { value: "lato", label: "Lato" },
  ],
};

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

  // Load saved color schemes from Supabase
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

  const handleColorSchemeChange = async (scheme: typeof themes[keyof typeof themes], name?: string) => {
    setPrimaryColor(scheme.primary);
    setSecondaryColor(scheme.secondary);
    setAccentColor(scheme.accent);

    if (name) {
      const { error } = await supabase
        .from('color_schemes')
        .insert([{ name, colors: scheme }]);

      if (error) {
        toast({
          title: "Fehler beim Speichern",
          description: "Das Farbschema konnte nicht gespeichert werden.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Farbschema aktualisiert",
      description: `Das Farbschema "${name || 'Benutzerdefiniert'}" wurde angewendet.`,
    });
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Left Column - Customization Options */}
        <div className="space-y-8">
          <Card className="p-6 shadow-lg animate-fade-up">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-neutral">
                Website anpassen
              </h1>
              <p className="text-muted-foreground">
                Passen Sie das Design Ihrer Website nach Ihren Wünschen an.
              </p>
            </div>

            <Tabs defaultValue="colors" className="mt-6">
              <TabsList className="grid grid-cols-3 gap-4 mb-6">
                <TabsTrigger value="colors">Farben</TabsTrigger>
                <TabsTrigger value="typography">Typografie</TabsTrigger>
                <TabsTrigger value="sections">Abschnitte</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primärfarbe</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <div 
                        className="flex-1 h-10 rounded-md"
                        style={{ backgroundColor: primaryColor }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Sekundärfarbe</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <div 
                        className="flex-1 h-10 rounded-md"
                        style={{ backgroundColor: secondaryColor }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Akzentfarbe</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="h-10 w-20"
                      />
                      <div 
                        className="flex-1 h-10 rounded-md"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vordefinierte Farbschemata</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(themes).map(([name, scheme]) => (
                      <Button
                        key={name}
                        variant="outline"
                        onClick={() => handleColorSchemeChange(scheme, name)}
                        className="justify-start gap-2"
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: scheme.primary }}
                        />
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(fontCategories).map(([category, fonts]) => (
                    <div key={category} className="space-y-2">
                      <Label>{category.charAt(0).toUpperCase() + category.slice(1)}</Label>
                      <Select value={selectedFont} onValueChange={setSelectedFont}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wählen Sie eine Schriftart" />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map((font) => (
                            <SelectItem 
                              key={font.value} 
                              value={font.value}
                              className={`font-${font.value}`}
                            >
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className={`text-lg font-${selectedFont}`}>
                        Beispieltext in {
                          fonts.find(f => f.value === selectedFont)?.label || selectedFont
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-6">
                <div className="grid gap-4">
                  {availableSections.map((section) => (
                    <Card key={section.id} className="p-4">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={section.id}
                          checked={selectedSections.includes(section.id)}
                          onCheckedChange={() => {
                            setSelectedSections(prev =>
                              prev.includes(section.id)
                                ? prev.filter(id => id !== section.id)
                                : [...prev, section.id]
                            );
                          }}
                        />
                        <Label htmlFor={section.id} className="flex items-center gap-2">
                          <span>{section.icon}</span>
                          <span>{section.label}</span>
                        </Label>
                        <img 
                          src={section.preview} 
                          alt={section.label}
                          className="w-20 h-12 object-cover rounded-md ml-auto"
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                {selectedSections.length > 0 && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <Card className="p-4">
                      <h3 className="font-semibold mb-4">Reihenfolge anpassen</h3>
                      <SortableContext
                        items={selectedSections}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {selectedSections.map((sectionId) => {
                            const section = availableSections.find(
                              (s) => s.id === sectionId
                            );
                            return (
                              <div
                                key={sectionId}
                                className="flex items-center p-3 bg-background border rounded-md cursor-move hover:bg-accent/5 transition-colors"
                              >
                                <span className="mr-2">↕️</span>
                                <span className="mr-2">{section?.icon}</span>
                                <span>{section?.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </SortableContext>
                    </Card>
                  </DndContext>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="flex-1"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Zurücksetzen
              </Button>
              <Button 
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Save className="mr-2 h-4 w-4" />
                Speichern
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-20 space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Live-Vorschau</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice("desktop")}
                  className={previewDevice === "desktop" ? "bg-accent/10" : ""}
                >
                  <Laptop className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice("tablet")}
                  className={previewDevice === "tablet" ? "bg-accent/10" : ""}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPreviewDevice("mobile")}
                  className={previewDevice === "mobile" ? "bg-accent/10" : ""}
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
          </Card>
        </div>
      </div>
    </div>
  );
}