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

export interface DetailedImage {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    downloads: number;
    likes: number;
    liked_by_user: boolean;
    public_domain: boolean;
    description: string;
    exif: Exif;
    location: Location;
    tags: Tag[];
    current_user_collections: Collection[];
    urls: Urls;
    links: PhotoLinks;
    user: User;
  }
  
  interface Exif {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  }
  
  interface Location {
    city: string;
    country: string;
    position: Position;
  }
  
  interface Position {
    latitude: number;
    longitude: number;
  }
  
  interface Tag {
    title: string;
  }
  
  interface Collection {
    id: number;
    title: string;
    published_at: string;
    last_collected_at: string;
    updated_at: string;
    cover_photo: null; 
    user: null; 
  }
  
  interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  }
  
  interface PhotoLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
  }
  
  interface User {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    portfolio_url: string;
    bio: string;
    location: string;
    total_likes: number;
    total_photos: number;
    total_collections: number;
    links: UserLinks;
  }
  
  interface UserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
  }
