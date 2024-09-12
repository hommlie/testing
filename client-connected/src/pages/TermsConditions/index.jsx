import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";

export default function TermsConditions() {

    const {termsConditionsData, getCMSPagesData} = useCont();

    useEffect(() => {
        if(!termsConditionsData) getCMSPagesData();
    },[])

    return (
        <div>
            {termsConditionsData}
        </div>
    )
}