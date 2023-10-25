const APIPath = "https://localhost:7195/api";
export function APIPathURL(path, params) {
  return APIPath + "/" + path;
}
