import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function useActiveSection() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('');
    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const sectionPage = pathParts[1];

        setActiveSection(sectionPage);
        
    }, [location])

    return [
        activeSection
    ];
}