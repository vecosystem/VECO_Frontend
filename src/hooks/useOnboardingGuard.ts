// src/hooks/useOnboardingGuard.ts

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import onboardingSteps from '../constants/onboardingSteps';
import { create } from 'zustand'; // ustand로 온보딩 진행 상태 관리

interface StepState {
  currentStep: number; // 사용자가 현재까지 도달한 최대 단계 (0 ~ 3)
  setStep: (step: number) => void; // 현재 페이지 진입 시 호출하여 최신 단계로 업데이트
}

export const useOnboardingStep = create<StepState>((set) => ({
  currentStep: 0,
  setStep: (step) => set({ currentStep: step }),
}));

/* 
    useOnboardingGuard
   - 각 페이지에서 호출하여 사용자의 직접 접근을 제어하는 훅
   - stepIndex: 현재 페이지의 단계 번호 (0 ~ 3)
   - 원칙: 이전 또는 현재 단계는 접근 허용, 이후 단계는 차단
*/
export const useOnboardingGuard = (stepIndex: number) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentStep, setStep } = useOnboardingStep();

  useEffect(() => {
    // URL 끝에 /가 붙은 경우 제거하여 일관된 비교
    const normalizedPath = pathname.replace(/\/$/, '');

    // 현재 페이지 경로가 온보딩 단계 배열에서 몇 번째인지 계산
    const requestedStep = onboardingSteps.indexOf(normalizedPath);

    // 사용자가 허용된 최대 단계(currentStep)보다 뒤 단계로 직접 접근 시
    if (requestedStep > currentStep) {
      // 현재 허용된 단계로 리다이렉트
      navigate(onboardingSteps[currentStep], { replace: true });
    } else {
      // 정상 접근이면 단계 업데이트
      setStep(stepIndex);
    }
  }, [pathname, currentStep, stepIndex, navigate, setStep]);
};
