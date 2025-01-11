import { useState } from "react";
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

// Predefined color schemes
const colorSchemes = [
  { name: "Modern", primary: "#0EA5E9", secondary: "#6366F1", accent: "#8B5CF6" },
  { name: "Minimalist", primary: "#262626", secondary: "#525252", accent: "#737373" },
  { name: "Elegant", primary: "#9333EA", secondary: "#C026D3", accent: "#DB2777" },
];

// Available sections
const availableSections = [
  { id: "hero", label: "Hero-Bereich", icon: "🎯" },
  { id: "about", label: "Über uns", icon: "ℹ️" },
  { id: "gallery", label: "Galerie", icon: "🖼️" },
  { id: "contact", label: "Kontaktformular", icon: "📝" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "blog", label: "Blog", icon: "📰" },
];

// Available fonts
const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "opensans", label: "Open Sans" },
  { value: "montserrat", label: "Montserrat" },
  { value: "lato", label: "Lato" },
];

export default function Customize() {
  const { toast } = useToast();
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [primaryColor, setPrimaryColor] = useState("#0EA5E9");
  const [secondaryColor, setSecondaryColor] = useState("#6366F1");
  const [accentColor, setAccentColor] = useState("#8B5CF6");
  const [selectedFont, setSelectedFont] = useState("inter");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleColorSchemeChange = (scheme: typeof colorSchemes[0]) => {
    setPrimaryColor(scheme.primary);
    setSecondaryColor(scheme.secondary);
    setAccentColor(scheme.accent);
    toast({
      title: "Farbschema aktualisiert",
      description: `Das Farbschema "${scheme.name}" wurde angewendet.`,
    });
  };

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSave = () => {
    toast({
      title: "Änderungen gespeichert",
      description: "Ihre Anpassungen wurden erfolgreich gespeichert.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Left Column - Customization Options */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-neutral">
              Website anpassen
            </h1>
            <p className="text-muted-foreground">
              Passen Sie das Design Ihrer Website nach Ihren Wünschen an.
            </p>
          </div>

          {/* Color Scheme Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Farbschema</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primärfarbe</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Sekundärfarbe</Label>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="h-10 w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor">Akzentfarbe</Label>
                <Input
                  id="accentColor"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-10 w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Vordefinierte Farbschemata</Label>
              <div className="flex flex-wrap gap-2">
                {colorSchemes.map((scheme) => (
                  <Button
                    key={scheme.name}
                    variant="outline"
                    onClick={() => handleColorSchemeChange(scheme)}
                  >
                    {scheme.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Font Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Schriftart</h2>
            <div className="space-y-2">
              <Label htmlFor="font">Schriftart auswählen</Label>
              <Select value={selectedFont} onValueChange={setSelectedFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie eine Schriftart" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sections Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Abschnitte</h2>
            <div className="grid gap-4">
              {availableSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                  />
                  <Label htmlFor={section.id} className="flex items-center gap-2">
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Section Ordering */}
          {selectedSections.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Reihenfolge anpassen</h2>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
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
                          className="flex items-center p-3 bg-background border rounded-md cursor-move"
                        >
                          <span className="mr-2">↕️</span>
                          <span className="mr-2">{section?.icon}</span>
                          <span>{section?.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          <Button onClick={handleSave} className="w-full">
            Änderungen speichern
          </Button>
        </div>

        {/* Right Column - Preview */}
        <div className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Live-Vorschau</h2>
          <div
            className="aspect-video bg-gray-100 rounded-lg"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            {/* Preview content will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}