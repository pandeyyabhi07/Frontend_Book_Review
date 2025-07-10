// src/data/books.js

export const books = [
  {
    id: "OL82565W",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness...",
    image: "https://covers.openlibrary.org/b/id/10487609-M.jpg",
    category: "finance",
    rating: 4.5,
    year: 2020,
    pages: 252,
    reviews: [
      {
        author: "John Doe",
        rating: 5,
        text: "Changed my perspective on money completely."
      },
      {
        author: "Jane Smith",
        rating: 4,
        text: "Great insights but some concepts could be explained more clearly."
      }
    ]
  },
  {
    id: "OL7353617M",
    title: "The Shining",
    author: "Stephen King",
    description: "Jack Torrance's new job at the Overlook Hotel...",
    image: "https://covers.openlibrary.org/b/id/8317231-M.jpg",
    category: "horror",
    rating: 4.7,
    year: 1977,
    pages: 447,
    reviews: [
      {
        author: "Mike Johnson",
        rating: 5,
        text: "One of King's best works. Incredibly tense throughout."
      }
    ]
  },
  {
    id: "OL32022831M",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "The romantic clash between Elizabeth and Mr. Darcy...",
    image: "https://covers.openlibrary.org/b/id/4261828-M.jpg",
    category: "romance",
    rating: 4.8,
    year: 1813,
    pages: 279,
    reviews: []
  }
];
