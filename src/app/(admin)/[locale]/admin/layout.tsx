import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="admin-container">
                    {children}
                </div>
            </body>
        </html>
    );
}
