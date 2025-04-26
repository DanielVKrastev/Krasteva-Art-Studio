import { useEffect, useState } from "react";
import paintingApi from "../../../../../api/paintingApi";

export default function PaintingTableData({
    paintingId
}) {
        const [painting, setPainting] = useState({});
       
        useEffect(() => {
            const fetchInitial = async () => {
                try {
                    const paintingData = await paintingApi.getOne(paintingId);
                    setPainting(paintingData);
                } catch (err) {
                    console.log(err.message);
                }
            };
            fetchInitial();
        }, []);
    return (
        <>
            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                {painting.name}
            </td>
            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                <img src={painting.imageUrl} alt={painting.name} className="w-20" />
            </td>
        </>
    );
}