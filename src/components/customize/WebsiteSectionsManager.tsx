import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  LayoutTemplate, 
  Users, 
  Star, 
  Image, 
  ShoppingBag, 
  CreditCard, 
  Wrench, 
  Phone, 
  MapPin, 
  LogIn, 
  UserPlus,
  Calendar,
  Trophy
} from "lucide-react";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface SectionItem {
  id: string;
  name: string;
  icon: React.ElementType;
  enabled: boolean;
  order: number;
}

interface SortableSectionProps {
  section: SectionItem;
  onToggle: (id: string) => void;
  onOrderChange: (id: string, value: number) => void;
}

const SortableSection = ({ section, onToggle, onOrderChange }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition,
    touchAction: 'none',
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="p-4 mb-4 cursor-move hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <section.icon className="w-5 h-5 text-primary" />
            <Label>{section.name}</Label>
          </div>
          <Switch
            checked={section.enabled}
            onCheckedChange={() => onToggle(section.id)}
          />
        </div>
        <div className="mt-4">
          <Label className="text-sm text-gray-500">Position</Label>
          <Input
            type="number"
            min={1}
            max={100}
            value={section.order}
            onChange={(e) => onOrderChange(section.id, parseInt(e.target.value) || 1)}
            className="mt-2"
          />
        </div>
      </Card>
    </div>
  );
};

export const WebsiteSectionsManager = () => {
  const [sections, setSections] = useState<SectionItem[]>([
    { id: 'hero', name: 'Hero Section', icon: LayoutTemplate, enabled: true, order: 10 },
    { id: 'about', name: 'About Us', icon: Users, enabled: true, order: 20 },
    { id: 'reviews', name: 'Reviews', icon: Star, enabled: true, order: 30 },
    { id: 'photos', name: 'Photo Gallery', icon: Image, enabled: true, order: 40 },
    { id: 'shop', name: 'Shop', icon: ShoppingBag, enabled: true, order: 50 },
    { id: 'subscription', name: 'Subscriptions', icon: CreditCard, enabled: true, order: 60 },
    { id: 'services', name: 'Services', icon: Wrench, enabled: true, order: 70 },
    { id: 'extra-services', name: 'Extra Services', icon: Wrench, enabled: true, order: 80 },
    { id: 'contact', name: 'Contact', icon: Phone, enabled: true, order: 90 },
    { id: 'map', name: 'Map', icon: MapPin, enabled: true, order: 100 },
    { id: 'signin', name: 'Sign In', icon: UserPlus, enabled: true, order: 110 },
    { id: 'login', name: 'Log In', icon: LogIn, enabled: true, order: 120 },
    { id: 'reserve', name: 'Reserve', icon: Calendar, enabled: true, order: 130 },
    { id: 'motivational', name: 'Motivational', icon: Trophy, enabled: true, order: 140 },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        
        // Update orders based on new positions
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({
          ...item,
          order: (index + 1) * 10
        }));
      });
    }
  };

  const handleToggle = (id: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, enabled: !section.enabled } : section
    ));
  };

  const handleOrderChange = (id: string, value: number) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, order: value } : section
    ).sort((a, b) => a.order - b.order));
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <LayoutTemplate className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Website Sections</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Drag and drop sections to rearrange them, or use the number input to set their exact position.
          Toggle switches to enable or disable sections.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                onToggle={handleToggle}
                onOrderChange={handleOrderChange}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </Card>
  );
};