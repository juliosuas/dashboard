import { http, HttpResponse } from "msw";
export const handlers = [
  http.get("https://api.github.com/user/repos", () =>
    HttpResponse.json([]),
  ),
];
