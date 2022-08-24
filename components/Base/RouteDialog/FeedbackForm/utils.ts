import { FeedbackForm } from '~/server-middleware/routes/feedback/post-feedback'
import { RouteDialog } from '~/types'

export interface Form {
  feedbackTitle?: string
  feedbackDescription?: string
  feedbackFile?: FileList
}

export const getFormContent = (
  dialog: RouteDialog
): {
  label: string
  placeholder: string
  id: string
  props?: Record<string, any>
}[] => {
  const textArea = {
    props: {
      multiline: true,
      minHeight: 92,
    },
  }

  switch (dialog) {
    case 'give-feedback':
      return [
        {
          label: 'What would like us to know?',
          placeholder: 'A quick summary of your feedback',
          id: 'feedbackTitle',
        },
        {
          label: 'Description',
          placeholder: 'The details of your feedback',
          id: 'feedbackDescription',
          ...textArea,
        },
      ]
    case 'contact-us':
      return [
        {
          label: 'Email',
          placeholder: 'Your email',
          id: 'feedbackTitle',
          props: {
            type: 'email',
          },
        },
        {
          label: 'Message',
          placeholder: 'Your message',
          id: 'feedbackDescription',
          ...textArea,
        },
      ]
    case 'request-feature':
      return [
        {
          label: 'What feature would make Crowd better',
          placeholder: 'A quick summary of your idea',
          id: 'feedbackTitle',
        },
        {
          label: 'Description',
          placeholder: 'The details of your idea',
          id: 'feedbackDescription',
          ...textArea,
        },
      ]
    default:
      return []
  }
}

export const getFeedbackType = (
  dialog: RouteDialog
): FeedbackForm['fields']['type'] => {
  switch (dialog) {
    case 'give-feedback':
      return 'feedback'
    case 'contact-us':
      return 'contact'
    case 'request-feature':
      return 'feature'
    case 'report-bug':
      return 'bug'
    default:
      return null
  }
}
