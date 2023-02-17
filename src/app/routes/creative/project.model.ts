
export interface Project_ {
    title: string;
    description: string;
    guide: string;
    image: string;
    demo: string;
    source: string;
    date_start: string;
    date_end: string;
    technologies: string[];
    exist: boolean;
    projectTypes: number[];
    displayType: number;
}
export interface Post_ {
    title: string;
    description: string;
    guide: string;
    image: string;
    link: string;
    link_source: string;
    tags: string[];
    date_start: string;
    date_end: string;
    exist: boolean;
    type_index: number;
    priority: number;
}
export interface Post extends Partial<Post_> {}
export interface Project extends Partial<Project_> {}
