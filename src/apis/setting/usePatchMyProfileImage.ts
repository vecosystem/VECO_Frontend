import { axiosInstance } from '../axios';
import type { MyProfileImageResponse } from '../../types/setting';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

// 설정 - 나의 프로필 이미지 변경
const patchMyProfileImage = async (formData: FormData): Promise<MyProfileImageResponse> => {
  try {
    const response = await axiosInstance.patch(
      '/api/workspace/setting/my-profile/profileImage',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('나의 프로필 이미지 변경 실패', error);
    throw error;
  }
};

export const usePatchMyProfileImage = () => {
  return useMutation({
    mutationFn: patchMyProfileImage,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKey.MY_PROFILE],
      });
    },
  });
};
