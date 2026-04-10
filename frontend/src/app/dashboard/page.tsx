"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { LogOut, Heart } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import api from "@/lib/api";
import styles from "./page.module.css";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [properties, setProperties] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [propsRes, favsRes] = await Promise.all([
          api.get("/properties"),
          api.get("/favourites?limit=100")
        ]);
        
        setProperties(propsRes.data);
        setFavourites(favsRes.data.data.map((f: any) => f.propertyId));
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user || loading) {
    return <div className={styles.loading}>Loading your portal...</div>;
  }

  const myFavouriteProperties = properties.filter(p => favourites.includes(p.id));

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.welcome}>
          Welcome, <span>{user.name}</span>!
        </div>
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={16} /> Logout
        </button>
      </header>

      <main>
        <h2 className={styles.sectionTitle}>
          <Heart size={20} fill="var(--danger)" color="var(--danger)" /> My Favourites
        </h2>
        {myFavouriteProperties.length === 0 ? (
          <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>
            You haven't added any properties to your favourites yet.
          </p>
        ) : (
          <div className={styles.grid}>
            {myFavouriteProperties.map(prop => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavourited={true}
                onLikeToggle={(id, isLiked) => {
                  if (!isLiked) {
                    setFavourites(prev => prev.filter(fid => fid !== id));
                  }
                }}
              />
            ))}
          </div>
        )}

        <h2 className={styles.sectionTitle}>Available Properties</h2>
        <div className={styles.grid}>
          {properties.map(prop => (
            <PropertyCard
              key={prop.id}
              property={prop}
              isFavourited={favourites.includes(prop.id)}
              onLikeToggle={(id, isLiked) => {
                if (isLiked) {
                  setFavourites(prev => [...prev, id]);
                } else {
                  setFavourites(prev => prev.filter(fid => fid !== id));
                }
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
