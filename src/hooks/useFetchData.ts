import { useEffect, useState } from 'react';

const useFetchData = (fetchDataFunction: () => Promise<any[]>) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataFunction();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchDataFunction]);

    return { data, loading };
};

export default useFetchData;