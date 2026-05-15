export interface ReviewItem {
  id: number;
  nameKey: string;
  reviewKey: string;
  rating: number;
  avatar: string;
}

export const reviewsData: ReviewItem[] = [
  {
    id: 1,
    nameKey: "opinions.reviews.0.name",
    reviewKey: "opinions.reviews.0.review",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Julio+Gallegos&background=061202&color=fff&size=80",
  },
  {
    id: 2,
    nameKey: "opinions.reviews.1.name",
    reviewKey: "opinions.reviews.1.review",
    rating: 4,
    avatar: "https://ui-avatars.com/api/?name=Alberto+Sebastian&background=0a2006&color=fff&size=80",
  },
  {
    id: 3,
    nameKey: "opinions.reviews.2.name",
    reviewKey: "opinions.reviews.2.review",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Paola+Peregas&background=0f2a08&color=fff&size=80",
  },
  {
    id: 4,
    nameKey: "opinions.reviews.3.name",
    reviewKey: "opinions.reviews.3.review",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Dianelly+Mijangos&background=1a3a14&color=fff&size=80",
  },
];