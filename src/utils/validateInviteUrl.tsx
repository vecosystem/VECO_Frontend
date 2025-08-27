export const validateInviteUrl = (url?: string | null): boolean => {
  if (!url) return false;
  try {
    const u = new URL(url, window.location.origin);
    const hasInvitePath = u.pathname.includes('/invite');
    const hasToken = new URLSearchParams(u.search).has('token');
    return hasInvitePath && hasToken;
  } catch {
    return false;
  }
};
