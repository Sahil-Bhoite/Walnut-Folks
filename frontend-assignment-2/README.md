# Voice Analytics Dashboard

A React + TypeScript dashboard built for the WFG Frontend Assessment.

## Overview
This application visualizes voice agent analytics using a custom dark theme ("SuperBryn" aesthetic). It includes 5 core charts described in the requirements and allows users to edit "Verbal Aggression" data with email verification.

## Tech Stack
*   **React 18** + **Vite**
*   **TypeScript**
*   **Tailwind CSS** (Custom config for colors/fonts)
*   **Recharts** for visualizations
*   **Supabase** (Optional) for data persistence

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start local server:**
    ```bash
    npm run dev
    ```
    App runs at `http://localhost:5173`.

## Configuration (Optional)
By default, the app uses `localStorage` to save your edits. To sync with a database:

1.  Create `.env`:
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_key
    ```
2.  Run this SQL in Supabase:
    ```sql
    create table user_chart_data (
      id uuid default gen_random_uuid() primary key,
      email text not null,
      chart_type text not null,
      data jsonb not null,
      created_at timestamp with time zone default now(),
      updated_at timestamp with time zone default now(),
      unique(email, chart_type)
    );
    alter table user_chart_data enable row level security;
    create policy "Enable read/write for all" on user_chart_data for all using (true) with check (true);
    ```

## Features Implemented
*   **Call Duration Chart** (Area)
*   **Sad Path Analysis** (Vertical Bar)
*   **Verbal Aggression** (Editable Donut Chart)
*   **Caller ID Issues** (Horizontal Bar)
*   **Language Support** (Bar)
*   **Edit Flow:** Users can click "Edit Data" on the Verbal Aggression card to update values. Requires email input. logic handles overwrites safely.
