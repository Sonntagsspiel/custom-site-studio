import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserStats {
  total: number;
  admins: number;
  regular: number;
}

interface ContentStats {
  pages: number;
  previews: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userStats, setUserStats] = useState<UserStats>({ total: 0, admins: 0, regular: 0 });
  const [contentStats, setContentStats] = useState<ContentStats>({ pages: 0, previews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Please sign in to access this page.",
        });
        navigate("/signin");
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.is_admin) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have admin privileges.",
        });
        navigate("/");
        return;
      }

      // Fetch statistics
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      const { count: adminUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('is_admin', true);

      setUserStats({
        total: totalUsers || 0,
        admins: adminUsers || 0,
        regular: (totalUsers || 0) - (adminUsers || 0)
      });

      const { count: totalPreviews } = await supabase
        .from('saved_previews')
        .select('*', { count: 'exact' });

      setContentStats({
        pages: 12, // Hardcoded for now, could be dynamic based on your routes
        previews: totalPreviews || 0
      });

      setLoading(false);
    };

    checkAdminStatus();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading statistics...</p>
            ) : (
              <div className="space-y-2">
                <p>Total users: {userStats.total}</p>
                <p>Admin users: {userStats.admins}</p>
                <p>Regular users: {userStats.regular}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Manage website content</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading statistics...</p>
            ) : (
              <div className="space-y-2">
                <p>Active pages: {contentStats.pages}</p>
                <p>Saved previews: {contentStats.previews}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Last login: {new Date().toLocaleDateString()}</p>
              <p>System status: Active</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;