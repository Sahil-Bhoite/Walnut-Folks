import React, { useState, useEffect } from 'react';
import { Header, Hero, Footer } from './components/Layout';
import CallDurationChart from './components/Charts/CallDurationChart';
import SadPathChart from './components/Charts/SadPathChart';
import VerbalAggressionChart from './components/Charts/VerbalAggressionChart';
import CallerIdChart from './components/Charts/CallerIdChart';
import LanguageSupportChart from './components/Charts/LanguageSupportChart';
import EmailModal from './components/EmailModal';
import EditDataModal from './components/EditDataModal';
import OverwriteModal from './components/OverwriteModal';
import { defaultVerbalAggressionData, VerbalAggressionData } from './data/mockData';
import { saveVerbalAggressionData, getVerbalAggressionData, checkUserHasData } from './lib/supabase';

function App() {
    // State
    const [vaData, setVaData] = useState<VerbalAggressionData[]>(defaultVerbalAggressionData);
    const [email, setEmail] = useState<string | null>(null);

    // Modals
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showOverwriteModal, setShowOverwriteModal] = useState(false);

    // Data for overwrite flow
    const [tempEditedData, setTempEditedData] = useState<VerbalAggressionData[] | null>(null);
    const [existingData, setExistingData] = useState<VerbalAggressionData[] | null>(null);

    // Load email from local storage
    useEffect(() => {
        const storedEmail = localStorage.getItem('user_email');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    // Load user data if email exists
    useEffect(() => {
        if (email) {
            loadUserData(email);
        }
    }, [email]);

    const loadUserData = async (userEmail: string) => {
        const { data } = await getVerbalAggressionData(userEmail);
        if (data && Array.isArray(data)) {
            setVaData(data);
        }
    };

    const handleEditClick = () => {
        if (!email) {
            setShowEmailModal(true);
        } else {
            setShowEditModal(true);
        }
    };

    const handleEmailSubmit = async (submittedEmail: string) => {
        setEmail(submittedEmail);
        localStorage.setItem('user_email', submittedEmail);
        setShowEmailModal(false);

        // Check if user has data to load or warn about
        const hasData = await checkUserHasData(submittedEmail);
        if (hasData) {
            await loadUserData(submittedEmail);
        }

        // Open edit modal directly after email
        setShowEditModal(true);
    };

    const handleEditSave = async (newData: VerbalAggressionData[]) => {
        if (!email) return;

        // Check for existing data to trigger overwrite warning
        const hasData = await checkUserHasData(email);

        if (hasData) {
            const { data } = await getVerbalAggressionData(email);
            setExistingData(data);
            setTempEditedData(newData);
            setShowEditModal(false);
            setShowOverwriteModal(true);
        } else {
            // No existing data, save directly
            await saveAndApply(newData);
        }
    };

    const handleOverwriteConfirm = async () => {
        if (tempEditedData) {
            await saveAndApply(tempEditedData);
        }
    };

    const saveAndApply = async (data: VerbalAggressionData[]) => {
        if (!email) return;

        const result = await saveVerbalAggressionData(email, data);
        if (result.success) {
            setVaData(data);
        } else {
            console.error('Failed to save data', result.error);
            alert('Failed to save data. Please check console.');
        }

        setShowEditModal(false);
        setShowOverwriteModal(false);
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white pb-20 font-sans">
            <Header />
            <Hero />

            {/* Increased top spacing to split Hero from Dashboard */}
            <main id="analytics" className="container mx-auto px-6 relative z-20">
                {/* Added Section Title */}
                <div className="mb-10 text-center md:text-left border-t border-white/5 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Performance Analytics</h2>
                    <p className="text-text-muted">Real-time metrics from your production environment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* 1. Call Duration */}
                    <div className="lg:col-span-2 h-[420px]">
                        <CallDurationChart />
                    </div>

                    {/* 2. Sad Path Analysis */}
                    <div className="lg:col-span-1 h-[420px]">
                        <SadPathChart />
                    </div>

                    {/* 3. Verbal Aggression (Editable) */}
                    <div className="lg:col-span-1 h-[420px]">
                        <VerbalAggressionChart
                            data={vaData}
                            onEdit={handleEditClick}
                        />
                    </div>

                    {/* 4. Caller ID Issues */}
                    <div className="lg:col-span-1 h-[420px]">
                        <CallerIdChart />
                    </div>

                    {/* 5. Language Support */}
                    <div className="lg:col-span-1 h-[420px]">
                        <LanguageSupportChart />
                    </div>

                </div>
            </main>

            <Footer />

            {/* Modals */}
            <EmailModal
                isOpen={showEmailModal}
                onClose={() => setShowEmailModal(false)}
                onSubmit={handleEmailSubmit}
            />

            <EditDataModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                data={vaData}
                onSave={handleEditSave}
            />

            <OverwriteModal
                isOpen={showOverwriteModal}
                onClose={() => setShowOverwriteModal(false)}
                onConfirm={handleOverwriteConfirm}
                oldData={existingData || []}
                newData={tempEditedData || []}
            />
        </div>
    );
}

export default App;
