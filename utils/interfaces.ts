export interface UnsplashImage {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  breadcrumbs: any[];
  urls: {
    [key: string]: string;
  };
  links: {
    [key: string]: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: {
    [key: string]: any;
  };
  user: {
    [key: string]: any;
  };
  tags: any[];
}

export interface UnsplashImageResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
  prevOffset: number;
}
