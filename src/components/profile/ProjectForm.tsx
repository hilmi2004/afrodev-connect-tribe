import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import api from '@/lib/api';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const projectFormSchema = z.object({
    title: z.string().min(3, {
        message: "Project title must be at least 3 characters",
    }),
    description: z.string().min(10, {
        message: "Project description must be at least 10 characters",
    }),
    category: z.string().min(1, {
        message: "Please select a category",
    }),
    image: z.string().optional(),
    repoUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    techStack: z.array(z.string()).min(1, {
        message: "Please add at least one technology",
    }),
    status: z.enum(["idea", "in-progress", "completed", "seeking-help"], {
        required_error: "Please select a project status",
    }),
    lookingForContributors: z.boolean().default(false),
    tribeId: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const categories = [
    "Web Development",
    "Mobile App",
    "Data Science",
    "Machine Learning",
    "Blockchain",
    "IoT",
    "Game Development",
    "Open Source",
    "Other",
];

export function ProjectForm() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [techInput, setTechInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            image: "",
            repoUrl: "",
            demoUrl: "",
            techStack: [],
            status: "idea",
            lookingForContributors: false,
            tags: [],
            tribeId: "",
        },
    });

    const techStack = form.watch("techStack");

    function addTechnology() {
        if (!techInput.trim()) return;

        if (!techStack.includes(techInput.trim())) {
            form.setValue("techStack", [...techStack, techInput.trim()]);
        }

        setTechInput("");
    }

    function removeTechnology(tech: string) {
        form.setValue(
            "techStack",
            techStack.filter((t) => t !== tech)
        );
    }

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true);

        try {
            const response = await api.post('/projects', {
                title: data.title,
                description: data.description,
                category: data.category,
                image: data.image,
                repoUrl: data.repoUrl,
                demoUrl: data.demoUrl,
                techStack: data.techStack,
                status: data.status,
                lookingForContributors: data.lookingForContributors,
            });

            toast({
                title: "Project created successfully!",
                description: "Your project has been added to your profile.",
            });

            form.reset();
        } catch (error) {
            console.error("Error creating project:", error);
            let errorMessage = "There was a problem creating your project. Please try again.";

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            }

            toast({
                title: "Error creating project",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter project title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your project"
                                            className="min-h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="idea">Idea</SelectItem>
                                                <SelectItem value="in-progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                                <SelectItem value="seeking-help">Seeking Help</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="repoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Repository URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://github.com/username/repo" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            GitHub or GitLab repository URL
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="demoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Demo URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://your-demo.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Live demo or project website
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="techStack"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Technologies Used</FormLabel>
                                    <div className="flex gap-2">
                                        <Input
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            placeholder="Add a technology"
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addTechnology();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={addTechnology}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {techStack.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="gap-1">
                                                {tech}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTechnology(tech)}
                                                    className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.jpg" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Link to a cover image for your project
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lookingForContributors"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Looking for Contributors</FormLabel>
                                        <FormDescription>
                                            Let others know you're open to collaboration
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating project..." : "Create Project"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}