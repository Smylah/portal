import { v4 } from 'uuid'
import { nextTick } from '@vue/composition-api'

import type {
  ProjectComponent,
  ProjectTypes,
  Duration,
  Feature,
  FeatureTitle,
  FiveSecondTestDurations,
  HTMLAttrs,
  LikeNumber,
  RouteDialog,
  VueElement,
  UserWorkRole,
} from '~/types'
import { ProjectFormQuestion } from '~/types/form'

export const htmlAttrs: HTMLAttrs = {
  lang: 'en-us',
  class:
    'bg-surface-default text-text-default dark:bg-dark-surface-default dark:text-dark-text-default',
}

export const features: Feature = {
  'Simple survey': {
    color: '#65A1FC',
    subtitle: 'Get honest feedback to your research questions from real users.',
    projectComponent: 'SimpleSurvey',
  },
  'Card sorting': {
    color: '#F36161',
    subtitle: 'Test and optimize the information architecture of your design.',
    projectComponent: 'CardSorting',
  },
  'Design survey': {
    color: '#45BBAC',
    subtitle:
      'Get user feedback on your product images, videos or audio files.',
    projectComponent: 'DesignSurvey',
  },
  'Five second test': {
    color: '#FFC359',
    subtitle: `Understand user's first impressions by measuring their responses.`,
    projectComponent: 'FiveSecondTest',
  },
  'Website evaluation': {
    color: '#815E8C',
    subtitle: 'Test usability and improve the experience on your website.',
    projectComponent: 'WebsiteEvaluation',
  },
  'Prototype evaluation': {
    color: '#FF9C7A',
    subtitle:
      'Test your product before writing a single line of code using prototypes.',
    projectComponent: 'PrototypeEvaluation',
  },
  'Preference test': {
    color: '#FF8C9C',
    subtitle:
      'Quickly discover which version of your design users prefer and why.',
    projectComponent: 'PreferenceTest',
  },
  'Custom message': {
    color: '#3F3F3F',
    subtitle:
      'Want to add special instructions before a test type? Add it here.',
    projectComponent: 'CustomMessage',
  },
}

/**
 * @description
 * Returns feature object using a feature type
 * **/
export const getFeature = (feature: ProjectTypes) => {
  const formatPath = feature
    .replace(/[A-Z]/g, (x) => ` ${x}`.toLowerCase())
    .replace(/^ [a-z]/, (x) => x[1].toUpperCase())

  return features[formatPath]
}

export const nextFrame = () =>
  new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })

export const sleep = (duration: number = 0) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(duration)
      clearTimeout(timeout)
    }, duration)
  })

export const focusInput = (evt: AnimationEvent) => {
  if (evt.animationName === 'fadeAppear') {
    const root = evt.currentTarget as HTMLElement

    if (root) {
      nextTick(() => {
        const input = root.querySelector('input')

        if (input) {
          input.focus()
        }
      })
    }
  }
}

let uidCount = 0
/**
 * Uid: Function to get unique id
 * **/
export const uid = (prefix?: string) => {
  uidCount += 1

  const toString = (val: number) => val.toString(36)

  const getPrefix = prefix === '' ? '' : prefix || 'uid-'

  const runningTime = toString(performance.now())

  const date = process.client ? '' : `-${toString(Date.now())}`

  const elapsedCalls = toString(uidCount)

  return `${getPrefix}${runningTime}${date}-${elapsedCalls}`.replace(/\./g, '-')
}

export const uuidv4 = v4

export const getDialogAttrs = (
  expanded: boolean,
  id = uid(),
  modal: boolean = true
) => {
  const describedby = `describe-${id}`
  const triggerId = `trigger-${id}`

  return {
    trigger: {
      id: triggerId,
      'aria-controls': id,
      'aria-haspopup': 'dialog',
      'aria-expanded': expanded,
    },
    dialog: {
      id,
      role: 'dialog',
      'aria-modal': modal ? 'true' : undefined,
      'aria-describedby': expanded ? describedby : undefined,
      'aria-labelledby': triggerId,
    },
    describedby: {
      id: describedby,
    },
  }
}

export const splitPath = (path: string) => path.split('/').filter(Boolean)

export const suffixSlash = (str?: string) =>
  !str ? '' : `${str}/`.replace(/\/{2,}$/, '/')

/**
 * @name pseudoFocus
 * @description
 * pseudo focus for comboboxes, dropdowns, menus or any element that requires its activator to be focused, and still show a focus state on its children
 * @param { HTMLElement } el
 **/
export const pseudoFocus = (el: HTMLElement) => {
  if (el && el.classList.contains('pseudo-focus') && !el.dataset.disabled) {
    const combobox = el.closest('.combobox')

    if (combobox) {
      const pseudoFocusChildren = combobox.querySelectorAll('.pseudo-focus')

      if (pseudoFocusChildren.length) {
        for (const node of Array.from(
          pseudoFocusChildren as NodeListOf<HTMLElement>
        )) {
          delete node.dataset.pseudoFocus
        }

        el.dataset.pseudoFocus = 'true'

        // @ts-ignore
        el?.scrollIntoViewIfNeeded?.()
      }
    }
  }
}

export const pseudoFocusOnMouseEnter = (evt: MouseEvent) => {
  const currentTarget = evt.currentTarget as HTMLElement

  pseudoFocus(currentTarget)
}

export const layoutSizing = {
  appHeader: 56,
  layoutHeader: 64,
  layoutPadding: 32,
  get allSizes() {
    return this.appHeader + this.layoutHeader + this.layoutPadding
  },
}

export const oneFrame = 1000 / 60

/**
 * @name stepper
 * @description
 * Interporlates from, to, and ratio values to form a progress moving from the 'from' value to the 'to' value in respect to the ratio.
 * @param { number } from - Value to interpolate from
 * @param { number } to - Value to interpolate to
 * @param { number } ratio - Progress of interpolation. This should ultimately be a value between 0 and 1
 * @returns `number` Between 0 and 1
 * **/
export const stepper = (from: number, to: number, ratio: number): number =>
  (from - to) * ratio + to

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2))
}

export function scrollMain(scrollTo: number, mainEl?: HTMLElement) {
  if (process.client) {
    const frames = [
      ...Array.from({ length: oneFrame }, (_, i) => i / oneFrame),
      1,
    ]

    const main = mainEl || document.querySelector('main')

    if (main) {
      const scrollFrom = main.scrollTop

      const scroll = (index: number) => {
        const frame = frames[index]

        if (typeof frame === 'number') {
          requestAnimationFrame(() => {
            main.scrollTo(0, stepper(scrollTo, scrollFrom, easeOutCirc(frame)))

            scroll(index + 1)
          })
        }
      }

      scroll(0)
    }
  }
}

export const oneMinute = 60_000

export const oneHour = oneMinute * 60

export const oneDay = oneHour * 24

export const oneWeek = oneDay * 7

export const inOneHour = (offset: number = 1) => Date.now() + oneHour * offset

export const inOneDay = (offset: number = 1) => Date.now() + oneDay * offset

export function formatTime(time: number, trim?: boolean) {
  if (!trim) {
    if (time <= 5000 || !time) {
      return 'Just now'
    }

    if (time < oneMinute) {
      return 'Few seconds ago'
    }
  } else if (trim && time < oneMinute) {
    const timeInSeconds = time / 1000

    return `${timeInSeconds} second${timeInSeconds > 1 ? 's' : ''}`
  }

  const timeInMin = Math.floor(time / oneMinute)

  const formatValue = (value: number, verb: 'A' | 'An') =>
    value === 1 ? (trim ? 1 : verb) : value

  const pluralize = (value: number) => (value > 1 ? 's' : '')

  const output = () => {
    if (timeInMin <= 59) {
      return `${formatValue(timeInMin, 'A')} min${pluralize(timeInMin)} ago`
    }

    const timeInHr = Math.floor(timeInMin / 60)

    if (timeInHr <= 23) {
      return `${formatValue(timeInHr, 'An')} hour${pluralize(timeInHr)} ago`
    }

    const timeInDay = Math.floor(timeInHr / 24)

    if (timeInDay <= 30) {
      return `${formatValue(timeInDay, 'A')} day${pluralize(timeInDay)} ago`
    }

    const timeInMonth = Math.floor(timeInDay / 31)

    if (timeInMonth <= 11) {
      return `${formatValue(timeInMonth, 'A')} month${pluralize(
        timeInMonth
      )} ago`
    }

    const timeInYear = Math.floor(timeInMonth / 12)

    return `${formatValue(timeInYear, 'A')} year${pluralize(timeInYear)} ago`
  }

  if (trim) {
    return output().replace(/\s+ago$/, '')
  }
  return output()
}

export const removeUndefinedValues = (
  arg: Record<string, any>,
  removeNull: boolean = false
): Record<string, any> => {
  const output = { ...arg }

  for (const key in output) {
    if (
      typeof output[key] === 'undefined' ||
      (removeNull ? output[key] === null : false)
    ) {
      delete output[key]
    }
  }

  return output
}

export const passwordRegExpString =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?#)(-_^~&])[A-Za-z\\d@$!%*?#)(-_^~&]{2,32}$'

export const emailRegExpString =
  '^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{1,})?$'

export const creatTestProgressRegExpString =
  '^(?:Draft: Create|Draft: Recruit|Completed)$'

export const urlRegExpString =
  '^((http(s?)?):\\/\\/)?([wW]{3}\\.)?[a-zA-Z0-9\\-.]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?/?$'

export const addTransitioningDataAttr = () => {
  if (process.client) {
    document.documentElement.dataset.pageTransitioning = ''
  }
}

export const removeTransitioningDataAttr = () => {
  if (process.client) {
    requestAnimationFrame(() => {
      delete document.documentElement.dataset.pageTransitioning
    })
  }
}

/**
 * @name getObjectPathValue
 * @description
 * Gets path of a non circular object using strings
 * @param {string} path String path E.g `pathA.pathB.pathC`
 * @param {Record<string, any>} object The object to search on
 * @param {number} [index] Used to start the search from a specific path's index. Mostly used internally.
 * @returns `any` Found value
 * **/
export const getObjectPathValue = (
  path: string,
  object: Record<string, any> = {},
  index: number = 0
): any => {
  if (!path) {
    return object
  }

  const splitPath = path.split('.').filter(Boolean)

  // path has been found
  if (splitPath.length === 1) {
    return object[splitPath[0]]
  }

  return getObjectPathValue(
    [...splitPath].splice((index || 0) + 1).join('.'),
    object[splitPath[0]]
  )
}

export const freshQuestion = () =>
  ({
    id: uuidv4(),
    conditionalLogic: false,
    title: '',
    required: false,
    type: 'short-text',
  } as unknown as ProjectFormQuestion)

export const getTestFeatureTitle = (
  value: ProjectComponent
): FeatureTitle | 'Invalid test' => {
  switch (value) {
    case 'SimpleSurvey':
      return 'Simple survey'
    case 'CardSorting':
      return 'Card sorting'
    case 'DesignSurvey':
      return 'Design survey'
    case 'FiveSecondTest':
      return 'Five second test'
    case 'PrototypeEvaluation':
      return 'Prototype evaluation'
    case 'WebsiteEvaluation':
      return 'Website evaluation'
    case 'PreferenceTest':
      return 'Preference test'
    case 'CustomMessage':
      return 'Custom message'
    default:
      return 'Invalid test'
  }
}

export const alphabets = Array.from(Array(26))
  .map((_, i) => i + 65)
  .map((x) => String.fromCharCode(x).toLowerCase())

export const getAlphabets = (index: number): string => {
  return alphabets[index]
}

export const getAlphabetIndex = (letter: string): number => {
  return alphabets.indexOf(letter)
}

export const fiveSecondTestDurations: FiveSecondTestDurations[] = [
  5000, 10000, 15000, 20000, 25000, 30000, 45000, 60000,
]

/**
 * @name newProjectConstructor
 * @description
 * Returns a new project with dynamic properties according to the type of project to create
 * @param {ProjectComponent} type
 * **/
export const newProjectConstructor = (type: ProjectComponent) => {
  const addPaths = (
    condition: boolean,
    paths: Record<string, any>
  ): Record<string, any> => (condition ? paths : {})

  const hasTasks = /PrototypeEvaluation|WebsiteEvaluation/.test(type)

  const noFollowUps = hasTasks || type === 'CustomMessage'

  return {
    type,
    id: uuidv4(),

    ...addPaths(!noFollowUps, {
      followUpQuestions: [freshQuestion()],
    }),

    ...addPaths(hasTasks, {
      tasks: [
        {
          id: uuidv4(),
          title: '',
          followUpQuestions: [freshQuestion()],
        },
      ],
    }),

    ...addPaths(type === 'CardSorting', {
      categories: ['', ''],
      cards: ['', ''],
      task: '',
    }),

    ...addPaths(type === 'DesignSurvey', {
      fileType: 'image',
      frameType: 'no-frame',
      file: [],
    }),

    ...addPaths(type === 'FiveSecondTest', {
      duration: String(Number(fiveSecondTestDurations[0])),
      file: [],
    }),

    ...addPaths(type === 'WebsiteEvaluation', {
      websiteLink: '',
      acceptUrlShareTerms: false,
    }),

    ...addPaths(type === 'PrototypeEvaluation', {
      prototypeLink: '',
      prototypeProvider: 'figma',
    }),

    ...addPaths(type === 'CustomMessage', {
      message: '',
      title: '',
    }),

    ...addPaths(type === 'PreferenceTest', {
      files: [[], [], [], []],
    }),
  } as unknown as ProjectFormQuestion
}

/***
 * @name convertToByte
 * @description
 * Returns size in byte for values in kb, mb, and gb
 * @param {string} formattedValue
 * @returns {number} Size in byte
 * */
export const convertToByte = (
  formattedValue: `${number}${'kb' | 'mb' | 'gb'}`
): number => {
  const size = (formattedValue.match(/(?:kb|mb|gb)\s?$/g) || [])[0] as
    | 'kb'
    | 'mb'
    | 'gb'

  let convertSize: number

  switch (size) {
    case 'kb':
      convertSize = 1_000
      break
    case 'mb':
      convertSize = 1_000_000
      break
    case 'gb':
      convertSize = 1_000_000_000
  }

  return parseFloat(formattedValue) * convertSize
}

/***
 * @name formatByte
 * @description
 * Returns formatted size in kb, mb, and gb
 * @param {number} bytes
 * @param {number} fixed
 * @returns {string} Formatted size
 * */
export const formatByte = (bytes: number, fixed: number = 2): string => {
  const kb = 1_000

  const mb = kb * kb

  const gb = mb * kb

  const convertSize =
    bytes < kb
      ? 1
      : bytes >= kb && bytes < mb
      ? kb
      : bytes >= mb && bytes < gb
      ? mb
      : gb

  let sizeType: 'byte' | 'kb' | 'mb' | 'gb'

  switch (convertSize) {
    case kb:
      sizeType = 'kb'
      break
    case mb:
      sizeType = 'mb'
      break
    case gb:
      sizeType = 'gb'
      break
    default:
      sizeType = 'byte'
  }

  return `${(bytes / convertSize).toFixed(fixed)}${sizeType}`
}

export const confirmDeleteAccount = 'delete my account'

export const confirmDeleteAccountRegExp = `^${confirmDeleteAccount}$`

export const pingAddNewTestBtn = async () => {
  if (process.client) {
    const addNewTestRoot = document.getElementById('add-new-test') as VueElement

    if (addNewTestRoot) {
      addNewTestRoot.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })

      await sleep(750)

      addNewTestRoot.querySelector('button')?.focus({ preventScroll: true })

      if (typeof addNewTestRoot?.__vue__?.togglePingBtn === 'function') {
        await sleep(100)

        addNewTestRoot.__vue__.togglePingBtn?.()
      }
    }
  }
}

export const answerTestLoadingId = 'answer-test-fullscreen-loading'

export const otherChoicePrefix = '***OTHER***'

export const scrollToLandingPageHash = (
  routeHash: string,
  smooth?: boolean
) => {
  const validHash = ['use-cases', 'features', 'pricing', 'contact']

  const hashValue = routeHash.replace(/^#/, '').trim()

  if (validHash.includes(hashValue)) {
    const hashEl = document.getElementById(hashValue) as HTMLElement

    if (hashEl) {
      const header = document.getElementById(
        'landing-page-header'
      ) as HTMLElement

      const top = hashEl.offsetTop - (32 + (header ? header.clientHeight : 0))

      sleep().then(() => {
        window.scrollTo({
          top,
          behavior: smooth ? 'smooth' : 'auto',
        })
      })
    }
  }
}

export const formBody = (arg?: Record<string, any>) => {
  if (process.client) {
    const formEl = document.createElement('form')

    formEl.enctype = 'multipart/form-data'

    const formData = new FormData(formEl)

    if (typeof arg === 'object') {
      for (const key in arg) {
        if (/string|number/.test(typeof arg[key])) {
          formData.set(key, arg[key])
        }
      }
    }

    return formData
  }

  return null
}

/**
 * @name convertToMilliSeconds
 * @description
 * Converts seconds from '1000ms' to 1000 and from '1s' to 1000
 * @param { Duration | LikeNumber } rawDuration - Formatted duration
 * @param { number } [fallback] - Fallback if rawDuration is invalid
 * @returns `number`
 * **/
export function convertToMilliSecond(
  rawDuration: Duration | LikeNumber,
  fallback?: number
): number {
  const parsed = parseFloat(`${rawDuration}`)

  if (isNaN(parsed) || parsed === Infinity) {
    return fallback || 0
  }

  if (typeof rawDuration === 'number') {
    return rawDuration >= 0 ? rawDuration : 0
  }

  if (typeof rawDuration === 'string') {
    const isSeconds = /^\d+(?:\.\d+)?s$/.test(rawDuration)
    if (isSeconds) {
      const parsedOutput = parsed * 1000

      return parsedOutput >= 0 ? parsedOutput : 0
    }

    const isMilliSeconds = /^\d+(?:\.\d+)?(?:ms)?$/.test(rawDuration)
    if (isMilliSeconds) {
      return parsed >= 0 ? parsed : 0
    }
  }

  return 0
}

export const sortObject = (
  object: Record<string, any>,
  cb?: (firstKey: string, nextKey: string) => number
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(object).sort(([firstKey], [nextKey]) => {
      if (typeof cb === 'function') {
        return cb(firstKey, nextKey)
      }

      return firstKey > nextKey ? 1 : -1
    })
  )
}

export const generateShareLink = (link: string) =>
  process.client ? `${location.origin}/answer-test/${link}/` : ''

export const getOS = () => {
  const userAgent = window.navigator.userAgent

  if (/iPhone/i.test(userAgent)) {
    return 'ios'
  } else if (/iPad/i.test(userAgent)) {
    return 'ipad'
  } else if (/Macintosh/i.test(userAgent)) {
    return 'mac'
  } else if (/windows/i.test(userAgent)) {
    return 'windows'
  } else if (/Android/.test(userAgent)) {
    return 'android'
  } else if (/Linux/.test(userAgent)) {
    return 'linux'
  }

  return 'unknown'
}

export const setClientOs = () => {
  document.documentElement.dataset.os = getOS()
}

export const showServerAuthMessage = (
  path: 'login' | 'signup',
  pToast: Vue['$pToast'],
  cookies: Vue['$cookies']
) => {
  const errorMessagePath = `${path}_error_message`
  const successMessagePath = `${path}_success_message`

  const errorMessage =
    cookies.get(errorMessagePath) ||
    cookies.get(`${path === 'login' ? 'signup' : 'login'}_error_message`)

  const successMessage = cookies.get(successMessagePath)

  cookies.set('auth_provider_path', path)

  cookies.set('client_base_url', location.origin)

  if ((errorMessage || successMessage || '').replace(/undefined/, '')) {
    const message = ((successMessage || errorMessage) as string).replace(
      /undefined/,
      ''
    )

    message &&
      pToast.open({
        error: !successMessage,
        message,
        duration: 5000,
      })
  }

  sleep(oneFrame).then(() => {
    cookies.remove(errorMessagePath)
    cookies.remove(`${path === 'login' ? 'signup' : 'login'}_error_message`)

    cookies.remove(successMessagePath)
    cookies.remove(`${path}_focus`)
  })
}

export const capitalize = (string: string) => {
  return (string || '').replace(/^[a-zA-Z]/, (x) => x.toUpperCase())
}

export const projectWarningDuplicateId = uid()

export const debounce = (cb: () => void, delay: number) => {
  let debounceTimer: NodeJS.Timeout

  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => cb.apply(context, args), delay)
  }
}

export const userWorkRole: UserWorkRole[] = [
  'UX Researcher',
  'UX Designer',
  'Product Designer',
  'Product Manager',
  'Business Manager',
  'Scrum Master',
  'Marketer',
  'Software Engineer',
  'Success Manager',
  'Support',
  'Teacher',
  'Students',
  'Others',
]

export const userCompanySize = [
  {
    label: 'Just me',
    value: '1',
  },
  {
    label: '2 to 20',
    value: '2-20',
  },
  {
    label: '20 to 50',
    value: '20-50',
  },
  {
    label: '50 to 100',
    value: '50-100',
  },
  {
    label: '100 to 200',
    value: '100-200',
  },
  {
    label: 'More than 200',
    value: '>200',
  },
]

export const userReferrer = [
  'Friend/Referral',
  'Google Search',
  'Linkedin',
  'Facebook',
  'Instagram',
  'Twitter',
  'Product Hunt',
  'Online News',
  'Others',
]

export const validRouteDialog: RouteDialog[] = [
  'give-feedback',
  'request-feature',
  'report-bug',
  'contact-us',
]

export const getInitials = (val: string) => {
  const [firstName, lastName = ''] = (val || '').split(' ')

  return (
    `${firstName[0] || ''}${lastName[0] || ''}`.trim().toUpperCase() || '--'
  )
}

export const getType = (arg: any) => {
  if (arg instanceof Array) {
    return 'array'
  }

  return typeof arg
}

export const randomizeArray = (arr: any[]) => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length - 1)] : arr
}

export const srcToFile = async (
  src: string,
  fileName: string,
  mimeType: string = ''
) => {
  const res = await fetch(src)

  const buffer = await res.arrayBuffer()

  return new File([buffer], fileName, { type: mimeType })
}
