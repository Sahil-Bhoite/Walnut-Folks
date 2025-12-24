// Mock Data for Voice Analytics Dashboard

export interface CallDurationData {
    range: string;
    calls: number;
}

export interface SadPathData {
    category: string;
    count: number;
}

export interface VerbalAggressionData {
    status: string;
    value: number;
    color: string;
}

export interface CallerIdData {
    issue: string;
    count: number;
}

export interface LanguageSupportData {
    language: string;
    count: number;
}

// 1. Call Duration Analysis (Line/Bar)
export const callDurationData: CallDurationData[] = [
    { range: '0-30s', calls: 350 },
    { range: '30-60s', calls: 820 },
    { range: '60-90s', calls: 640 },
    { range: '90-120s', calls: 450 },
    { range: '2-3m', calls: 380 },
    { range: '3-5m', calls: 210 },
    { range: '5m+', calls: 120 },
];

// 2. Sad Path Analysis (Bar)
export const sadPathData: SadPathData[] = [
    { category: 'Identity Refusal', count: 145 },
    { category: 'Unsupported Lang', count: 89 },
    { category: 'Caller Dropped', count: 234 },
    { category: 'Intent Misunderstood', count: 178 },
    { category: 'Silence/Timeout', count: 112 },
];

// 3. Verbal Aggression Detection (Donut - EDITABLE)
export const defaultVerbalAggressionData: VerbalAggressionData[] = [
    { status: 'Neutral', value: 65, color: '#5ED3F3' }, // Secondary
    { status: 'Frustrated', value: 20, color: '#7C5CFF' }, // Primary
    { status: 'Hostile', value: 10, color: '#FFB86C' }, // Warning
    { status: 'Abusive', value: 5, color: '#FF6B6B' }, // Error
];

// 4. Caller Identification Issues (Horizontal Bar)
export const callerIdData: CallerIdData[] = [
    { issue: 'Background Noise', count: 420 },
    { issue: 'Multiple Users', count: 280 },
    { issue: 'Incorrect Identity', count: 150 },
    { issue: 'Voice Spoofing', count: 45 },
];

// 5. Language Support Failures (Bar)
export const languageSupportData: LanguageSupportData[] = [
    { language: 'French', count: 85 },
    { language: 'Spanish', count: 142 },
    { language: 'German', count: 34 },
    { language: 'Mandarin', count: 67 },
    { language: 'Unsupported', count: 115 },
];
