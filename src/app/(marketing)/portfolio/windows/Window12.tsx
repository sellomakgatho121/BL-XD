"use client";

import { Activity, BarChart3, Cloud, Settings, Users } from "lucide-react";

export default function Window12() {
    return (
        <div className="w-full h-full bg-[#f5f5f5] text-[#222] p-4 md:p-8 overflow-y-auto">

            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">System Dashboard</h2>
                    <p className="text-sm opacity-60">Bento Grid Architecture</p>
                </div>
                <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Export Data
                </button>
            </div>

            {/* The Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[140px]">

                {/* Large Main Feature */}
                <div className="col-span-1 md:col-span-2 row-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
                    <div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Activity size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Performance Metrics</h3>
                        <p className="text-gray-500 text-sm">Real-time macro animations within distinct CSS constraints.</p>
                    </div>
                    <div className="h-24 bg-gray-50 rounded-xl overflow-hidden relative flex items-end">
                        {/* Fake bar chart */}
                        <div className="w-full h-full flex items-end justify-between px-2 gap-2">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="flex-1 bg-blue-500 rounded-t-sm transition-all duration-1000 group-hover:bg-blue-600" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Small Stats */}
                <div className="col-span-1 row-span-1 bg-[#1a1a1a] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform">
                    <Users className="text-gray-400" />
                    <div>
                        <div className="text-3xl font-black">2.4k</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">Active Users</div>
                    </div>
                </div>

                <div className="col-span-1 row-span-1 bg-lime-400 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform text-lime-950">
                    <Cloud className="text-lime-700" />
                    <div>
                        <div className="text-3xl font-black">99.9%</div>
                        <div className="text-xs text-lime-800 uppercase tracking-widest mt-1">Uptime SLA</div>
                    </div>
                </div>

                {/* Medium Info Card */}
                <div className="col-span-1 md:col-span-2 row-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Settings size={32} className="animate-[spin_4s_linear_infinite]" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Modular Structure</h3>
                        <p className="text-gray-500 text-sm mt-1">Content lives in distinct rounded containers, prioritizing scannability.</p>
                    </div>
                </div>

                {/* Map / Image Placeholder */}
                <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white flex flex-col justify-between shadow-sm hover:opacity-90 transition-opacity">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl max-w-[150px]">Global Distribution</h3>
                        <BarChart3 opacity={0.5} />
                    </div>
                    <div className="text-sm font-medium bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                        Nodes Online: 42
                    </div>
                </div>

                {/* Text Snippet */}
                <div className="col-span-1 md:col-span-2 row-span-1 bg-orange-100 rounded-3xl p-6 flex flex-col justify-center text-orange-900 border border-orange-200">
                    <p className="font-serif italic text-lg leading-tight">
                        "A dashboard layout where varying types of content coexist perfectly without overwhelming the eye."
                    </p>
                </div>

            </div>
        </div>
    );
}
