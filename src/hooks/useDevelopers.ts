// hooks/useDevelopers.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import api from '@/lib/api';

interface Developer {
    _id: string;
    fullName: string;
    country: string;
    bio?: string;
    programmingLanguages?: string[];
    languages?: string[];
    profileImage?: string;
    followers?: string[];
    following?: string[];

}

interface DevelopersResponse {
    data: Developer[];
    total: number;
    limit: number;
    skip: number;
}

export const useDevelopers = (
    searchTerm: string,
    selectedCountry: string,
    selectedSkill: string,
    page: number,
    limit: number
) => {
    const queryKey = ['developers', searchTerm, selectedCountry, selectedSkill, page];

    const queryFn = async () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCountry) params.append('country', selectedCountry);
        if (selectedSkill) params.append('skill', selectedSkill);
        params.append('limit', limit.toString());
        params.append('skip', ((page - 1) * limit).toString());

        const response = await api.get(`/developers?${params.toString()}`);
        return response.data;
    };

    // Type-safe query options
    const options: UseQueryOptions<DevelopersResponse, Error> = {
        queryKey,
        queryFn,
        // For older versions, use these alternatives instead of keepPreviousData
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    };

    return useQuery<DevelopersResponse, Error>(options);
};