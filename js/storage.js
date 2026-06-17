//데이터 저장
function setStorageData(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}

//데이터 가져오기
function getStorageData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

//storage 사용
export function addStorageItem(key, item) {
  // 1. 화면에 사이즈 라디오 버튼이 '있는데' 선택을 안 했을 때만 경고
  const hasSizeOption =
    document.querySelectorAll('input[name="size"]').length > 0;
  if (hasSizeOption && !item.size) {
    alert("Please select a size.");
    return;
  }

  // 2. 화면에 컬러 라디오 버튼이 '있는데' 선택을 안 했을 때만 경고
  const hasColorOption =
    document.querySelectorAll('input[name="color"]').length > 0;
  if (hasColorOption && !item.color) {
    alert("Please select a color.");
    return;
  }

  if (!hasSizeOption) delete item.size;
  if (!hasColorOption) delete item.color;

  const storageData = getStorageData(key);

  const checkItem = storageData.some(
    (data) =>
      data.id === item.id &&
      data.size === item.size &&
      data.color === item.color,
  );

  if (checkItem) {
    alert("This item is already in your cart.");
    return;
  }

  storageData.push(item);

  setStorageData(key, storageData);
}
