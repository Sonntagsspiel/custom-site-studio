import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Circle, ChevronDown, ChevronRight, Globe, MessageSquare, Settings, Shield, Server, Clock, Wrench, Calendar, FileText, Package, Palette, Cog, ArrowRight, Send, HelpCircle, Mail, LifeBuoy, MessageCircle, Bot, Type, Sun, Moon, SunMoon, Check, X, Film, Trash2, Plus, ArrowLeft, Save } from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'
import { useAuth } from "@/contexts/AuthContext";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

type Step = {
  id: number;
  title: string;
  icon: React.ReactNode;
  isCompleted: boolean;
};

interface GeneralInfo {
  companyName: string;
  industry: string;
  location: string;
  targetAudience: string;
  websiteGoals: string;
  companyDescription?: string;
  contactEmail?: string;
}

// Zuerst definieren wir die benötigten Interfaces
interface Subsection {
  id: string;
  title: string;
  isSelected: boolean;
  description?: string;
  icon?: any;
}

interface CustomSubsection {
  id: string;
  title: string;
  isSelected: boolean;
  description?: string;
  icon?: any;
}

interface PageSection {
  id: string;
  title: string;
  isRequired: boolean;
  isSelected: boolean;
  subsections: Subsection[];
  customSubsections: CustomSubsection[];
  isCustom?: boolean;
}

interface WebsiteContent {
  pages: PageSection[];
}

type DesignSettings = {
  primaryColor: string;
  secondaryColor: string;
  primaryFont: string;
  secondaryFont: string;
  customPrimaryFont?: string;
  customSecondaryFont?: string;
  logo: File | null;
  theme: 'light' | 'dark' | 'both' | 'none';
  enableAnimations: boolean;
  fontFamily: string;
  media?: File[];
  pages?: PageSection[];
  useCustomHosting?: boolean;
};

interface FeatureSettings {
  seo: {
    googleOptimization: boolean;
    googleMyBusiness: boolean;
    socialMediaIntegration: boolean;
  };
  interactive: {
    liveChat: boolean;
    newsletter: boolean;
    bookingSystem: boolean;
  };
  technical: {
    multilingual: boolean;
    customerLogin: boolean;
    accessibility: boolean;
  };
  legal: {
    imprint: boolean; // Pflichtfeld in Deutschland
    cookieBanner: boolean; // Pflichtfeld in Deutschland
    termsAndConditions: boolean;
  };
}

interface HostingSettings {
  domain: {
    type: 'existing' | 'new' | 'undecided';
    existingDomain?: string;
    newDomain?: string;
    customDomain?: string;
  };
  hosting: {
    package: 'basic' | 'business' | 'premium' | 'undecided';
  };
  maintenance: {
    backups: boolean;
    updates: boolean;
    support: boolean;
    monitoring: boolean;
  };
  timeline: {
    hasPreferences: boolean;  // Neue Option für die Checkbox
    deadline: string;
    maxBudget: string;  // Statt budget enum
  };
}

// Dann aktualisieren wir initialWebsiteContent
const initialWebsiteContent: WebsiteContent = {
  pages: [
    {
      id: "home",
      title: "Startseite",
      isRequired: true,
      isSelected: true,
      subsections: [
        { id: "hero", title: "Hero-Section", isSelected: true },
        { id: "features", title: "Features", isSelected: false },
        { id: "about", title: "Über uns", isSelected: false }
      ],
      customSubsections: []
    },
    {
      id: "general",
      title: "Startseite",
      isRequired: true,
      isSelected: true,
      subsections: [
        { id: "hero", title: "Hauptüberschrift (Hero-Section)", isSelected: true },
        { id: "welcome", title: "Begrüßungstext", isSelected: false },
        { id: "usp", title: "Slogan / USP", isSelected: false },
        { id: "background", title: "Hintergrundbild oder Video", isSelected: false },
        { id: "cta", title: "Call-to-Action (CTA)", isSelected: true },
        { id: "slider", title: "Slider oder Banner", isSelected: false },
        { id: "news", title: "Neueste Angebote / News", isSelected: false },
        { id: "testimonials", title: "Kundenmeinungen", isSelected: false },
        { id: "partners", title: "Partnerschaften oder Zertifikate", isSelected: false }
      ],
      customSubsections: [] // Leeres Array für benutzerdefinierte Unterpunkte
    },
    {
      id: "about",
      title: "Über uns",
      isRequired: false,
      isSelected: false,
      subsections: [
        { id: "history", title: "Firmenhistorie", isSelected: false },
        { id: "vision", title: "Vision & Mission", isSelected: false },
        { id: "team", title: "Team-Mitglieder & Bilder", isSelected: false },
        { id: "values", title: "Unternehmenswerte & Philosophie", isSelected: false },
        { id: "location", title: "Standortkarte & Kontaktmöglichkeiten", isSelected: false }
      ],
      customSubsections: []
    },
    {
      id: "services",
      title: "Leistungen / Services",
      isRequired: false,
      isSelected: false,
      subsections: [
        { id: "details", title: "Detaillierte Dienstleistungsbeschreibungen", isSelected: false },
        { id: "pricing", title: "Preismodelle", isSelected: false },
        { id: "benefits", title: "Vorteile für den Kunden", isSelected: false },
        { id: "process", title: "Prozessablauf", isSelected: false },
        { id: "faq", title: "FAQ zu Dienstleistungen", isSelected: false }
      ],
      customSubsections: []
    },
    {
      id: 'account',
      title: 'Benutzer & Konto',
      isRequired: false,
      isSelected: false,
      subsections: [
        { id: 'login', title: 'Login', isSelected: false },
        { id: 'register', title: 'Registrierung', isSelected: false },
        { id: 'password-reset', title: 'Passwort zurücksetzen', isSelected: false },
        { id: 'profile', title: 'Benutzerprofil', isSelected: false }
      ],
      customSubsections: []
    },
    {
      id: 'legal',
      title: 'Rechtlich',
      isRequired: false,
      isSelected: false,
      subsections: [
        { id: 'imprint', title: 'Impressum', isSelected: false },
        { id: 'terms', title: 'AGB', isSelected: false },
        { id: 'privacy', title: 'Datenschutzerklärung', isSelected: false },
        { id: 'cookies', title: 'Cookie-Richtlinie', isSelected: false }
      ],
      customSubsections: []
    },
    {
      id: 'support',
      title: 'Support & Hilfe',
      isRequired: false,
      isSelected: false,
      subsections: [
        { 
          id: 'faq', 
          title: 'FAQ', 
          isSelected: false,
          description: 'Häufig gestellte Fragen und Antworten für Ihre Besucher',
          icon: HelpCircle 
        },
        { 
          id: 'contact', 
          title: 'Kontaktformular', 
          isSelected: false,
          description: 'Professionelles Kontaktformular für Kundenanfragen',
          icon: Mail
        },
        { 
          id: 'help-center', 
          title: 'Hilfe-Center', 
          isSelected: false,
          description: 'Umfassende Wissensdatenbank und Support-Bereich',
          icon: LifeBuoy
        },
        { 
          id: 'live-chat', 
          title: 'Live-Chat', 
          isSelected: false,
          description: 'Direkter Kundensupport durch Live-Chat Integration',
          icon: MessageCircle
        },
        { 
          id: 'ai-chatbot', 
          title: 'KI-Chatbot', 
          isSelected: false,
          description: 'Intelligenter Chatbot für automatisierte Kundenbetreuung',
          icon: Bot
        }
      ],
      customSubsections: []
    },
    {
      id: 'socials',
      title: 'Socials',
      isRequired: false,
      isSelected: false,
      subsections: [
        { id: 'social-media', title: 'Social Media', isSelected: false },
        { id: 'blog', title: 'Blog', isSelected: false },
        { id: 'newsletter', title: 'Newsletter', isSelected: false }
      ],
      customSubsections: []
    }
  ]
};


const fontOptions = [
  { value: 'inter', label: 'Inter (Modern)', preview: 'Aa Bb Cc 123' },
  { value: 'roboto', label: 'Roboto (Clean)', preview: 'Aa Bb Cc 123' },
  { value: 'playfair', label: 'Playfair Display (Elegant)', preview: 'Aa Bb Cc 123' },
  { value: 'montserrat', label: 'Montserrat (Professional)', preview: 'Aa Bb Cc 123' },
];

// Neue Interface für gespeicherte Vorschauen
interface SavedPreview {
  id: string;
  name: string;
  timestamp: string;
  generalInfo: GeneralInfo;
  websiteContent: WebsiteContent;
  designSettings: DesignSettings;
  hostingSettings: HostingSettings;
}

const Customize = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    companyName: "",
    industry: "",
    location: "",
    targetAudience: "",
    websiteGoals: "",
  });
  const [steps] = useState<Step[]>([
    {
      id: 1,
      title: "Allgemeine Informationen",
      icon: <FileText className="h-6 w-6" />,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Seiten & Inhalte",
      icon: <Package className="h-6 w-6" />,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Design & Branding",
      icon: <Palette className="h-6 w-6" />,
      isCompleted: false,
    },
    {
      id: 4,
      title: "Hosting",
      icon: <Server className="h-6 w-6" />,
      isCompleted: false,
    },
    {
      id: 5,
      title: "Übersicht",
      icon: <Send className="h-6 w-6" />,
      isCompleted: false,
    }
  ]);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(initialWebsiteContent);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [designSettings, setDesignSettings] = useState<DesignSettings>({
    primaryColor: '#007AFF',
    secondaryColor: '#5856D6',
    primaryFont: 'inter',
    secondaryFont: 'inter',
    logo: null,
    theme: 'light',
    enableAnimations: true,
    fontFamily: 'inter',
  });
  const [featureSettings, setFeatureSettings] = useState<FeatureSettings>({
    seo: {
      googleOptimization: false,
      googleMyBusiness: false,
      socialMediaIntegration: false
    },
    interactive: {
      liveChat: false,
      newsletter: false,
      bookingSystem: false
    },
    technical: {
      multilingual: false,
      customerLogin: false,
      accessibility: false
    },
    legal: {
      imprint: true, // Pflichtfeld in Deutschland
      cookieBanner: true, // Pflichtfeld in Deutschland
      termsAndConditions: false
    }
  });
  const [hostingSettings, setHostingSettings] = useState<HostingSettings>({
    timeline: {
      hasPreferences: false,
      deadline: '',
      maxBudget: ''
    },
    domain: {
      type: 'undecided'
    },
    hosting: {
      package: 'undecided'
    },
    maintenance: {
      backups: false,
      updates: false,
      support: false,
      monitoring: false
    },
  });
  const [companyDescription, setCompanyDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newPageDialog, setNewPageDialog] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGeneralInfoChange = (
    field: keyof GeneralInfo,
    value: string
  ) => {
    setGeneralInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSectionToggle = (sectionId: string) => {
    setWebsiteContent(prev => ({
      ...prev,
      pages: prev.pages.map(page => {
        if (page.id === sectionId && !page.isRequired) {
          return { ...page, isSelected: !page.isSelected };
        }
        return page;
      })
    }));
  };

  const handleSubsectionToggle = (sectionId: string, subsectionId: string) => {
    setWebsiteContent(prev => ({
      ...prev,
      pages: prev.pages.map(page => {
        if (page.id === sectionId) {
          return {
            ...page,
            subsections: page.subsections?.map(sub => {
              if (sub.id === subsectionId) {
                return { ...sub, isSelected: !sub.isSelected };
              }
              return sub;
            })
          };
        }
        return page;
      })
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDesignSettings(prev => ({ ...prev, logo: file }));
    }
  };

  const handleDesignChange = (field: keyof DesignSettings, value: any) => {
    setDesignSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (
    category: keyof FeatureSettings,
    feature: string,
    value: boolean
  ) => {
    setFeatureSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [feature]: value
      }
    }));
  };

  const handleHostingChange = (
    category: keyof HostingSettings,
    field: string,
    value: any
  ) => {
    setHostingSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const renderSummary = () => {
  return (
        <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Ihre Website-Konfiguration</h2>
          <p className="text-gray-600">
            Überprüfen Sie Ihre Auswahl und senden Sie Ihre Anfrage ab
            </p>
          </div>

        {/* Allgemeine Informationen */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Allgemeine Informationen
          </h3>
          <div className="grid gap-4 text-sm">
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Unternehmen:</span>
              <span className="col-span-2 font-medium">{generalInfo.companyName}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Branche:</span>
              <span className="col-span-2">{generalInfo.industry}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Standort:</span>
              <span className="col-span-2">{generalInfo.location}</span>
            </div>
          </div>
          </div>
          
        {/* Seiten & Inhalte */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Ausgewählte Seiten & Funktionen
          </h3>
          <div className="space-y-2">
            {websiteContent.pages.filter(page => page.isSelected).map(page => (
              <div key={page.id} className="bg-gray-50 p-3 rounded">
                <p className="font-medium">{page.title}</p>
                {page.subsections && (
                  <div className="mt-2 ml-4 text-sm text-gray-600">
                    {page.subsections.filter(sub => sub.isSelected).map(sub => (
                      <p key={sub.id}>• {sub.title}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>

        {/* Design */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Design & Branding
          </h3>
          <div className={cn("space-y-8", currentStep !== 3 && "hidden")}>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Farbauswahl</h3>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Primärfarbe */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
                      style={{ backgroundColor: designSettings.primaryColor }}
                    >
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Primärfarbe</Label>
                      <p className="text-sm text-gray-500">Hauptfarbe Ihrer Website</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ColorPicker
                      color={designSettings.primaryColor}
                      onChange={(color) =>
                        setDesignSettings((prev) => ({ ...prev, primaryColor: color }))
                      }
                    />
                    <div 
                      className="h-12 rounded-lg transition-all"
                      style={{ backgroundColor: designSettings.primaryColor }}
            />
          </div>
          </div>

                {/* Sekundärfarbe */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
                      style={{ backgroundColor: designSettings.secondaryColor }}
                    >
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Sekundärfarbe</Label>
                      <p className="text-sm text-gray-500">Akzentfarbe für Details</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ColorPicker
                      color={designSettings.secondaryColor}
                      onChange={(color) =>
                        setDesignSettings((prev) => ({ ...prev, secondaryColor: color }))
                      }
                    />
                    <div 
                      className="h-12 rounded-lg transition-all"
                      style={{ backgroundColor: designSettings.secondaryColor }}
                    />
                  </div>
                </div>
              </div>
          </div>

            {/* Schriftarten */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Schriftarten</h3>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Primäre Schriftart */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: designSettings.primaryColor }}>
                      <Type className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Primäre Schriftart</Label>
                      <p className="text-sm text-gray-500">Hauptschriftart für Überschriften</p>
                    </div>
                  </div>
                  <Select
                    value={designSettings.primaryFont}
                    onValueChange={(value) =>
                      setDesignSettings((prev) => ({ ...prev, primaryFont: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wählen Sie eine Schriftart" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="custom">Eigene Schriftart...</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                      <SelectItem value="verdana">Verdana</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="tahoma">Tahoma</SelectItem>
                      <SelectItem value="trebuchet-ms">Trebuchet MS</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                      <SelectItem value="cambria">Cambria</SelectItem>
                      <SelectItem value="lora">Lora</SelectItem>
                      <SelectItem value="raleway">Raleway</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="source-sans-pro">Source Sans Pro</SelectItem>
                      <SelectItem value="pt-sans">PT Sans</SelectItem>
                      <SelectItem value="merriweather">Merriweather</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="noto-sans">Noto Sans</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu</SelectItem>
                      <SelectItem value="playfair-display">Playfair Display</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="exo">Exo</SelectItem>
                    </SelectContent>
                  </Select>
                  {designSettings.primaryFont === 'custom' && (
                    <Input
                      className="mt-2"
                      placeholder="Geben Sie den Namen der Schriftart ein"
                      value={designSettings.customPrimaryFont || ''}
                      onChange={(e) =>
                        setDesignSettings((prev) => ({ ...prev, customPrimaryFont: e.target.value }))
                      }
                    />
                  )}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl" style={{ 
                      fontFamily: designSettings.primaryFont === 'custom' 
                        ? designSettings.customPrimaryFont 
                        : designSettings.primaryFont 
                    }}>
                      {generalInfo.companyName}
                    </p>
                  </div>
          </div>

                {/* Sekundäre Schriftart */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: designSettings.secondaryColor }}>
                      <Type className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Sekundäre Schriftart</Label>
                      <p className="text-sm text-gray-500">Schriftart für Fließtext</p>
                    </div>
                  </div>
                  <Select
                    value={designSettings.secondaryFont}
                    onValueChange={(value) =>
                      setDesignSettings((prev) => ({ ...prev, secondaryFont: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wählen Sie eine Schriftart" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="custom">Eigene Schriftart...</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                      <SelectItem value="verdana">Verdana</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="tahoma">Tahoma</SelectItem>
                      <SelectItem value="trebuchet-ms">Trebuchet MS</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                      <SelectItem value="cambria">Cambria</SelectItem>
                      <SelectItem value="lora">Lora</SelectItem>
                      <SelectItem value="raleway">Raleway</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="source-sans-pro">Source Sans Pro</SelectItem>
                      <SelectItem value="pt-sans">PT Sans</SelectItem>
                      <SelectItem value="merriweather">Merriweather</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="noto-sans">Noto Sans</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu</SelectItem>
                      <SelectItem value="playfair-display">Playfair Display</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="exo">Exo</SelectItem>
                    </SelectContent>
                  </Select>
                  {designSettings.secondaryFont === 'custom' && (
                    <Input
                      className="mt-2"
                      placeholder="Geben Sie den Namen der Schriftart ein"
                      value={designSettings.customSecondaryFont || ''}
                      onChange={(e) =>
                        setDesignSettings((prev) => ({ ...prev, customSecondaryFont: e.target.value }))
                      }
                    />
                  )}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p style={{ 
                      fontFamily: designSettings.secondaryFont === 'custom' 
                        ? designSettings.customSecondaryFont 
                        : designSettings.secondaryFont 
                    }}>
                      {generalInfo.websiteGoals.split(' ').slice(0, 7).join(' ')}...
                    </p>
                  </div>
                </div>
              </div>
          </div>

            {/* Design-Modus */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Design-Modus</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer ${
                  designSettings.theme === 'light' || designSettings.theme === 'both' 
                    ? 'border-primary' 
                    : 'border-gray-100'
                }`}
                onClick={() => {
                  if (designSettings.theme === 'dark') {
                    setDesignSettings(prev => ({ ...prev, theme: 'both' }));
                  } else if (designSettings.theme === 'both') {
                    setDesignSettings(prev => ({ ...prev, theme: 'dark' }));
                  } else if (designSettings.theme === 'light') {
                    setDesignSettings(prev => ({ ...prev, theme: 'none' }));
                  } else {
                    setDesignSettings(prev => ({ ...prev, theme: 'light' }));
                  }
                }}
                >
                  <div className="h-32 bg-white rounded-lg border border-gray-200 mb-4"></div>
                  <div className="text-center">Hell</div>
                  {(designSettings.theme === 'light' || designSettings.theme === 'both') && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer ${
                  designSettings.theme === 'dark' || designSettings.theme === 'both' 
                    ? 'border-primary' 
                    : 'border-gray-100'
                }`}
                onClick={() => {
                  if (designSettings.theme === 'light') {
                    setDesignSettings(prev => ({ ...prev, theme: 'both' }));
                  } else if (designSettings.theme === 'both') {
                    setDesignSettings(prev => ({ ...prev, theme: 'light' }));
                  } else if (designSettings.theme === 'dark') {
                    setDesignSettings(prev => ({ ...prev, theme: 'none' }));
                  } else {
                    setDesignSettings(prev => ({ ...prev, theme: 'dark' }));
                  }
                }}
                >
                  <div className="h-32 bg-[#1a1a1a] rounded-lg border border-gray-700 mb-4"></div>
                  <div className="text-center">Dunkel</div>
                  {(designSettings.theme === 'dark' || designSettings.theme === 'both') && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
          </div>
        </div>
                  )}
                </div>
              </div>
            </div>

            {/* Animationen */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Animationen</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Aktivieren Sie sanfte Übergänge und Animationen</p>
                </div>
                <Switch
                  checked={designSettings.enableAnimations}
                  onCheckedChange={(checked) =>
                    setDesignSettings((prev) => ({ ...prev, enableAnimations: checked }))
                  }
                />
              </div>
            </div>

            {/* Medien Upload */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Medien hochladen</h3>
              <div 
                className="border-2 border-dashed border-gray-200 rounded-lg p-8 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*,video/*';
                  input.multiple = true;
                  
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    const validFiles = files.filter(file => {
                      // Validierung der Dateigröße (max 5MB für Bilder, max 50MB für Videos)
                      const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
                      if (file.size > maxSize) {
                        toast({
                          title: "Datei zu groß",
                          description: `${file.name} ist zu groß. Maximale Größe ist ${file.type.startsWith('video/') ? '50MB' : '5MB'}.`,
                          variant: "destructive"
                        });
                        return false;
                      }
                      // Validierung des Dateityps
                      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                        toast({
                          title: "Ungültiges Dateiformat",
                          description: `${file.name} ist keine Bild- oder Videodatei.`,
                          variant: "destructive"
                        });
                        return false;
                      }
                      return true;
                    });

                    if (validFiles.length > 0) {
                      setDesignSettings((prev) => ({ 
                        ...prev, 
                        media: [...(prev.media || []), ...validFiles]
                      }));
                    }
                  };
                  
                  input.click();
                }}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  {designSettings.media?.length > 0 ? (
                    <>
                      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                        {designSettings.media.map((file, index) => (
                          <div key={index} className="relative group">
                            {file.type.startsWith('video/') ? (
                              <video
                                src={URL.createObjectURL(file)}
                                className="w-full aspect-square object-cover rounded-lg"
                                controls
                              />
                            ) : (
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={`Medien ${index + 1}`}
                                className="w-full aspect-square object-cover rounded-lg"
                              />
                            )}
                            <button
                              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDesignSettings((prev) => ({
                                  ...prev,
                                  media: prev.media?.filter((_, i) => i !== index)
                                }));
                              }}
                            >
                              <X className="h-4 w-4 text-gray-700" />
                            </button>
                          </div>
                        ))}
                      </div>
              <div className="flex gap-2">
            <Button 
              variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*,video/*';
                            input.multiple = true;
                            input.click();
                          }}
                        >
                          Weitere Medien hinzufügen
            </Button>
            <Button 
                  variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDesignSettings((prev) => ({ ...prev, media: [] }));
                          }}
                        >
                          Alle Medien entfernen
            </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4">
                        <Upload className="h-12 w-12 text-gray-400" />
                        <Film className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 mb-1">Medien hochladen</p>
                        <p className="text-sm text-gray-400">Laden Sie Bilder und Videos hoch (max. 5MB pro Bild, 50MB pro Video)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      

        {/* Hosting & Wartung */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Hosting & Zeitplan
          </h3>
          <div className="grid gap-4 text-sm">
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Domain:</span>
              <span className="col-span-2">
                {hostingSettings.domain.type === 'existing' 
                  ? hostingSettings.domain.existingDomain 
                  : hostingSettings.domain.type === 'new'
                  ? 'Neue Domain gewünscht'
                  : 'Noch unentschieden'}
              </span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Hosting-Paket:</span>
              <span className="col-span-2 capitalize">{hostingSettings.hosting.package}</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Fertigstellung bis:</span>
              <span className="col-span-2">
                {hostingSettings.timeline.deadline || 'Nicht angegeben'}
              </span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-600">Budget:</span>
              <span className="col-span-2 capitalize">
                {hostingSettings.timeline.maxBudget === 'small' ? 'Bis 2.000€' :
                 hostingSettings.timeline.maxBudget === 'medium' ? '2.000€ - 5.000€' :
                 hostingSettings.timeline.maxBudget === 'large' ? 'Über 5.000€' :
                 'Noch unentschieden'}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
                <Button
            size="lg"
            className="gap-2"
            onClick={() => {
              // Hier können Sie die Daten an Ihr Backend senden
    toast({
                title: "Anfrage gesendet",
                description: "Wir werden uns in Kürze bei Ihnen melden.",
              });
            }}
          >
            <Send className="h-5 w-5" />
            Anfrage absenden
                </Button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
  return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Unternehmens-/Markenname *</Label>
              <Input
                id="companyName"
                value={generalInfo.companyName}
                onChange={(e) => handleGeneralInfoChange("companyName", e.target.value)}
                placeholder="z.B. Musterfirma GmbH"
                required
              />
          </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Branche & Geschäftsfeld *</Label>
              <Input
                id="industry"
                value={generalInfo.industry}
                onChange={(e) => handleGeneralInfoChange("industry", e.target.value)}
                placeholder="z.B. E-Commerce, Dienstleistung, Handwerk"
                required
              />
          </div>
          
            <div className="space-y-2">
              <Label htmlFor="location">Standort & Kontaktinfos *</Label>
              <Input
                id="location"
                value={generalInfo.location}
                onChange={(e) => handleGeneralInfoChange("location", e.target.value)}
                placeholder="Ihre Geschäftsadresse"
                required
            />
          </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Zielgruppe *</Label>
              <Textarea
                id="targetAudience"
                value={generalInfo.targetAudience}
                onChange={(e) => handleGeneralInfoChange("targetAudience", e.target.value)}
                placeholder="Beschreiben Sie Ihre idealen Kunden"
                required
            />
          </div>

            <div className="space-y-2">
              <Label htmlFor="websiteGoals">Ziele der Website *</Label>
              <Textarea
                id="websiteGoals"
                value={generalInfo.websiteGoals}
                onChange={(e) => handleGeneralInfoChange("websiteGoals", e.target.value)}
                placeholder="Was möchten Sie mit Ihrer Website erreichen?"
                required
              />
          </div>

            <div className="space-y-4">
              <Label htmlFor="companyDescription">Unternehmensbeschreibung</Label>
              <textarea
                id="companyDescription"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                placeholder="Beschreiben Sie Ihr Unternehmen in wenigen Sätzen..."
                className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-sm resize-y"
              />
          </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-4">
              Wählen Sie die gewünschten Bereiche für Ihre Website aus. 
              Pflichtbereiche sind bereits vorausgewählt.
            </p>
            
            {websiteContent.pages.map(section => (
              <div key={section.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={section.isSelected}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                    disabled={section.isRequired}
                  />
                  <div className="flex-1">
                    <div 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleSection(section.id)}
                    >
                      {expandedSections.includes(section.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {section.title}
                        {section.isRequired && (
                          <span className="text-primary text-sm ml-2">(Pflichtbereich)</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                {expandedSections.includes(section.id) && section.subsections && (
                  <div className="mt-4 ml-8 space-y-3">
                    {section.subsections.map(subsection => (
                      <div key={subsection.id} className="flex items-center gap-4">
                        <Checkbox
                          checked={subsection.isSelected}
                          onCheckedChange={() => handleSubsectionToggle(section.id, subsection.id)}
                          disabled={!section.isSelected}
                        />
                        <span className="text-sm">{subsection.title}</span>
                      </div>
                    ))}
                    
                    {/* Benutzerdefinierte Unterpunkte */}
                    {section.customSubsections?.map((customSub, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Checkbox
                          checked={customSub.isSelected}
                          onCheckedChange={() => {
                            const updatedPages = websiteContent.pages.map(page => {
                              if (page.id === section.id) {
                                const updatedCustomSubs = [...(page.customSubsections || [])];
                                updatedCustomSubs[index] = {
                                  ...customSub,
                                  isSelected: !customSub.isSelected
                                };
                                return { ...page, customSubsections: updatedCustomSubs };
                              }
                              return page;
                            });
                            setWebsiteContent(prev => ({ ...prev, pages: updatedPages }));
                          }}
                          disabled={!section.isSelected}
                        />
                        <Input
                          value={customSub.title}
                          onChange={(e) => {
                            const updatedPages = websiteContent.pages.map(page => {
                              if (page.id === section.id) {
                                const updatedCustomSubs = [...(page.customSubsections || [])];
                                updatedCustomSubs[index] = {
                                  ...customSub,
                                  title: e.target.value
                                };
                                return { ...page, customSubsections: updatedCustomSubs };
                              }
                              return page;
                            });
                            setWebsiteContent(prev => ({ ...prev, pages: updatedPages }));
                          }}
                          placeholder="Unterpunkt-Titel"
                          className="max-w-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => {
                            const updatedPages = websiteContent.pages.map(page => {
                              if (page.id === section.id) {
                                const updatedCustomSubs = (page.customSubsections || [])
                                  .filter((_, i) => i !== index);
                                return { ...page, customSubsections: updatedCustomSubs };
                              }
                              return page;
                            });
                            setWebsiteContent(prev => ({ ...prev, pages: updatedPages }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {/* Button zum Hinzufügen benutzerdefinierter Unterpunkte */}
                <Button
                  variant="outline"
                      size="sm"
                      onClick={() => {
                        const updatedPages = websiteContent.pages.map(page => {
                          if (page.id === section.id) {
                            return {
                              ...page,
                              customSubsections: [
                                ...(page.customSubsections || []),
                                { title: "", isSelected: true }
                              ]
                            };
                          }
                          return page;
                        });
                   
                      }}
                    >
                      + Unterpunkt hinzufügen
                </Button>
                  </div>
                )}
              </div>
            ))}

            {/* Button zum Hinzufügen einer neuen Seite */}
            <div className="mt-8">
                <Button
                  variant="outline"
                className="w-full"
                onClick={() => setNewPageDialog(true)}
                >
                <Plus className="h-4 w-4 mr-2" />
                Neue Seite hinzufügen
                </Button>
            </div>

            {/* Neue Seite Dialog */}
            <Dialog open={newPageDialog} onOpenChange={setNewPageDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Neue Seite erstellen</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="pageTitle">Seitentitel</Label>
                  <Input
                    id="pageTitle"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="z.B. Über uns, Team, Kontakt"
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                <Button
                  variant="outline"
                    onClick={() => {
                      setNewPageTitle("");
                      setNewPageDialog(false);
                    }}
                  >
                    Abbrechen
                </Button>
                  <Button onClick={handleAddNewPage} disabled={!newPageTitle.trim()}>
                    Seite erstellen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
              </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            {/* Farbauswahl */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Farbauswahl</h3>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Primärfarbe */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
                      style={{ backgroundColor: designSettings.primaryColor }}
                    >
                      <Palette className="h-5 w-5" />
            </div>
                    <div>
                      <Label className="text-lg font-semibold">Primärfarbe</Label>
                      <p className="text-sm text-gray-500">Hauptfarbe Ihrer Website</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ColorPicker
                      color={designSettings.primaryColor}
                      onChange={(color) =>
                        setDesignSettings((prev) => ({ ...prev, primaryColor: color }))
                      }
                    />
                    <div 
                      className="h-12 rounded-lg transition-all"
                      style={{ backgroundColor: designSettings.primaryColor }}
                    />
          </div>
        </div>

                {/* Sekundärfarbe */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors"
                      style={{ backgroundColor: designSettings.secondaryColor }}
                    >
                      <Palette className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Sekundärfarbe</Label>
                      <p className="text-sm text-gray-500">Akzentfarbe für Details</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ColorPicker
                      color={designSettings.secondaryColor}
                      onChange={(color) =>
                        setDesignSettings((prev) => ({ ...prev, secondaryColor: color }))
                      }
                    />
                    <div 
                      className="h-12 rounded-lg transition-all"
                      style={{ backgroundColor: designSettings.secondaryColor }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Schriftarten */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Schriftarten</h3>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Primäre Schriftart */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: designSettings.primaryColor }}>
                      <Type className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Primäre Schriftart</Label>
                      <p className="text-sm text-gray-500">Hauptschriftart für Überschriften</p>
                    </div>
                  </div>
                  <Select
                    value={designSettings.primaryFont}
                    onValueChange={(value) =>
                      setDesignSettings((prev) => ({ ...prev, primaryFont: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wählen Sie eine Schriftart" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="custom">Eigene Schriftart...</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                      <SelectItem value="verdana">Verdana</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="tahoma">Tahoma</SelectItem>
                      <SelectItem value="trebuchet-ms">Trebuchet MS</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                      <SelectItem value="cambria">Cambria</SelectItem>
                      <SelectItem value="lora">Lora</SelectItem>
                      <SelectItem value="raleway">Raleway</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="source-sans-pro">Source Sans Pro</SelectItem>
                      <SelectItem value="pt-sans">PT Sans</SelectItem>
                      <SelectItem value="merriweather">Merriweather</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="noto-sans">Noto Sans</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu</SelectItem>
                      <SelectItem value="playfair-display">Playfair Display</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="exo">Exo</SelectItem>
                    </SelectContent>
                  </Select>
                  {designSettings.primaryFont === 'custom' && (
                    <Input
                      className="mt-2"
                      placeholder="Geben Sie den Namen der Schriftart ein"
                      value={designSettings.customPrimaryFont || ''}
                      onChange={(e) =>
                        setDesignSettings((prev) => ({ ...prev, customPrimaryFont: e.target.value }))
                      }
                    />
                  )}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl" style={{ 
                      fontFamily: designSettings.primaryFont === 'custom' 
                        ? designSettings.customPrimaryFont 
                        : designSettings.primaryFont 
                    }}>
                      {generalInfo.companyName}
                    </p>
                  </div>
                </div>

                {/* Sekundäre Schriftart */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: designSettings.secondaryColor }}>
                      <Type className="h-5 w-5" />
                    </div>
                    <div>
                      <Label className="text-lg font-semibold">Sekundäre Schriftart</Label>
                      <p className="text-sm text-gray-500">Schriftart für Fließtext</p>
                    </div>
                  </div>
                  <Select
                    value={designSettings.secondaryFont}
                    onValueChange={(value) =>
                      setDesignSettings((prev) => ({ ...prev, secondaryFont: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wählen Sie eine Schriftart" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="custom">Eigene Schriftart...</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                      <SelectItem value="verdana">Verdana</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="tahoma">Tahoma</SelectItem>
                      <SelectItem value="trebuchet-ms">Trebuchet MS</SelectItem>
                      <SelectItem value="calibri">Calibri</SelectItem>
                      <SelectItem value="cambria">Cambria</SelectItem>
                      <SelectItem value="lora">Lora</SelectItem>
                      <SelectItem value="raleway">Raleway</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="source-sans-pro">Source Sans Pro</SelectItem>
                      <SelectItem value="pt-sans">PT Sans</SelectItem>
                      <SelectItem value="merriweather">Merriweather</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="noto-sans">Noto Sans</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu</SelectItem>
                      <SelectItem value="playfair-display">Playfair Display</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="exo">Exo</SelectItem>
                    </SelectContent>
                  </Select>
                  {designSettings.secondaryFont === 'custom' && (
                    <Input
                      className="mt-2"
                      placeholder="Geben Sie den Namen der Schriftart ein"
                      value={designSettings.customSecondaryFont || ''}
                      onChange={(e) =>
                        setDesignSettings((prev) => ({ ...prev, customSecondaryFont: e.target.value }))
                      }
                    />
                  )}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p style={{ 
                      fontFamily: designSettings.secondaryFont === 'custom' 
                        ? designSettings.customSecondaryFont 
                        : designSettings.secondaryFont 
                    }}>
                      {generalInfo.websiteGoals.split(' ').slice(0, 7).join(' ')}...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Design-Modus */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Design-Modus</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer ${
                  designSettings.theme === 'light' || designSettings.theme === 'both' 
                    ? 'border-primary' 
                    : 'border-gray-100'
                }`}
                onClick={() => {
                  if (designSettings.theme === 'dark') {
                    setDesignSettings(prev => ({ ...prev, theme: 'both' }));
                  } else if (designSettings.theme === 'both') {
                    setDesignSettings(prev => ({ ...prev, theme: 'dark' }));
                  } else if (designSettings.theme === 'light') {
                    setDesignSettings(prev => ({ ...prev, theme: 'none' }));
                  } else {
                    setDesignSettings(prev => ({ ...prev, theme: 'light' }));
                  }
                }}
                >
                  <div className="h-32 bg-white rounded-lg border border-gray-200 mb-4"></div>
                  <div className="text-center">Hell</div>
                  {(designSettings.theme === 'light' || designSettings.theme === 'both') && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                </div>
              </div>
                  )}
            </div>
                
                <div className={`p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer ${
                  designSettings.theme === 'dark' || designSettings.theme === 'both' 
                    ? 'border-primary' 
                    : 'border-gray-100'
                }`}
                onClick={() => {
                  if (designSettings.theme === 'light') {
                    setDesignSettings(prev => ({ ...prev, theme: 'both' }));
                  } else if (designSettings.theme === 'both') {
                    setDesignSettings(prev => ({ ...prev, theme: 'light' }));
                  } else if (designSettings.theme === 'dark') {
                    setDesignSettings(prev => ({ ...prev, theme: 'none' }));
                  } else {
                    setDesignSettings(prev => ({ ...prev, theme: 'dark' }));
                  }
                }}
                >
                  <div className="h-32 bg-[#1a1a1a] rounded-lg border border-gray-700 mb-4"></div>
                  <div className="text-center">Dunkel</div>
                  {(designSettings.theme === 'dark' || designSettings.theme === 'both') && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
          </div>
        </div>
                  )}
      </div>
    </div>
            </div>

            {/* Animationen */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Animationen</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Aktivieren Sie sanfte Übergänge und Animationen</p>
                </div>
                <Switch
                  checked={designSettings.enableAnimations}
                  onCheckedChange={(checked) =>
                    setDesignSettings((prev) => ({ ...prev, enableAnimations: checked }))
                  }
                />
              </div>
            </div>

            {/* Medien Upload */}
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-6">Medien hochladen</h3>
              <div 
                className="border-2 border-dashed border-gray-200 rounded-lg p-8 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*,video/*';
                  input.multiple = true;
                  
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || []);
                    const validFiles = files.filter(file => {
                      // Validierung der Dateigröße (max 5MB für Bilder, max 50MB für Videos)
                      const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
                      if (file.size > maxSize) {
                        toast({
                          title: "Datei zu groß",
                          description: `${file.name} ist zu groß. Maximale Größe ist ${file.type.startsWith('video/') ? '50MB' : '5MB'}.`,
                          variant: "destructive"
                        });
                        return false;
                      }
                      // Validierung des Dateityps
                      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
                        toast({
                          title: "Ungültiges Dateiformat",
                          description: `${file.name} ist keine Bild- oder Videodatei.`,
                          variant: "destructive"
                        });
                        return false;
                      }
                      return true;
                    });

                    if (validFiles.length > 0) {
                      setDesignSettings((prev) => ({ 
                        ...prev, 
                        media: [...(prev.media || []), ...validFiles]
                      }));
                    }
                  };
                  
                  input.click();
                }}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  {designSettings.media?.length > 0 ? (
                    <>
                      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                        {designSettings.media.map((file, index) => (
                          <div key={index} className="relative group">
                            {file.type.startsWith('video/') ? (
                              <video
                                src={URL.createObjectURL(file)}
                                className="w-full aspect-square object-cover rounded-lg"
                                controls
                              />
                            ) : (
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={`Medien ${index + 1}`}
                                className="w-full aspect-square object-cover rounded-lg"
                              />
                            )}
                            <button
                              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDesignSettings((prev) => ({
                                  ...prev,
                                  media: prev.media?.filter((_, i) => i !== index)
                                }));
                              }}
                            >
                              <X className="h-4 w-4 text-gray-700" />
                            </button>
                          </div>
                        ))}
                      </div>
              <div className="flex gap-2">
            <Button
                  variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*,video/*';
                            input.multiple = true;
                            input.click();
                          }}
                        >
                          Weitere Medien hinzufügen
                </Button>
                <Button
                  variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDesignSettings((prev) => ({ ...prev, media: [] }));
                          }}
                        >
                          Alle Medien entfernen
            </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-4">
                        <Upload className="h-12 w-12 text-gray-400" />
                        <Film className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 mb-1">Medien hochladen</p>
                        <p className="text-sm text-gray-400">Laden Sie Bilder und Videos hoch (max. 5MB pro Bild, 50MB pro Video)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
       
      

        {/* Hosting & Wartung */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
    
          </h3>
          <div className="grid gap-4 text-sm">
            <div className="grid grid-cols-3">
              
            </div>
            <div className="grid grid-cols-3">
         
            </div>
            <div className="grid grid-cols-3">
       
     
      
         
            </div>
            <div className="grid grid-cols-3">
         
           
            
            </div>
          </div>
        </div>


            <div className="flex justify-center pt-6">
            
      </div>
    </div>
  );
      case 4:
        // Hosting Schritt: Zeige Fragen im gleichen Layout wie die anderen Steps
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="mb-2 block">Domain</Label>
              <Select
                value={hostingSettings.domain.type}
                onValueChange={(value) =>
                  setHostingSettings((prev) => ({
                    ...prev,
                    domain: { ...prev.domain, type: value as "existing" | "new" | "undecided" }
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Domain wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="existing">Vorhandene Domain</SelectItem>
                  <SelectItem value="new">Neue Domain registrieren</SelectItem>
                  <SelectItem value="undecided">Noch unentschieden</SelectItem>
                </SelectContent>
              </Select>
              {hostingSettings.domain.type === "existing" && (
                <Input
                  className="mt-2"
                  placeholder="Ihre bestehende Domain (z.B. meinefirma.de)"
                  value={hostingSettings.domain.existingDomain || ""}
                  onChange={(e) =>
                    setHostingSettings((prev) => ({
                      ...prev,
                      domain: { ...prev.domain, existingDomain: e.target.value }
                    }))
                  }
                />
              )}
              {hostingSettings.domain.type === "new" && (
                <Input
                  className="mt-2"
                  placeholder="Wunschdomain (z.B. meinefirma.de)"
                  value={hostingSettings.domain.newDomain || ""}
                  onChange={(e) =>
                    setHostingSettings((prev) => ({
                      ...prev,
                      domain: { ...prev.domain, newDomain: e.target.value }
                    }))
                  }
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="mb-2 block">Hosting-Paket</Label>
              <Select
                value={hostingSettings.hosting.package}
                onValueChange={(value) =>
                  setHostingSettings((prev) => ({
                    ...prev,
                    hosting: { ...prev.hosting, package: value as "basic" | "business" | "premium" | "undecided" }
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Paket wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="undecided">Noch unentschieden</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="mb-2 block">Fertigstellung bis</Label>
              <Input
                type="date"
                value={hostingSettings.timeline.deadline}
                onChange={(e) =>
                  setHostingSettings((prev) => ({
                    ...prev,
                    timeline: { ...prev.timeline, deadline: e.target.value }
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="mb-2 block">Maximales Budget</Label>
              <Select
                value={hostingSettings.timeline.maxBudget}
                onValueChange={(value) =>
                  setHostingSettings((prev) => ({
                    ...prev,
                    timeline: { ...prev.timeline, maxBudget: value }
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Budget wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Bis 2.000€</SelectItem>
                  <SelectItem value="medium">2.000€ - 5.000€</SelectItem>
                  <SelectItem value="large">Über 5.000€</SelectItem>
                  <SelectItem value="undecided">Noch unentschieden</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="mb-2 block">Wartung & Support</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!!hostingSettings.maintenance.backups}
                    onCheckedChange={(checked) =>
                      setHostingSettings((prev) => ({
                        ...prev,
                        maintenance: { ...prev.maintenance, backups: Boolean(checked) }
                      }))
                    }
                  />
                  <span>Backups</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!!hostingSettings.maintenance.updates}
                    onCheckedChange={(checked) =>
                      setHostingSettings((prev) => ({
                        ...prev,
                        maintenance: { ...prev.maintenance, updates: Boolean(checked) }
                      }))
                    }
                  />
                  <span>Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!!hostingSettings.maintenance.support}
                    onCheckedChange={(checked) =>
                      setHostingSettings((prev) => ({
                        ...prev,
                        maintenance: { ...prev.maintenance, support: Boolean(checked) }
                      }))
                    }
                  />
                  <span>Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!!hostingSettings.maintenance.monitoring}
                    onCheckedChange={(checked) =>
                      setHostingSettings((prev) => ({
                        ...prev,
                        maintenance: { ...prev.maintenance, monitoring: Boolean(checked) }
                      }))
                    }
                  />
                  <span>Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Ihre Website-Konfiguration</h2>
              <p className="text-gray-600">
                Überprüfen Sie Ihre Auswahl und senden Sie Ihre Anfrage ab
              </p>
            </div>

            {/* Allgemeine Informationen */}
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Allgemeine Informationen
              </h3>
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Unternehmen:</span>
                  <span className="col-span-2">{generalInfo.companyName}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Branche:</span>
                  <span className="col-span-2">{generalInfo.industry}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Standort:</span>
                  <span className="col-span-2">{generalInfo.location}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Zielgruppe:</span>
                  <span className="col-span-2">{generalInfo.targetAudience}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Website-Ziele:</span>
                  <span className="col-span-2">{generalInfo.websiteGoals}</span>
                </div>
              </div>
            </div>

            {/* Seiten & Inhalte */}
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Ausgewählte Seiten & Funktionen
              </h3>
              <div className="space-y-2">
                {websiteContent.pages
                  .filter(page => page.isSelected)
                  .map(page => (
                    <div key={page.id} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{page.title}</p>
                      {page.subsections && page.subsections.some(sub => sub.isSelected) && (
                        <div className="mt-2 ml-4 text-sm text-gray-600">
                          {page.subsections
                            .filter(sub => sub.isSelected)
                            .map(sub => (
                              <p key={sub.id}>• {sub.title}</p>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Design & Branding */}
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Design & Branding
              </h3>
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Primärfarbe:</span>
                  <div className="col-span-2 flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: designSettings.primaryColor }}
                    />
                    <span>{designSettings.primaryColor}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Sekundärfarbe:</span>
                  <div className="col-span-2 flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: designSettings.secondaryColor }}
                    />
                    <span>{designSettings.secondaryColor}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Hauptschriftart:</span>
                  <span className="col-span-2">{designSettings.primaryFont}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Textschriftart:</span>
                  <span className="col-span-2">{designSettings.secondaryFont}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Design-Modus:</span>
                  <span className="col-span-2 capitalize">{designSettings.theme}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Animationen:</span>
                  <span className="col-span-2">{designSettings.enableAnimations ? 'Aktiviert' : 'Deaktiviert'}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Hochgeladene Medien:</span>
                  <span className="col-span-2">{designSettings.media?.length || 0} Dateien</span>
                </div>
              </div>
            </div>

            {/* Hosting & Zeitplan */}
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Hosting & Zeitplan
              </h3>
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Domain:</span>
                  <span className="col-span-2">
                    {hostingSettings.domain.type === 'existing' 
                      ? hostingSettings.domain.existingDomain 
                      : hostingSettings.domain.type === 'new'
                      ? 'Neue Domain gewünscht'
                      : 'Noch unentschieden'}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Hosting-Paket:</span>
                  <span className="col-span-2 capitalize">{hostingSettings.hosting.package}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Fertigstellung bis:</span>
                  <span className="col-span-2">
                    {hostingSettings.timeline.deadline || 'Nicht angegeben'}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Budget:</span>
                  <span className="col-span-2">
                    {hostingSettings.timeline.maxBudget === 'small' ? 'Bis 2.000€' :
                     hostingSettings.timeline.maxBudget === 'medium' ? '2.000€ - 5.000€' :
                     hostingSettings.timeline.maxBudget === 'large' ? 'Über 5.000€' :
                     'Noch unentschieden'}
                  </span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-600">Wartung & Support:</span>
                  <div className="col-span-2">
                    {Object.entries(hostingSettings.maintenance)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(', ') || 'Keine Wartung ausgewählt'}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                size="lg"
                className="gap-2"
                onClick={async () => {
                  try {
                    // Bereinige die Daten von React-Komponenten und nicht serialisierbaren Daten
                    const cleanedWebsiteContent = {
                      ...websiteContent,
                      pages: websiteContent.pages.map(page => ({
                        ...page,
                        subsections: page.subsections.map(sub => ({
                          id: sub.id,
                          title: sub.title,
                          isSelected: sub.isSelected,
                          description: sub.description
                        })),
                        customSubsections: page.customSubsections.map(sub => ({
                          id: sub.id,
                          title: sub.title,
                          isSelected: sub.isSelected,
                          description: sub.description
                        }))
                      }))
                    };

                    const cleanedDesignSettings = {
                      ...designSettings,
                      media: undefined,
                      logo: undefined
                    };

                    const submitData = {
                      generalInfo,
                      websiteContent: cleanedWebsiteContent,
                      designSettings: cleanedDesignSettings,
                      hostingSettings,
                      timestamp: new Date().toISOString()
                    };

                    toast({
                      title: "Anfrage erfolgreich",
                      description: "Ihre Anfrage wurde erfolgreich übermittelt.",
                    });

                    navigate('/order-confirmation', { 
                      state: { 
                        formData: submitData 
                      } 
                    });
                    
                  } catch (error) {
                    console.error('Submit error:', error);
                    toast({
                      variant: "destructive",
                      title: "Fehler beim Senden",
                      description: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
                    });
                  }
                }}
              >
                <Send className="h-5 w-5" />
                Anfrage absenden
              </Button>
            </div>
          </div>
        );
      default:
        // Fallback: Zeige leeres, aber konsistentes Layout
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Kein Inhalt für diesen Schritt</h2>
          </div>
        );
    }
  };


  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          generalInfo.companyName &&
          generalInfo.industry &&
          generalInfo.location &&
          generalInfo.targetAudience &&
          generalInfo.websiteGoals
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep === steps.length) {
      navigate('/order/saved');
    } else {
      setCurrentStep(prev => Math.min(steps.length, prev + 1));
    }
  };

  const handleAddNewPage = () => {
    if (!newPageTitle.trim()) return;
    
    const newPage: PageSection = {
      id: `custom-page-${Date.now()}`,
      title: newPageTitle,
      isRequired: false,
      isSelected: true,
      subsections: [],
      customSubsections: [],
      isCustom: true
    };
    
    setWebsiteContent(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));
    
    setNewPageTitle("");
    setNewPageDialog(false);
  };

  const handleAddCustomSubsection = (sectionId: string) => {
                        const updatedPages = websiteContent.pages.map(page => {
      if (page.id === sectionId) {
                            return {
                              ...page,
                              customSubsections: [
                                ...(page.customSubsections || []),
            {
              id: `custom-sub-${Date.now()}`,  // ID hinzugefügt
              title: "",
              isSelected: true,
              description: "",
            }
                              ]
                            };
                          }
                          return page;
                        });
    
    setWebsiteContent(prev => ({
      ...prev,
      pages: updatedPages
    }));
  };

  // Interfaces für die Datenbank
  interface OrderData {
    id?: string;
    created_at?: string;
    general_info: {
      companyName: string;
      industry: string;
      location: string;
      targetAudience: string;
      websiteGoals: string;
      companyDescription?: string;
    };
    website_content: {
      pages: Array<{
        id: string;
        title: string;
        isSelected: boolean;
        subsections: Array<{
          id: string;
          title: string;
          isSelected: boolean;
        }>;
      }>;
    };
    design_settings: {
      primaryColor: string;
      secondaryColor: string;
      fontPrimary: string;
      fontSecondary: string;
    };
    hosting_settings: {
      hostingPlan: string;
      domain?: string;
      timeline: {
        startDate?: string;
        endDate?: string;
        maxBudget?: number;
      };
    };
  }

  // handleSubmit Funktion hinzufügen
  const handleSubmit = async () => {
    try {
      const submitData = {
        generalInfo,
        websiteContent,
        designSettings,
        hostingSettings
      };

      const response = await fetch('http://localhost:54321/functions/v1/send-order-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Anfrage erfolgreich gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });

      navigate('/order-confirmation');

    } catch (error) {
      console.error('Submit error:', error);
      toast({
        variant: "destructive",
        title: "Fehler beim Senden",
        description: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      });
    }
  };

  const handleSavePreview = async () => {
    try {
      const { user } = useAuth();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Nicht angemeldet",
          description: "Bitte melden Sie sich an, um Ihre Vorschau zu speichern.",
        });
        return;
      }

      // Stelle sicher, dass alle erforderlichen Daten vorhanden sind
      const previewData = {
        user_id: user.id,
        name: `Website-Vorschau ${new Date().toLocaleDateString()}`,
        general_info: generalInfo || {},
        website_content: websiteContent || {},
        design_settings: designSettings || {},
        hosting_settings: hostingSettings || {}
      };

      console.log('Saving preview data:', previewData); // Debug-Log

      const { error } = await supabase
        .from('saved_previews')
        .insert([previewData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Vorschau gespeichert",
        description: "Ihre Website-Konfiguration wurde erfolgreich gespeichert.",
      });

    } catch (error) {
      console.error('Save error:', error);
      toast({
        variant: "destructive",
        title: "Fehler beim Speichern",
        description: error instanceof Error ? error.message : "Ihre Konfiguration konnte nicht gespeichert werden.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-screen-lg mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Website anpassen</CardTitle>
            <CardDescription>
              Passen Sie Ihre Website nach Ihren Wünschen an
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="max-w-4xl mx-auto mb-12">
              <nav aria-label="Progress">
                <ol className="flex items-start justify-between w-full">
                  {steps.map((step, index) => (
                    <li key={step.id} className="relative">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-full border-2 relative z-10 bg-white",
                            currentStep === step.id
                              ? "border-primary bg-primary text-white"
                              : step.isCompleted
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 bg-white"
                          )}
                        >
                          <div className="flex items-center justify-center">
                            {step.icon}
                    </div>
                    </div>
                        <div className="mt-4 text-center w-24">
                          <p className="text-sm font-medium">{step.title}</p>
                  </div>
                  </div>
                      {index < steps.length - 1 && (
                        <div className="absolute top-7 left-[4.5rem] w-[calc(200%-2rem)]">
                          <div className="h-0.5 w-full bg-gradient-to-r from-gray-200/40 via-gray-200 to-gray-200"></div>
                </div>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
              {renderStepContent()}
                </div>

            {/* Navigation Buttons */}
            <div className="mt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Zurück
              </Button>
              
              {currentStep < steps.length && (
                <Button onClick={handleNext}>
                  Weiter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
                </div>
              </div>
  );
};

export default Customize;