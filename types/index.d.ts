import { VNodeData, VNodeChildrenArrayContents, VNode } from 'vue'
import { ScopedSlot } from 'vue/types/vnode'
import { ChangePasswordForm } from '~/server-middleware/routes/user/change-password'
import { DeleteAccountForm } from '~/server-middleware/routes/user/delete-account'
import { OnboardForm } from '~/server-middleware/routes/user/onboard'
import { MessageObject, UserData } from '~/server-middleware/types'

import { LoginPayload, UserInfo } from '~/store/user'

export type UserWorkRole =
  | 'UX Researcher'
  | 'UX Designer'
  | 'Product Designer'
  | 'Product Manager'
  | 'Business Manager'
  | 'Scrum Master'
  | 'Marketer'
  | 'Software Engineer'
  | 'Success Manager'
  | 'Support'
  | 'Teacher'
  | 'Students'
  | 'Others'

export interface ApiResponse<Data> {
  data?: Data
  error?: any
  status: number
  message: MessageObject[]
}

export interface User extends UserInfo {
  id: string | null
  firstName: string | null
  lastName: string | null
  name?: string
  email: string | null
  showDashboardGuide?: boolean
  loginCount: number
  onboarded: boolean
  tourDone: boolean
  deleteTestWarn: boolean
  avatar: string
  loggedIn: boolean
  loading: boolean
  avatarLoading: boolean
  initials: string
  login: (arg: LoginPayload) => Promise<ApiResponse<UserInfo>>
  logout: (alert?: boolean) => Promise<[]>
  update: (arg: UserData) => Promise<ApiResponse<UserInfo>>
  reload: () => Promise<ApiResponse<UserInfo>>
  delete: (arg: DeleteAccountForm) => Promise<ApiResponse<[]>>
  changePassword: (arg: ChangePasswordForm) => Promise<ApiResponse<UserInfo>>
  removeAvatar: () => Promise<ApiResponse<UserInfo>>
  updateAvatar: (payload: File[]) => Promise<ApiResponse<UserInfo>>
  onboard: (payload: OnboardForm) => Promise<ApiResponse<UserInfo>>
}

export type DynamicObject<value> = Record<string, value>

export type Breakpoints =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'sl'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'

export type BreakpointOutput = {
  is?: Breakpoints
  orientation?: 'portrait' | 'landscape' | ''
  isMobile?: boolean
  isTablet?: boolean
  isLaptop?: boolean
  smaller?: (br: string) => boolean
  larger?: (br: string) => boolean
}

export interface HTMLAttrs {
  lang: 'en-us'
  class: string
}

export type HTMLFormInput =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement

export type Layout =
  | 'landing-page'
  | 'app'
  | 'error'
  | 'answer-test'
  | 'preview-test'
  | 'action'
  | 'view-result'

export type FeatureTitle =
  | 'Simple survey'
  | 'Card sorting'
  | 'Design survey'
  | 'Five second test'
  | 'Website evaluation'
  | 'Prototype evaluation'
  | 'Preference test'
  | 'Custom message'

export type ProjectTypes =
  | 'DesignSurvey'
  | 'PreferenceTest'
  | 'FiveSecondTest'
  | 'PrototypeEvaluation'
  | 'WebsiteEvaluation'
  | 'SimpleSurvey'
  | 'ClickTest'
  | 'CardSorting'
  | 'CustomMessage'

export type ProjectComponent = 'TestDetails' | 'WelcomeScreen' | ProjectTypes

export interface FeatureContent {
  color: string
  subtitle: string
  projectComponent: ProjectComponent
}

export type Feature = {
  [key in FeatureTitle]: FeatureContent
}

export interface OnSubmitArgs<Form> {
  formValues: Form
  formFields: Record<keyof Form, HTMLSelectElement | HTMLInputElement>
  formElement: HTMLFormElement
  toggleLoading: (val?: boolean) => void
  refreshForm: () => void
}

export type OnSubmit<Form> = (arg: OnSubmitArgs<Form>) => Promise<void> | void

export interface FullscreenLoading {
  show: (arg: {
    message: string
    delay?: number
    duration?: number
    id?: string
    fadeAppear?: boolean
  }) => Promise<boolean>
  hide: (arg?: { id?: string }) => Promise<boolean>
}

export type Duration = `${number}${'ms' | 's'}`

export type LikeNumber = `${number}` | number

export interface VueElement extends HTMLElement {
  __vue__: Record<string, any>
}

export type ApiAction =
  | 'end_all_sessions'
  | 'change_email'
  | 'cancel_email_change'

export type FiveSecondTestDurations =
  | 5000
  | 10000
  | 15000
  | 20000
  | 25000
  | 30000
  | 45000
  | 60000

export type RenderFunction = (
  d: VNodeData,
  c?: string | boolean | VNodeChildrenArrayContents | [ScopedSlot]
) => VNode

export type HTMLElementTagNames = keyof HTMLElementTagNameMap

export type RouteDialog =
  | 'give-feedback'
  | 'request-feature'
  | 'report-bug'
  | 'contact-us'

export type DeviceType = 'all' | 'mobile' | 'desktop'

export type ThemeIs = 'dark' | 'light'
