// Lightweight API client for the Kopa We backend.
// Uses fetch + a configurable base URL. Falls back to mock data for offline demos.

export const API_BASE_URL =
  (import.meta.env.VITE_KOPA_API_URL as string | undefined) ?? "/api";

export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message);
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => "");
    }
    throw new ApiError(res.status, `Request failed: ${res.status}`, body);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ---------------- Domain types ----------------

export interface Member {
  _id?: string;
  callUpNumber: string;
  stateCode: string;
  fullName: string;
  state: string;
  lga: string;
  cdsGroup: string;
  isVerified: boolean;
  isAdmin: boolean;
  fraudSignals?: Record<string, unknown>;
  creditScore: number;
}

export interface Wallet {
  memberId: string;
  balance: number;
  savingsBalance: number;
  locked: boolean;
  currency: string;
}

export interface LedgerEntry {
  transactionId: string;
  memberId: string;
  accountType: string;
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt?: string;
}

export interface Loan {
  _id: string;
  memberId: string;
  amount: number;
  purpose: string;
  status: "pending" | "approved" | "disbursed" | "repaid" | "defaulted";
  interest: number;
  repaymentDate: string;
  createdAt: string;
}

// ---------------- Endpoint helpers ----------------

export const identityApi = {
  verify: (callUpNumber: string, stateCode: string) =>
    api.post<Member>("/identity/verify", { callUpNumber, stateCode }),
  profile: (id: string) => api.get<Member>(`/identity/profile/${id}`),
  idCard: (id: string) => api.get<{ qr: string; member: Member }>(`/identity/id-card/${id}`),
};

export const financeApi = {
  wallet: (memberId: string) => api.get<Wallet>(`/finance/wallet/${memberId}`),
  transfer: (memberId: string, body: { recipientCallUp: string; amount: number; note?: string }) =>
    api.post(`/finance/transfer/${memberId}`, body),
  saveToSavings: (memberId: string, amount: number) =>
    api.post(`/finance/savings/${memberId}`, { amount }),
  toggleLock: (memberId: string, locked: boolean) =>
    api.patch(`/finance/lock/${memberId}`, { locked }),
  requestLoan: (memberId: string, body: { amount: number; purpose: string }) =>
    api.post<Loan>(`/finance/loan/request/${memberId}`, body),
  loans: (memberId: string) => api.get<Loan[]>(`/finance/loans/${memberId}`),
  ledger: (memberId: string) => api.get<LedgerEntry[]>(`/finance/ledger/${memberId}`),
};

export const marketplaceApi = {
  list: (sellerId: string, body: unknown) => api.post(`/marketplace/list/${sellerId}`, body),
  search: (params?: Record<string, string>) => {
    const q = params ? `?${new URLSearchParams(params).toString()}` : "";
    return api.get<unknown[]>(`/marketplace${q}`);
  },
  byMember: (memberId: string) => api.get<unknown[]>(`/marketplace/member/${memberId}`),
  detail: (id: string) => api.get(`/marketplace/${id}`),
};

export const accommodationApi = {
  list: (ownerId: string, body: unknown) => api.post(`/accommodation/list/${ownerId}`, body),
  search: () => api.get<unknown[]>("/accommodation"),
  roommates: () => api.get<unknown[]>("/accommodation/roommates"),
};

export const communityApi = {
  feed: (state?: string) => api.get<unknown[]>(`/community/feed${state ? `?state=${state}` : ""}`),
  post: (authorId: string, body: unknown) => api.post(`/community/post/${authorId}`, body),
  comment: (postId: string, authorId: string, body: { text: string }) =>
    api.post(`/community/comment/${postId}/${authorId}`, body),
  comments: (postId: string) => api.get<unknown[]>(`/community/comments/${postId}`),
  upvote: (postId: string, memberId: string) =>
    api.patch(`/community/upvote/${postId}/${memberId}`),
};

export const adminApi = {
  announce: (body: { title: string; body: string; targetState?: string }) =>
    api.post("/admin/announcements", body),
  announcements: () => api.get<unknown[]>("/admin/announcements"),
  stats: () => api.get<Record<string, number>>("/admin/stats"),
  engagement: () => api.get<Record<string, number>>("/admin/engagement"),
};
