
import { MainLayout } from "@/components/layout/MainLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfileView() {
  return (
    <MainLayout>
      <div className="container py-10 flex flex-col items-center">
        <Card className="w-full max-w-xl shadow-lg animate-fade-in">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=example" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle>Jane Doe</CardTitle>
            <CardDescription className="text-center">Full Stack Developer & Community Leader</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="font-semibold text-gray-600">Email:</div>
              <div>janedoe@example.com</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Location:</div>
              <div>Nairobi, Kenya</div>
            </div>
            <div>
              <div className="font-semibold text-gray-600">Tech Stack:</div>
              <div>React, Node.js, PostgreSQL, Tailwind CSS</div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 justify-center">
            <Button variant="secondary" asChild>
              <a href="/profile/edit">Edit Profile</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/profile/journey">View Dev Journey</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
