import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { ArrowLeft, Plus, FileText, Settings, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function SteveDesk() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin = (data: LoginData) => {
    // Simple client-side check for now, should be server-side in real auth
    if (data.password === "grifflaw2025") {
      setIsAuthenticated(true);
      toast.success("Welcome back, Steve.");
    } else {
        toast.error("Incorrect password.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mb-4">
               <User className="w-8 h-8 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl font-serif text-white">Steve's Desk</CardTitle>
            <CardDescription className="text-slate-400">Restricted Access. Authorized Personnel Only.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
              <div className="space-y-2">
                 <Label htmlFor="password">Access Code</Label>
                 <Input 
                  id="password"
                  type="password" 
                  placeholder="Enter access code..." 
                  className="bg-slate-900 border-slate-600 text-white"
                  {...register("password")}
                 />
                 {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold">
                <Key className="w-4 h-4 mr-2" />
                Unlock Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex-shrink-0">
        <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-2">
            <Settings className="w-5 h-5 text-yellow-500" />
            Control Center
        </h2>
        <nav className="space-y-2">
            <button 
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "overview" ? "bg-slate-800 text-yellow-500" : "text-slate-400 hover:text-white"}`}
            >
                Overview
            </button>
            <button 
                 onClick={() => setActiveTab("blog")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "blog" ? "bg-slate-800 text-yellow-500" : "text-slate-400 hover:text-white"}`}
            >
                Blog Management
            </button>
            <button 
                 onClick={() => setActiveTab("resources")}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === "resources" ? "bg-slate-800 text-yellow-500" : "text-slate-400 hover:text-white"}`}
            >
                Client Resources
            </button>
        </nav>
        <div className="mt-auto pt-8 border-t border-slate-800">
             <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Site
             </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
             {activeTab === "overview" && (
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Total Blog Posts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">5</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">Resource Links</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">7</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">System Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-green-500 font-bold flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    Operational
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
             )}

             {activeTab === "blog" && (
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                         <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
                          <Button className="bg-yellow-600 hover:bg-yellow-700">
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                          </Button>
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-slate-500 text-center py-8">Blog post management features coming soon. For now, use the codebase to add posts.</p>
                        </CardContent>
                    </Card>
                 </div>
             )}

             {activeTab === "resources" && (
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                         <h1 className="text-3xl font-bold text-slate-900">Resource Management</h1>
                          <Button className="bg-yellow-600 hover:bg-yellow-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Resource
                          </Button>
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-slate-500 text-center py-8">Resource management features coming soon.</p>
                        </CardContent>
                    </Card>
                 </div>
             )}
        </div>
      </main>
    </div>
  );
}
