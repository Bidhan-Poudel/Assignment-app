"use client";

import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import api from "@/lib/api";
import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    city: string;
    imageUrl: string;
  };
  isFavourited: boolean;
  onLikeToggle?: (propertyId: string, isLikedNow: boolean) => void;
}

export default function PropertyCard({ property, isFavourited, onLikeToggle }: PropertyCardProps) {
  const [liked, setLiked] = useState(isFavourited);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (liked) {
        await api.delete(`/favourites/${property.id}`);
        setLiked(false);
        if (onLikeToggle) onLikeToggle(property.id, false);
      } else {
        await api.post(`/favourites/${property.id}`);
        setLiked(true);
        if (onLikeToggle) onLikeToggle(property.id, true);
      }
    } catch (error) {
      console.error("Failed to toggle like", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <button className={styles.likeBtn} onClick={toggleLike} disabled={loading}>
        <Heart className={liked ? styles.liked : styles.unliked} size={20} />
      </button>
      <img src={property.imageUrl || "https://placehold.co/600x400"} alt={property.title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.city}>
          <MapPin size={14} /> {property.city}
        </div>
        <h3 className={styles.title}>{property.title}</h3>
        <div className={styles.price}>${property.price.toLocaleString()}</div>
        <p className={styles.description}>{property.description}</p>
      </div>
    </div>
  );
}
