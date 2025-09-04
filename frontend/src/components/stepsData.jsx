import { PlusSquare, Search, UserPlus } from "lucide-react";

export const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Sign up for free to get your personalized profile and start your collection.",
    bgColor: "from-red-500 to-pink-600",
    features: ["Free forever", "Secure profile", "Personal dashboard"]
  },
  {
    icon: PlusSquare,
    title: "Add Your Recipes",
    description: "Share your favorite dishes with our community using our simple recipe editor.",
    bgColor: "from-yellow-500 to-orange-600",
    features: ["Easy editor", "Photo uploads", "Step-by-step guide"]
  },
  {
    icon: Search,
    title: "Explore & Interact",
    description: "Discover new meals, leave comments, and like the recipes that inspire you.",
    bgColor: "from-green-500 to-emerald-600",
    features: ["Smart search", "Save favorites", "Community interaction"]
  }
];
