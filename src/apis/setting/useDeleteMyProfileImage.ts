import type { CommonResponse } from '../../types/common';
import { axiosInstance } from '../axios';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';
import { queryKey } from '../../constants/queryKey';

// 설정 - 나의 프로필 이미지 삭제
const deleteMyProfileImage = async (): Promise<CommonResponse<{}>> => {
  try {
    const response = await axiosInstance.delete('/api/workspace/setting/my-profile/profileImage');
    return response.data;
  } catch (error) {
    console.error('나의 프로필 이미지 삭제 실패', error);
    throw error;
  }
};

export const useDeleteMyProfileImage = () => {
  return useMutation({
    mutationFn: deleteMyProfileImage,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [queryKey.MY_PROFILE],
      });
    },
  });
};
