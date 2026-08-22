export type ReleaseType = "ORIGINAL" | "EDIT / REMIX" | "EXTENDED MIX" | "BOOTLEG" | "COLLAB";

export interface ReleaseTrack {
  id: string;
  catalogNumber: string;
  title: string;
  artist: string;
  featuredArtists?: string[];
  releaseType: ReleaseType;
  year: number;
  genre: string;
  bpm?: number;
  key?: string;
  coverImage: string;
  duration: string;
  description: string;
  links: {
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
    beatport?: string;
    appleMusic?: string;
    download?: string;
  };
  audioPreview?: string;
  soundCloudTrackId?: string;
  soundCloudEmbedUrl?: string;
  likes?: number;
  isFlagship?: boolean;
}

export interface MixsetItem {
  id: string;
  series: string;
  vol: string;
  title: string;
  subtitle: string;
  duration: string;
  recordedDate: string;
  location: string;
  genre: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  description: string;
  tracklist: {
    timestamp: string;
    title: string;
    artist: string;
  }[];
}

export interface TourDate {
  id: string;
  date: string;
  day: string;
  month: string;
  city: string;
  country: string;
  venue: string;
  event: string;
  status: "UPCOMING" | "PAST" | "SOLD OUT";
  ticketUrl?: string;
}

export interface SoundMetric {
  label: string;
  value: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  displayUrl: string;
}

export interface PowDArtistProfile {
  name: string;
  stageName: string;
  estd: number;
  origin: string;
  tagline: string;
  soundIdentity: string;
  bioParagraphs: string[];
  quotes: {
    quote: string;
    author: string;
    context: string;
  }[];
  gear: {
    category: string;
    items: string[];
  }[];
  soundMetrics: SoundMetric[];
}
