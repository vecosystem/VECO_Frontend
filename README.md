# VECO Frontend

VECO는 **AI를 활용해 분산된 정보를 한곳에 모으고, 목표를 명확히 추적하며 협업을 효율화하는 시스템**입니다.  
이 저장소는 VECO의 **프론트엔드 개발을 담당하는 레포지토리**입니다.

---

## 📦 기술 스택

| 역할                 | 종류                                                                                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                   |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                |
| Styling              |  <img src="https://img.shields.io/badge/-Tailwind%20CSS-%231a202c?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS Badge" />|
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=TanStack-Query&logoColor=white" alt="TanStack Query Badge" /> |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)    |
| Package Manager      | ![Npm](https://img.shields.io/badge/npm%20-grey?style=for-the-badge&logo=npm)                                                                                                                      |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)     |
| State Management     | <img src="https://img.shields.io/badge/Zustand-2D3748?style=for-the-badge&logo=Zustand&logoColor=white" alt="Zustand Badge" />  |
| Deploy               | <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white" alt="Vercel Badge" /> |

---

## 🚀 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 🔧 작업 전 공통 절차: develop 브랜치 최신화

```bash
# 1. develop 브랜치로 이동
git checkout develop

# 2. 원격 저장소에서 최신 코드 가져오기
git pull origin develop
```

## 🛠 브랜치 생성

```bash
# develop 최신화 후 작업 브랜치 생성
git checkout -b feature/#이슈번호-스크린ID-작업명
```

## 🚀 PR 전 점검 및 병합

```bash
# develop 최신화 (생략 가능하지만 권장)
git checkout develop
git pull origin develop

# 작업 브랜치로 이동
git checkout feature/#...

# 최신 develop을 작업 브랜치에 병합
git merge develop

# 충돌 해결 후 커밋
```

## 📖 아티클 모음

🍀 김선화: [제목]() <br/>
🍒 박유민: [제목]() <br/>
💎 박진주: [제목]() <br/>
🎀 염주원: [제목]() <br/>
🍁 이가을: [다른 도메인 간 쿠키 이슈 해결기](https://velog.io/@gaeulzzang/다른-도메인-간-쿠키-이슈-해결기) <br/>

<br/>
<br/>

