export interface DashboardUserInfo {
  email: string;
  fullName: string;
}

export function getDashboardUserInfo(): DashboardUserInfo {
  return {
    email: localStorage.getItem("userEmail") || "Not provided",
    fullName: localStorage.getItem("userFullName") || "User",
  };
}

export function clearDashboardUserInfo() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userFullName");
}

export function hasAccessToken() {
  return Boolean(localStorage.getItem("accessToken"));
}