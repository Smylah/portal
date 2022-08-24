import app from './app'
import user, { UserState } from './user'
import answerTest from './answer-test'
import listTest from './list-test'
import privacyAndPolicies from './privacy-and-policies'
import onboardingVideos from './onboarding-videos'
import projectSuite, { TestSuiteState } from './projectSuite'
import viewResult from './view-result'
import notes, { NotesState } from './notes'
import { AppState } from './app/state'
import trash, { TrashState } from './trash'

export interface RootState {
  app: AppState
  user: UserState
  projectSuite: TestSuiteState
  notes: NotesState
  trash: TrashState
  'view-result': ReturnType<typeof viewResult['state']>
  'answer-test': ReturnType<typeof answerTest['state']>
  'list-test': ReturnType<typeof listTest['state']>
  'privacy-and-policies': ReturnType<typeof privacyAndPolicies['state']>
}

export default {
  modules: {
    app,
    user,
    projectSuite,
    notes,
    trash,
    'view-result': viewResult,
    'answer-test': answerTest,
    'list-test': listTest,
    'privacy-and-policies': privacyAndPolicies,
    'onboarding-videos': onboardingVideos,
  },
  strict: false,
  state: () => ({}),
}
