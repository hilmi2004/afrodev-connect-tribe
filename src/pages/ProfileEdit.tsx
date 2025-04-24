
import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function ProfileEdit() {
  // For demo, use local state only.
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("janedoe@example.com");
  const [location, setLocation] = useState("Nairobi, Kenya");
  const [stack, setStack] = useState("React, Node.js, PostgreSQL, Tailwind CSS");
  const [saving, setSaving] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      window.location.href = "/profile";
    }, 1100); // Fake saving delay
  }

  return (
    <MainLayout>
      <div className="container py-10 flex flex-col items-center">
        <Card className="w-full max-w-xl shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack</label>
                <Input value={stack} onChange={e => setStack(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="secondary" asChild>
                <a href="/profile">Cancel</a>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
