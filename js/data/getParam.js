//상세페이지 데이터 연결
export function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}
