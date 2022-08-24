import { DeviceType, FiveSecondTestDurations } from '.'
import { QuestionModelValue } from '~/components/App/CreateProject/Steps/FollowUpQuestion/Question/type'
import { DesignSurveyFileType, DesignSurveyFrameType } from '~/database/type'
import { TestSuiteCreateSectionItem } from '~/store/projectSuite/create/section'

type Question<T> = Record<`${number}`, T>

export interface ProjectQuestionTask {
  title: string
  followUpQuestions: QuestionModelValue[]
  id: string
}

export interface ProjectForm {
  id?: string

  TestDetails: {
    name: string
    description: string
    deviceType: DeviceType
  }

  WelcomeScreen: {
    title: string
    message: string
    buttonText: string
  }

  ThankYouScreen: {
    title: string
    message: string
  }

  SimpleSurvey: Question<{
    id: string
    followUpQuestions: QuestionModelValue[]
  }>

  CardSorting: Question<{
    id: string
    task: string
    cards: string[]
    categories: string[]
    followUpQuestions: QuestionModelValue[]
  }>

  DesignSurvey: Question<{
    id: string
    fileType: DesignSurveyFileType
    frameType: DesignSurveyFrameType
    file: [string]
    followUpQuestions: QuestionModelValue[]
  }>

  FiveSecondTest: Question<{
    id: string
    duration: FiveSecondTestDurations | `${FiveSecondTestDurations}`
    file: [string]
    followUpQuestions: QuestionModelValue[]
  }>

  WebsiteEvaluation: Question<{
    id: string
    websiteLink: string
    tasks: ProjectQuestionTask[]
    acceptUrlShareTerms: boolean
  }>

  PrototypeEvaluation: Question<{
    id: string
    prototypeLink: string
    prototypeProvider: 'figma'
    tasks: ProjectQuestionTask[]
  }>

  PreferenceTest: Question<{
    id: string
    files: [
      | [string]
      | [string, string]
      | [string, string, string]
      | [string, string, string, string]
    ]
    followUpQuestions: QuestionModelValue[]
  }>

  CustomMessage: Question<{
    id: string
    message: string
    title: string
  }>
}

export type ProjectFormQuestion = TestSuiteCreateSectionItem
