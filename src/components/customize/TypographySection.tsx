import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Type, AlignLeft, AlignCenter, AlignRight, TextQuote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TypographySectionProps {
  selectedFont: string;
  onFontChange: (value: string) => void;
}

export function TypographySection({ selectedFont, onFontChange }: TypographySectionProps) {
  const fonts = [
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "poppins", label: "Poppins" },
    { value: "montserrat", label: "Montserrat" },
  ];

  return (
    <Card className="p-6 space-y-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Typografie</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="font-family">Schriftart</Label>
          <Select value={selectedFont} onValueChange={onFontChange}>
            <SelectTrigger id="font-family">
              <SelectValue placeholder="Wählen Sie eine Schriftart" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span className={`font-${font.value}`}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Textausrichtung</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="flex-1">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="flex-1">
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Zeilenabstand</Label>
          <div className="flex items-center gap-2">
            <TextQuote className="w-5 h-5 text-primary" />
            <Select defaultValue="normal">
              <SelectTrigger>
                <SelectValue placeholder="Wählen Sie den Zeilenabstand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Kompakt</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="relaxed">Entspannt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className={`text-xl font-${selectedFont} mb-2`}>Vorschau</h3>
          <p className={`font-${selectedFont} text-gray-600`}>
            Dies ist ein Beispieltext in der ausgewählten Schriftart. Er zeigt, wie Ihre Website-Texte aussehen werden.
          </p>
        </div>
      </div>
    </Card>
  );
}