export enum FileStatus {
    IDLE = 'IDLE',
    PARSING = 'PARSING',
    GENERATING = 'GENERATING',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR',
    QUEUED = 'QUEUED'
}

export type AIEngine = 'gemini' | 'ollama';

export interface AppFile {
    id: string;
    file: File;
    status: FileStatus;
    progress: number;
    extractedText?: string;
    schema?: NotebookSchema;
    error?: string;
    mimeType: string;
    timestamp: number;
}

export interface NotebookSchema {
    title: string;
    summary: string;
    documentType: string;
    author?: string;
    keywords: string[];
    entities: {
        name: string;
        type: string;
        description: string;
    }[];
    keyClaims: string[];
    structure: {
        section: string;
        topics: string[];
    }[];
    logicalRelationships: {
        from: string;
        to: string;
        relationship: string;
    }[];
    semanticBriefing?: string;
    expertPersona?: string;
}
