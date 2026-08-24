# 부스 소개 영상 QR 페이지

`index.html`을 공개 웹주소에 배포한 뒤 그 주소를 QR 코드로 만들면 됩니다.

공개 주소: `https://wjddn144-ctrl.github.io/booth-video-qr/`

## 구성

- `index.html`: 방문자가 QR로 여는 영상 페이지
- `style.css`: 모바일·데스크톱 화면 스타일
- `media/booth-intro.mp4`: 웹용 부스 소개 영상
- `media/booth-poster.jpg`: 영상 재생 전 대표 이미지
- `media/social-preview.png`: 링크 공유용 대표 이미지
- `qr/booth-video-qr.png`: 인쇄·화면 표시용 고해상도 QR
- `qr/booth-video-qr.svg`: 확대 인쇄용 벡터 QR
- `tests/site-content.test.mjs`: 필수 콘텐츠와 모바일 영상 속성 검사

## 로컬 확인

파일을 직접 열거나 간단한 정적 웹서버로 폴더를 열어 확인합니다. 행사 QR에는 로컬 파일 주소나 `localhost`를 사용하지 말고, 반드시 공개 배포 주소를 사용해야 합니다.
