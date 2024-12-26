import { useEffect, useState } from 'react';

const useFetchData = (fetchDataFunctions: (() => Promise<any>) | (() => Promise<any>)[]) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await Promise.all(
                    (Array.isArray(fetchDataFunctions) ? fetchDataFunctions : [fetchDataFunctions]).map(fn => fn())
                );
                setData(results.flat());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchDataFunctions]);

    return { data, loading };
};

export default useFetchData;