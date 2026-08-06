export interface TechDetailItem {
  label: string;
  value: string;
}

export interface CustomRelatedExhibit {
  code: string;
  label: string;
}

export interface WorkItem {
  exhibit: string;
  category: string;
  title: string;
  headline: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  description: string;
  articleText1: string;
  articleText2: string;
  quote: string;
  figCaption: string;
  tags: string[];
  timeline: string;
  role: string;
  isFlagship?: boolean;
  previewType: string;
  sidebarTitle?: string;
  sidebarItems?: TechDetailItem[];
  customRelatedExhibits?: CustomRelatedExhibit[];
  ctaLeftText?: string;
  ctaRightText?: string;
  techDetails: {
    frontend: string;
    data: string;
    hosting: string;
    role: string;
    entered: string;
    status: string;
  };
  relatedExhibits: string[];
}
