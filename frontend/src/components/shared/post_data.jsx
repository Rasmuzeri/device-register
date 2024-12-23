import { useState } from 'react';
import { config } from '../../utils/config';

const usePostData = (endpoint, actionErrorString) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `${config.BACKEND_ADDR}/${endpoint}`;

  const postData = async (data) => {
    setLoading(true);
    setError(null);

    const access_token = localStorage.getItem("access_token"); // eslint-disable-line no-undef

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(access_token && { 'Authorization': `Bearer ${access_token}` }),
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setResult(result);
      } else {
        const errorMsg = `${actionErrorString} failed: ${response.status} ${response.statusText}`;
        setError(errorMsg);
        if(actionErrorString) {
          alert(errorMsg); 
        }
      }
    } catch (err) {
      const errorMsg = `${actionErrorString} failed: ${err.message}`;
      setError(errorMsg);
      if(actionErrorString) {
        alert(errorMsg); 
      } 
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, postData };
};

export default usePostData;
