/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- TYPE DEFINITIONS ---
export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  content: string;
  coverImage: string;
  author: any;
  category: any;
  tags: string[];
  readTime: number;
  likes: number;
  dislikes: number;
  isTrending: boolean;
  relatedBlogIds: number[];
  audioUrl: string | null;
  poll: Poll | null;
  documentId?: string;
  blog_author?: any;
  comments?: any
}



export interface Comment {
  id: number;
  blogId: number;
  author: string;
  date?: string;
  content?: string;
  publishedAt?: any;
}

interface DummyData {
  blogs: Blog[];
  comments: Comment[];
}

// --- DUMMY DATA ---
export const dummyData: DummyData = {
  blogs: [
    {
      id: 1,
      slug: "the-future-of-ai-in-web-development",
      title: "The Future of AI in Web Development",
      content: `<p>Artificial Intelligence (AI) is no longer a concept confined to science fiction. It's rapidly becoming an integral part of our daily lives, and web development is no exception. From automated coding to personalized user experiences, AI is set to revolutionize how we build and interact with websites.</p>
            <h2>AI-Powered Code Assistance</h2>
            <p>Tools like GitHub Copilot are already changing the game. They suggest entire lines or blocks of code as developers type, drastically speeding up the development process and reducing boilerplate. This allows developers to focus on more complex logic and creative problem-solving.</p>
            <h3>The Rise of Self-Designing Websites</h3>
            <p>Imagine providing an AI with a simple text prompt, and it generates a complete, visually appealing website layout. Services like The Grid and Bookmark are early pioneers in this space, using AI to make design decisions based on user content. While still in their infancy, they point towards a future where web design is more accessible than ever.</p>`,
      coverImage: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1974&auto=format&fit=crop",
      author: "Jane Doe",
      category: "Technology",
      tags: ["AI", "Web Development", "Future Tech"],
      readTime: 5,
      likes: 128,
      dislikes: 4,
      isTrending: true,
      relatedBlogIds: [2, 3],
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      poll: {
        id: 1,
        question: "Which AI tool are you most excited about?",
        options: [
          { id: 1, text: "AI Code Assistants", votes: 45 },
          { id: 2, text: "AI Design Generators", votes: 32 },
          { id: 3, text: "Personalized UX AI", votes: 22 },
        ],
      },
    },
    {
      id: 2,
      slug: "mastering-react-hooks-a-deep-dive",
      title: "Mastering React Hooks: A Deep Dive",
      content:
        "<p>React Hooks have fundamentally changed how we write React components. They allow us to use state and other React features without writing a class. This article explores some of the most powerful hooks and how to use them effectively.</p><h2>useState and useEffect</h2><p>These are the bread and butter of hooks. <code>useState</code> provides state management in functional components, while <code>useEffect</code> handles side effects like API calls or subscriptions. Mastering their combination is key to building dynamic applications.</p>",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
      author: "John Smith",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend"],
      readTime: 8,
      likes: 256,
      dislikes: 12,
      isTrending: true,
      relatedBlogIds: [1, 4],
      audioUrl: null,
      poll: null,
    },
    {
      id: 3,
      slug: "a-guide-to-mindful-living",
      title: "A Guide to Mindful Living",
      content:
        "<p>In our fast-paced world, mindfulness offers a path to peace and clarity. It's the practice of being present and fully aware of the moment, without judgment. This guide provides simple techniques to incorporate mindfulness into your daily routine.</p>",
      coverImage: "https://images.unsplash.com/photo-1474418397713-7e15e4d5e154?q=80&w=2070&auto=format&fit=crop",
      author: "Emily White",
      category: "Wellness",
      tags: ["Mindfulness", "Health", "Lifestyle"],
      readTime: 6,
      likes: 98,
      dislikes: 2,
      isTrending: false,
      relatedBlogIds: [],
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      poll: null,
    },
    {
      id: 4,
      slug: "the-art-of-sustainable-travel",
      title: "The Art of Sustainable Travel",
      content:
        "<p>Traveling is a privilege, and with it comes the responsibility to protect our planet. Sustainable travel is about making conscious choices to minimize your environmental impact and support local communities. Learn how you can become a more responsible tourist.</p>",
      coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
      author: "Chris Green",
      category: "Travel",
      tags: ["Sustainability", "Travel", "Eco-friendly"],
      readTime: 7,
      likes: 150,
      dislikes: 5,
      isTrending: false,
      relatedBlogIds: [3],
      audioUrl: null,
      poll: null,
    },
  ],
  comments: [
    { id: 1, blogId: 1, author: "Mike", date: "2024-07-20" },
    {
      id: 2,
      blogId: 1,
      author: "Sarah",
      date: "2024-07-21",
    },
  ],
};

// --- UTILITY FUNCTIONS ---
export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
