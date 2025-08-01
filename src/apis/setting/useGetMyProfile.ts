import { axiosInstance } from '../axios';
import type { MyProfile } from '../../types/setting';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey';

// 설정 - 나의 프로필 조회
const getMyProfile = async (): Promise<MyProfile> => {
  try {
    const response = await axiosInstance.get('/api/workspace/setting/my-profile');
    return response.data.result;
  } catch (error) {
    console.error('나의 프로필 조회 실패', error);
    throw error;
  }
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: [queryKey.MY_PROFILE],
    queryFn: getMyProfile,
  });
};
