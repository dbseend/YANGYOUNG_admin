// 날짜 형식 서버에서 받을 수 있는 형태로 변환
export const formatDate = (date) => {
  let formattedDate = new Date(date);
  let year = formattedDate.getFullYear();
  let month = ("0" + (formattedDate.getMonth() + 1)).slice(-2);
  let day = ("0" + formattedDate.getDate()).slice(-2);
  let hours = ("0" + formattedDate.getHours()).slice(-2);
  let minutes = ("0" + formattedDate.getMinutes()).slice(-2);
  let seconds = ("0" + formattedDate.getSeconds()).slice(-2);
  let milliseconds = ("00" + formattedDate.getMilliseconds()).slice(-3);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

// 학년 문자열을 서버에서 받을 수 있는 형태로 변환
export const gradeTypeConvert = (grade) => {
  switch (grade) {
    case "중3":
      return "M3";
    case "고1":
      return "H1";
    case "고2":
      return "H2";
    case "고3":
      return "H3";
    default:
      return "M3";
  }
}
