import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface ColorSectionProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  onColorChange: (type: string, value: string) => void;
  onThemeSelect: (theme: any) => void;
}

export function ColorSection({
  primaryColor,
  secondaryColor,
  accentColor,
  onColorChange,
  onThemeSelect,
}: ColorSectionProps) {
  const themes = {
    modern: { primary: "#0EA5E9", secondary: "#6366F1", accent: "#8B5CF6" },
    pastel: { primary: "#F9A8D4", secondary: "#93C5FD", accent: "#A5B4FC" },
    dark: { primary: "#1F2937", secondary: "#374151", accent: "#4B5563" },
    contrast: { primary: "#000000", secondary: "#FFFFFF", accent: "#FF0000" },
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Farbschema</h2>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primärfarbe</Label>
          <div className="flex gap-2">
            <Input
              id="primaryColor"
              type="color"
              value={primaryColor}
              onChange={(e) => onColorChange("primary", e.target.value)}
              className="h-10 w-20"
            />
            <div
              className="flex-1 h-10 rounded-md transition-colors duration-200"
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
              onChange={(e) => onColorChange("secondary", e.target.value)}
              className="h-10 w-20"
            />
            <div
              className="flex-1 h-10 rounded-md transition-colors duration-200"
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
              onChange={(e) => onColorChange("accent", e.target.value)}
              className="h-10 w-20"
            />
            <div
              className="flex-1 h-10 rounded-md transition-colors duration-200"
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
              onClick={() => onThemeSelect(scheme)}
              className="justify-start gap-2 hover:scale-105 transition-transform"
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
    </Card>
  );
}