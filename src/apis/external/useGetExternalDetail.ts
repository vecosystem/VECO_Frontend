import { axiosInstance } from '../axios.ts';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../constants/queryKey.ts';
import type { ResponseViewExternalDetailDto, ViewExternalDetailDto } from '../../types/external.ts';

/**
 * 외부이슈 상세 조회 함수
 * - 외부이슈 상세페이지 조회 모드에서 사용
 * - pages/external/ExternalDetail.tsx
 * - pages/workspace/WorkspaceExternalDetail.tsx
 */
const getExternalDetail = async (
  teamId: number,
  externalId: number
): Promise<ViewExternalDetailDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseViewExternalDetailDto>(
      `/api/teams/${teamId}/externals/${externalId}`
    );
    if (!data.result) return Promise.reject(data);
    if (data?.isSuccess) {
      console.log('조회 성공:', data.result);
    }
    return data.result;
  } catch (error) {
    console.error('외부이슈 상세 조회 실패', error);
    throw error;
  }
};

export const useGetExternalDetail = (
  teamId: number,
  externalId: number,
  opts?: { enabled?: boolean }
) => {
  const enabled = (opts?.enabled ?? true) && Number.isFinite(externalId) && externalId > 0;

  return useQuery<ViewExternalDetailDto>({
    queryKey: [queryKey.EXTERNAL_DETAIL, externalId],
    queryFn: () => getExternalDetail(teamId, externalId),
    enabled, // ← create 경로 등에서 NaN/0이면 쿼리 미실행
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false; // 404면 재시도 안함
      return failureCount < 2;
    },
  });
};
