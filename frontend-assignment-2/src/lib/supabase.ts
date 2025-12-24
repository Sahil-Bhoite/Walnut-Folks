import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
    return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.length > 0 && supabaseAnonKey.length > 0);
};

const getSupabaseClient = (): SupabaseClient | null => {
    if (!isSupabaseConfigured()) return null;
    if (!supabase) supabase = createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
};

// Persist data
export const saveVerbalAggressionData = async (
    email: string,
    data: any[]
): Promise<{ success: boolean; error?: string }> => {
    const client = getSupabaseClient();

    if (!client) {
        localStorage.setItem(`chart_${email}_verbal_aggression`, JSON.stringify({ data, updated_at: new Date().toISOString() }));
        return { success: true };
    }

    try {
        const { error } = await client
            .from('user_chart_data')
            .upsert(
                {
                    email,
                    chart_type: 'verbal_aggression',
                    data,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'email' }
            );

        if (error) throw error;
        return { success: true };
    } catch (err) {
        return { success: false, error: String(err) };
    }
};

export const getVerbalAggressionData = async (email: string) => {
    const client = getSupabaseClient();

    if (!client) {
        const stored = localStorage.getItem(`chart_${email}_verbal_aggression`);
        return { data: stored ? JSON.parse(stored).data : null };
    }

    try {
        const { data, error } = await client
            .from('user_chart_data')
            .select('data')
            .eq('email', email)
            .eq('chart_type', 'verbal_aggression')
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return { data: data?.data || null };
    } catch (err) {
        return { data: null, error: String(err) };
    }
};

export const checkUserHasData = async (email: string): Promise<boolean> => {
    const client = getSupabaseClient();

    if (!client) {
        return localStorage.getItem(`chart_${email}_verbal_aggression`) !== null;
    }

    try {
        const { data } = await client
            .from('user_chart_data')
            .select('id')
            .eq('email', email)
            .eq('chart_type', 'verbal_aggression')
            .single();
        return Boolean(data);
    } catch {
        return false;
    }
};
