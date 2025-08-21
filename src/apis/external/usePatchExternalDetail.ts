import { axiosInstance } from '../axios.ts';
import { useMutation } from '@tanstack/react-query';
import { mutationKey } from '../../constants/mutationKey.ts';
import { queryKey } from '../../constants/queryKey.ts';
import queryClient from '../../utils/queryClient.ts';
import type {
  ResponseUpdateExternalDetailDto,
  UpdateExternalDetailDto,
  UpdateExternalResultDto,
} from '../../types/external.ts';

/**
 * 외부이슈 수정 (PATCH) 함수
 * - 동일 teamId / 동일 externalId 대상의 상세 내용 반영
 * - pages/external/ExternalDetail.tsx
 * - pages/workspace/WorkspaceExternalDetail.tsx
 */
const updateExternal = async (
  teamId: number,
  externalId: number,
  payload: UpdateExternalDetailDto
): Promise<UpdateExternalResultDto> => {
  try {
    const response = await axiosInstance.patch<ResponseUpdateExternalDetailDto>(
      `/api/teams/${teamId}/externals/${externalId}`,
      payload
    );

    if (!response.data.result) return Promise.reject(response);
    return response.data.result;
  } catch (error: any) {
    console.error('외부이슈 수정 실패:', error);
    console.log('👉 RESPONSE STATUS:', error?.response?.status);
    console.log('👉 RESPONSE DATA:', error?.response?.data);
    throw error;
  }
};

export const useUpdateExternal = (teamId: number, externalId: number) => {
  return useMutation<UpdateExternalResultDto, Error, UpdateExternalDetailDto>({
    mutationKey: [mutationKey.EXTERNAL_UPDATE, teamId, externalId],
    mutationFn: (payload) => updateExternal(teamId, externalId, payload),
    onSuccess: () => {
      // 상세/목록/관련 파생 쿼리 최신화
      queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_LIST, teamId] });
      queryClient.invalidateQueries({ queryKey: [queryKey.EXTERNAL_NAME, teamId] });
    },
  });
};
