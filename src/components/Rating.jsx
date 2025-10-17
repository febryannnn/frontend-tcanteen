import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Container,
  Chip,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { keyframes } from "@mui/system";

// Data dummy reviews
const reviewsData = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    verified: true,
    comment:
      "Makanannya enak banget! Nasi gorengnya pas bumbunya, tidak terlalu asin. Porsinya juga besar, worth it!",
    foodOrdered: "Nasi Goreng Spesial",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 4,
    verified: true,
    comment: "Sate ayamnya juicy dan bumbunya meresap sempurna.",
    foodOrdered: "Sate Ayam Madura",
  },
  {
    id: 3,
    name: "Agus Wijaya",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    verified: false,
    comment:
      "Rendangnya mantap! Dagingnya empuk banget dan bumbunya kaya rempah. Ini rendang terbaik!",
    foodOrdered: "Rendang Sapi",
  },
  {
    id: 4,
    name: "Dewi Kusuma",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 4.5,
    verified: true,
    comment: "Tempatnya bersih, pelayanannya ramah. Makanannya fresh dan enak.",
    foodOrdered: "Gado-gado Jakarta",
  },
  {
    id: 5,
    name: "Rudi Hartono",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 3.5,
    verified: false,
    comment: "Rasanya lumayan enak, tapi porsinya agak kurang untuk saya.",
    foodOrdered: "Mie Goreng Jawa",
  },
  {
    id: 6,
    name: "Linda Wijayanti",
    avatar: "https://i.pravatar.cc/150?img=23",
    rating: 5,
    verified: true,
    comment:
      "Pelayanannya cepat dan ramah. Makanannya selalu konsisten enaknya. Highly recommended!",
    foodOrdered: "Ayam Geprek",
  },
  {
    id: 7,
    name: "Andi Pratama",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4,
    verified: true,
    comment: "Enak dan harganya terjangkau!",
    foodOrdered: "Soto Ayam",
  },
  {
    id: 8,
    name: "Rina Amelia",
    avatar: "https://i.pravatar.cc/150?img=28",
    rating: 5,
    verified: false,
    comment: "Baksonya gede-gede dan kuahnya gurih. Mantap pokoknya!",
    foodOrdered: "Bakso Jumbo",
  },
  {
    id: 9,
    name: "Hendra Susilo",
    avatar: "https://i.pravatar.cc/150?img=52",
    rating: 4.5,
    verified: true,
    comment: "Pelayanan cepat, rasa juara. Pasti balik lagi.",
    foodOrdered: "Nasi Uduk",
  },
];

// Shuffle array randomly
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Split reviews into 3 rows randomly
const row1Reviews = shuffleArray(reviewsData.slice(0, 3));
const row2Reviews = shuffleArray(reviewsData.slice(3, 6));
const row3Reviews = shuffleArray(reviewsData.slice(6, 9));

// Animation keyframes
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const cardColors = [
  "linear-gradient(45deg, #A8E6CF, #DCEDC1)",
  "linear-gradient(45deg, #FFD3B6, #FFAAA5)",
  "linear-gradient(45deg, #A0E7E5, #B4F8C8)",
  "linear-gradient(45deg, #FBE7C6, #FFDAC1)",
  "linear-gradient(45deg, #B3EBF2, #E8F0F2)",
  "linear-gradient(45deg, #D4A5A5, #EFD9D1)",
  "linear-gradient(45deg, #C8E6C9, #DCEDC8)",
  "linear-gradient(45deg, #FFECB3, #FFE082)",
];

const ReviewCard = ({ review }) => {

  const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];
  return (
    <Card
      elevation={2}
      sx={{
        minWidth: 380,
        maxWidth: 450,
        // height: "100%",
        height: "130px",
        flexShrink: 0,
        transition: "all 0.3s ease",
        background: randomColor,
        // backgroundColor:'#',
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* User Info + Chip in one row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          {/* Avatar + Name + Rating */}
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            <Avatar
              src={review.avatar}
              alt={review.name}
              sx={{ width: 40, height: 40, mr: 1.5 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                  noWrap
                >
                  {review.name}
                </Typography>
                {review.verified && (
                  <VerifiedIcon sx={{ fontSize: 14, color: "primary.main" }} />
                )}
              </Box>
              <Rating
                value={review.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </Box>
          </Box>

          {/* Food Ordered Chip (moved to right side) */}
          <Chip
            label={review.foodOrdered}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.75rem",
              backgroundColor: "primary.light",
              color: "white",
              fontWeight: 600,
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Comment */}
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.5,
            color: "text.primary",
            fontSize: "0.85rem",
          }}
        >
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Scrolling Row Component
const ScrollingRow = ({ reviews, direction, speed = 30 }) => {
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          animation: `${
            direction === "left" ? scrollLeft : scrollRight
          } ${speed}s linear infinite`,
          "&:hover": {
            animationPlayState: "paused",
          },
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </Box>
    </Box>
  );
};

export default function CustomerReviews() {
  return (
    <Box sx={{ bgcolor: "background.default", py: 6, overflow: "hidden" }}>
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}
        >
          Customer's Review
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 4 }}
        >
          What they think about us
        </Typography>
      </Container>

      {/* Row 1 - Right to Left */}
      <ScrollingRow reviews={row1Reviews} direction="left" speed={35} />

      {/* Row 2 - Left to Right */}
      <ScrollingRow reviews={row2Reviews} direction="right" speed={40} />

      {/* Row 3 - Right to Left */}
      <ScrollingRow reviews={row3Reviews} direction="left" speed={38} />
    </Box>
  );
}
