import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { uploadAvatar } from '@/lib/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from "react-router-dom";

interface SavedPreview {
  id: string;
  name: string;
  preview_url: string;
  created_at: string;
  settings: any;
}

export default function Profile() {
  const [savedPreviews, setSavedPreviews] = useState<SavedPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadSavedPreviews();
  }, []);

  async function loadSavedPreviews() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data } = await supabase
          .from('saved_previews')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (data) {
          setSavedPreviews(data);
        }
      }
    } catch (error) {
      console.error('Error loading saved previews:', error);
    }
  }

  async function deletePreview(previewId: string) {
    try {
      const { error } = await supabase
        .from('saved_previews')
        .delete()
        .eq('id', previewId);

      if (error) throw error;

      setSavedPreviews(prev => prev.filter(p => p.id !== previewId));
      toast({
        title: "Success",
        description: "Preview deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete preview",
      });
    }
  }

  const loadSavedDesign = (preview: SavedPreview) => {
    navigate('/customize', { 
      state: { 
        savedSettings: preview.settings 
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Saved Previews Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Saved Previews</h2>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Current
            </Button>
          </div>
          
          {savedPreviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No saved previews yet. Save your current design to see it here!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPreviews.map((preview) => (
                <Card 
                  key={preview.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => loadSavedDesign(preview)}
                >
                  <div className="aspect-video bg-neutral-100">
                    <img
                      src={preview.preview_url}
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{preview.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePreview(preview.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(preview.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}