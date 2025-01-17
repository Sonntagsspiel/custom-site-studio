import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error registering",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account. You will be redirected to the sign in page.",
      });
      
      // Clear the form
      setEmail("");
      setPassword("");
      
      // Redirect to signin page after a short delay
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error registering",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Create an account
          </h1>
          <p className="text-gray-600">
            Get started with your website builder account
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 mb-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="ghost" className="mx-auto">
            <Link to="/signin">Already have an account? Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;