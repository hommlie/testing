import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";

export default function AboutUs() {

    const {getCMSPagesData, aboutData} = useCont();

    useEffect(() => {
        if(!aboutData) getCMSPagesData();
    },[])

    return (
        <div>
            {aboutData}
        </div>
    )
}