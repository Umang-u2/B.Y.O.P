import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadPanel() {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setStatus('Uploading...');

        try {
            // POST to /api/upload
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus(`${file.name} uploaded successfully!`);
        } catch (err) {
            console.error(err);
            setStatus('Error uploading file. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="relative group w-full aspect-[3/4] border-2 border-dashed border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-800/20 hover:border-violet-500/50 transition-all duration-300 cursor-pointer overflow-hidden">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                    disabled={loading}
                />

                {/* Visual Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-violet-500/50 transition-all duration-300 shadow-xl">
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8 text-slate-400 group-hover:text-violet-400 transition-colors" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-lg text-white group-hover:text-violet-200 transition-colors font-space-grotesk">
                            {loading ? 'Processing...' : 'Drop your PDF here'}
                        </p>
                        <p className="text-sm text-slate-400 font-outfit">
                            or click to browse
                        </p>
                    </div>
                </div>
            </div>

            {status && (
                <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 ${status.includes('Error')
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-green-500/10 border-green-500/20 text-green-400'
                    }`}>
                    {status.includes('Error') ? (
                        <AlertCircle className="w-5 h-5 shrink-0" />
                    ) : (
                        <CheckCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span>{status}</span>
                </div>
            )}
        </div>
    );
}
