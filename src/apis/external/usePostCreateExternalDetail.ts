import { axiosInstance } from '../axios.ts';
import { useMutation } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey.ts';
import { queryKey } from '../../constants/queryKey.ts';
import queryClient from '../../utils/queryClient.ts';
import type {
  CreateExternalDetailDto,
  CreateExternalResultDto,
  ResponseCreateExternalDetatilDto,
} from '../../types/external.ts';

/**
 * 외부이슈 작성 함수
 * - 외부이슈 상세페이지 생성 모드에서 사용
 * - pages/external/ExternalDetail.tsx
 * - pages/workspace/WorkspaceExternalDetail.tsx
 */
const createExternal = async (
  teamId: number,
  payload: CreateExternalDetailDto
): Promise<CreateExternalResultDto> => {
  try {
    const response = await axiosInstance.post<ResponseCreateExternalDetatilDto>(
      `/api/teams/${teamId}/externals`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error: any) {
    console.error('외부이슈 작성 실패:', error);
    console.log('👉 RESPONSE STATUS:', error?.response?.status);
    console.log('👉 RESPONSE DATA:', error?.response?.data);
    throw error;
  }
};

export const useCreateExternal = (teamId: number) => {
  return useMutation<CreateExternalResultDto, Error, CreateExternalDetailDto>({
    mutationKey: [mutationKey.EXTERNAL_CREATE, teamId],
    mutationFn: (payload) => createExternal(teamId, payload),
    onSuccess: () => {
      // 외부이슈 작성하여 POST 후 조회되는 데이터 최신화
      queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_LIST, teamId] });
      queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_NAME, teamId] });
    },
  });
};
