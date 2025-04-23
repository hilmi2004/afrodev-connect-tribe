
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const journeySteps = [
  {
    year: "2018",
    title: "Started University",
    description: "Began studying Computer Science at University of Nairobi.",
  },
  {
    year: "2020",
    title: "Internship at TechCorp",
    description: "Built internal dashboards and automations using React and Node.js.",
  },
  {
    year: "2021",
    title: "Lead Developer, UmojaPay",
    description: "Led the team in launching a FinTech platform for mobile payments across Africa.",
  },
  {
    year: "2023",
    title: "Tech Community Organizer",
    description: "Founded NairobiJS meetups and mentored junior devs.",
  },
];

export default function DevJourney() {
  return (
    <MainLayout>
      <div className="container py-10 flex flex-col items-center">
        <Card className="w-full max-w-xl shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>My Developer Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-s-2 border-afro-purple/25 ml-4 pl-4">
              {journeySteps.map((step, i) => (
                <li className="mb-10 ms-4" key={step.year}>
                  <div className="absolute w-3 h-3 bg-afro-purple rounded-full mt-2.5 -start-1.5 border-2 border-white"></div>
                  <div className="font-semibold text-lg">{step.year} - {step.title}</div>
                  <div className="text-gray-500">{step.description}</div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
