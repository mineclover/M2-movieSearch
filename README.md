# 작업 순서

## 10/26

- API 데이터 확인
- 메인 컨텐츠 UI 구성
- 환경 설정
- 번들러 설치

## 10/27

- api 키 분리해보기

## 11/03

- 구획 나누기 , header(SearchBar.js) , main(movieSearch.js) > ~ ~
- CSS 작업
- 디자인 컨셉 , CSS 로 레이아웃 조작 되게 하는 것을 목표로 삼음
- 간단하게 모양 잡음

## 11/04

- 사진 없는 데이터에 대한 예외처리 ( ex : Fazoni i Fore 2 )
- api 테스트는 mi
- 있어야하는데 비어있는 Json data = "N/A"
- 검색이 안됬을 경우 `Error : "Too many results."` , `Response` 값은 항상 들어온다

## 11/06

- 영상이 어떤 tpye인지 표시 movie, series, episode > 작업중
- 영상 선택 구현

# 세팅정보

## 처음 깔 때

`npm i`
sass 는 글로벌로 설치

## 세팅 사용

`sass --watch scss/style.scss css/style.css`
로컬 서버 : `npm run dev`
번들링 파일 빌드 : `npm run build`

## 간단 설명

- movieSerch > test
