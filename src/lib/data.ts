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
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  likes: number;
  dislikes: number;
  isTrending: boolean;
  relatedBlogIds: number[];
  audioUrl: string | null;
  poll: Poll | null;
}

export interface Comment {
  id: number;
  blogId: number;
  author: string;
  body: string;
  date: string;
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
    // ... other blogs from the original file
  ],
  comments: [
    { id: 1, blogId: 1, author: "Mike", body: "Great article! AI in development is fascinating.", date: "2024-07-20" },
    {
      id: 2,
      blogId: 1,
      author: "Sarah",
      body: "I'm already using Copilot and it's a huge time-saver.",
      date: "2024-07-21",
    },
  ],
};

// --- UTILITY FUNCTIONS ---
export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
