import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, Save, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SavedPreview {
  id: string;
  name: string;
  preview_url: string;
  created_at: string;
}

export default function Profile() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [savedPreviews, setSavedPreviews] = useState<SavedPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
    loadSavedPreviews();
  }, []);

  async function loadProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
        
        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

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

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) throw new Error('No user found');

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await supabase
        .from('profiles')
        .upsert({ id: user.id, avatar_url: publicUrl });

      setAvatarUrl(publicUrl);
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile picture",
      });
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || ''} alt="Profile" />
                <AvatarFallback>
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90">
                <Camera className="h-4 w-4" />
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadAvatar}
                  disabled={loading}
                />
              </Label>
            </div>
            <div>
              <h3 className="text-lg font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Click the camera icon to update your profile picture
              </p>
            </div>
          </div>
        </Card>

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
                <Card key={preview.id} className="overflow-hidden">
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
                        onClick={() => deletePreview(preview.id)}
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