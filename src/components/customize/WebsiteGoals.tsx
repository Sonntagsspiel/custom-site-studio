import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Target, MessageSquare, Lightbulb } from "lucide-react";

const goalOptions = [
  { value: "sales", label: "Mehr Verkäufe generieren" },
  { value: "leads", label: "Kundenanfragen sammeln" },
  { value: "services", label: "Dienstleistungen präsentieren" },
  { value: "other", label: "Andere (bitte beschreiben)" },
];

export function WebsiteGoals() {
  const [selectedGoal, setSelectedGoal] = useState<string>("");

  return (
    <Card className="p-6 space-y-6 animate-fade-up">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <Label htmlFor="description" className="text-lg font-semibold">
            Beschreibe zunächst, worum es auf deiner Website geht
          </Label>
        </div>
        <Textarea
          id="description"
          placeholder="Beschreiben Sie den Zweck und die Hauptfunktionen Ihrer Website..."
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <Label htmlFor="mainGoal" className="text-lg font-semibold">
            Was ist Ihr allgemeines Ziel für die Website?
          </Label>
        </div>
        <Select value={selectedGoal} onValueChange={setSelectedGoal}>
          <SelectTrigger id="mainGoal">
            <SelectValue placeholder="Wählen Sie Ihr Hauptziel" />
          </SelectTrigger>
          <SelectContent>
            {goalOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <Label htmlFor="additionalGoals" className="text-lg font-semibold">
            Gibt es noch weitere Ziele, die Sie für Ihre Website haben?
          </Label>
        </div>
        <Textarea
          id="additionalGoals"
          placeholder="Zum Beispiel den Verkauf von Produkten, das Sammeln von Kundenanfragen oder die Präsentation Ihrer Dienstleistungen..."
          className="min-h-[100px]"
        />
      </div>
    </Card>
  );
}