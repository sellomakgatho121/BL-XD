"use client";

export default function Window4() {
    const items = Array.from({ length: 30 }, (_, i) => `Transaction Item No. ${i * 471}`);

    return (
        <div className="w-full h-full bg-[var(--neo-pink)] p-2 sm:p-8 flex items-start justify-center overflow-auto relative">
            <div className="absolute top-4 left-4 bg-[var(--neo-black)] text-[var(--neo-white)] p-2 font-bold mb-8 z-10 max-w-xs shadow-[4px_4px_0px_var(--neo-white)]">
                WARNING: ANTI-DESIGN PROTOCOL. SCROLL TO UNWIND RECEIPT.
            </div>

            {/* The Receipt */}
            <div className="w-[300px] sm:w-[400px] bg-[var(--neo-white)] text-[var(--neo-black)] font-mono p-6 pb-32 mb-32 shadow-[0_20px_0px_var(--neo-black)] mt-24">
                <div className="text-center border-b-2 border-dashed border-[var(--neo-black)] pb-4 mb-4">
                    <h2 className="text-3xl font-black mb-2">BLACKLIGHT</h2>
                    <p className="text-sm">RECEIPT OF DIGITAL GOODS</p>
                    <p className="text-xs mt-2">DATE: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm hover:line-through cursor-crosshair">
                            <span>{item}</span>
                            <span>R{((idx + 1) * 9.99).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t-2 border-dashed border-[var(--neo-black)] pt-4 mt-8">
                    <div className="flex justify-between font-black text-xl">
                        <span>TOTAL</span>
                        <span>PRICELESS</span>
                    </div>
                    <div className="text-center mt-8 text-xs">
                        <p>THANK YOU FOR DEFYING CONVENTION</p>
                        <p className="mt-2 text-[8px] break-all">
                            AIBD723B8V2B8B19V812B71VB12VB712V
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
