export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  heritage_site_id: string;
  created_at: string;
}

export interface UserStats {
  sitesExplored: number;
  arExperiences: number;
  vrToursCompleted: number;
  savedMonuments: number;
}
