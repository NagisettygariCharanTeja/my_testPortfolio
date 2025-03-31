export interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  image: string;
  company?: string;
  collaborator?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description: "A beautiful interface design project showcasing modern aesthetics and user-centered design principles.",
    year: "2024",
    image: "https://placehold.co/600x400",
    company: "Apple"
  },
  {
    id: 2,
    title: "Project Two",
    description: "An innovative mobile application design that pushes the boundaries of user interaction.",
    year: "2023",
    image: "https://placehold.co/600x400",
    collaborator: "Design Team"
  },
  {
    id: 3,
    title: "Project Three",
    description: "A comprehensive design system that unifies the visual language across multiple platforms.",
    year: "2023",
    image: "https://placehold.co/600x400"
  }
]; 