import React, { useEffect } from "react";
import { useCont } from "../../context/MyContext";

export default function PrivacyPolicy() {

    const {privacyPolicyData, getCMSPagesData} = useCont();

    useEffect(() => {
        if(!privacyPolicyData) getCMSPagesData();
    },[])

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: privacyPolicyData }} />
        </div>
    )
}