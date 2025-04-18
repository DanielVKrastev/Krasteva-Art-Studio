import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function useActiveSection() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('');
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const sectionPage = pathParts[1];

        setActiveTab(sectionPage);
        
    }, [location])

    return [
        activeTab
    ];
}