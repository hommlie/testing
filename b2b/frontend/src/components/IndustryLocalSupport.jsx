import React, { useEffect, useState } from 'react';
import './IndustryLocalSupport.css';

const IndustryLocalSupport = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/industry-local-support')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error loading industry support data:', err));
  }, []);

  if (!data) return null;

  return (
    
    <div className="industry-local-support">
      <h2>{data.title}</h2>
      <div className='sakib'>
        <div className="support-content">
          {data.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryLocalSupport;
