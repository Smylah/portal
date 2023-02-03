const light = require('./light')
const dark = require('./dark')

module.exports = {
  ...light,
  ...dark,
  destructive500: '#EF4444',
  neutral50: '#F9FAFB',
  neutral200: '#E5E7EB',
  neutral300: '#D1D5DB',
  neutral400: '#9CA3AF',
  neutral500: '#6B7280',
  neutral700: '#374151',
  primary50: '#E9F2FF',
  primary500: '#267DFF',
  primary600: '#0063F7',
  primary700: '#004FC5',
}
