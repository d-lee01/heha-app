export interface AuthUser {
  id: string
  email: string
  extId?: string
}

export interface AuthCookie {
  name: string
  value: string
  path?: string
  expires?: string
  httpOnly?: boolean
  secure?: boolean
}

export interface SignInResult {
  success: boolean
  cookies: AuthCookie[]
  user?: AuthUser
  redirectUrl?: string
}

export interface SessionData {
  userId?: string
  email?: string
  userHash?: string
  isAuthenticated: boolean
}

export interface OtpRequestResult {
  smsError?: string
  emailError?: string
  smsSentToContactNumberEnding?: string
}

export interface OtpVerifyResult {
  success: boolean
  firebaseToken?: string
}
