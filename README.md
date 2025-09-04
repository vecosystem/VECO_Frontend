# 🐯 VECO

VECO는 **AI를 활용해 분산된 정보를 한곳에 모으고, 목표를 명확히 추적하며 협업을 효율화하는 시스템**입니다.  
이 저장소는 VECO의 **프론트엔드 개발을 담당하는 레포지토리**입니다.
<br />
<br />
<img width="3284" height="1975" alt="image" src="https://github.com/user-attachments/assets/5e51ab8c-de57-4a81-8b10-fd7d96b7e7f1" />

---

## 📦 기술 스택

| 역할                 | 종류                                                                                                                                                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                       |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                    |
| Styling              | <img src="https://img.shields.io/badge/-Tailwind%20CSS-%231a202c?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS Badge" />                                                                                                                       |
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) <img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=TanStack-Query&logoColor=white" alt="TanStack Query Badge" /> |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)                                        |
| Package Manager      | ![Npm](https://img.shields.io/badge/npm%20-grey?style=for-the-badge&logo=npm)                                                                                                                                                                            |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                         |
| State Management     | <img src="https://img.shields.io/badge/Zustand-2D3748?style=for-the-badge&logo=Zustand&logoColor=white" alt="Zustand Badge" />                                                                                                                           |
| Deploy               | <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white" alt="Vercel Badge" />                                                                                                                              |

---

## 🚀 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

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

---

## 📏 컨벤션

- 🌿 [Commit Convention](https://pretty-tumbleweed-40b.notion.site/Github-Commit-Convention-2212d37cca1180f882f6c607935e07bb?source=copy_link)
- 🪵 [Branch Convention](https://pretty-tumbleweed-40b.notion.site/Github-Branch-Convention-2212d37cca1180b99416cae996470a9d?source=copy_link)
- 📌 [Issue Convention](https://pretty-tumbleweed-40b.notion.site/ISSUE-2212d37cca1180b5b904fc4ea5653f54?source=copy_link)
- ✅ [PR Convention](https://pretty-tumbleweed-40b.notion.site/PR-2212d37cca1180608135d6bccffeaed6?source=copy_link)

---

## 📖 아티클 모음

| 이름      | 아티클 제목                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🍀 김선화 | [데모데이 트러블슈팅](https://velog.io/@sunhwaa/UMC-01)                                                                                                                                                                   |
| 🍒 박유민 | [Onboarding & 토큰 이슈 해결기](https://velog.io/@waldls/series/veco)                                                                                                                                                     |
| 💎 박진주 | [DOM 업데이트와 댓글 스크롤 타이밍 문제 해결기](https://icems0428.tistory.com/25)                                                                                                                                         |
| 🎀 염주원 | [개발 중 발생한 HTTP 에러 핸들링 개선 과정](https://velog.io/@hijuwon/%EA%B0%9C%EB%B0%9C-%EC%A4%91-%EB%B0%9C%EC%83%9D%ED%95%9C-http-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81-%EA%B0%9C%EC%84%A0-%EA%B3%BC%EC%A0%95) |
| 🍁 이가을 | [다른 도메인 간 쿠키 이슈 해결기](https://velog.io/@gaeulzzang/다른-도메인-간-쿠키-이슈-해결기)                                                                                                                           |

---

## 🗂️ 기타

🔗 [Project Kanban Board](https://github.com/orgs/vecosystem/projects/9/views/6)

<br>
<br>
