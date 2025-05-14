export interface Answer {
    id:           number;
    userId:       string;
    number:       number;
    title:        string;
    difficulty:   string;
    language:     string;
    description?: string;
    explanation:  string;
    code:         string;
    videoLink?:   string;
}