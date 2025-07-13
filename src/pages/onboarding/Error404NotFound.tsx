// src/pages/onboarding/Error404NotFound.tsx

const Error404NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      <div className="h-[42rem] flex flex-col justify-end">
        <div className="flex flex-col items-center gap-[10.8rem]">
          {/* 에러 문구 */}
          <div className="flex flex-col gap-[3.2rem] text-center">
            <h2 className="font-bigtitle-b text-gray-600">404</h2>
            <h3 className="font-title-sub-r text-gray-600">
              찾을 수 없는 페이지입니다.
              <br /> 요청하신 페이지가 사라졌거나, 잘못된 경로로 이용하셨어요!
            </h3>
          </div>
          {/* 돌아가기 버튼 */}
          <button className="w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-primary-blue">
            <span className="font-title-sub-r text-gray-100">돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404NotFound;
