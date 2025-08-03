import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-pink-400 text-white py-6">
            <div className="container mx-auto px-4">
                    <div className="mb-4 md:mb-0">
                        <h5 className="text-lg font-bold">Itiza Limited</h5>
                        <p className="text-sm">@Superteam.NG</p>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm">&copy; 2024 Company Name. All rights reserved.</p>
                    </div>
            </div>
</footer>

    );
};
export default Footer;