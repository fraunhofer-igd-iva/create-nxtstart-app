'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18nConfig'
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language
  const languages = ['en', 'de']
  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (e: SelectChangeEvent) => {
    const newLocale = e.target.value

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = '; expires=' + date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    // "fix" for footer not refreshing locale correctly
    setTimeout(() => router.refresh(), 50)
  }

  return (
    <Box>
      <FormControl>
        <Select
          aria-label={'language selector'}
          aria-haspopup={'true'}
          value={i18n.language ?? i18nConfig.defaultLocale}
          onChange={handleChange}
          variant={'standard'}
        >
          {languages.map((lang: string) => (
            <MenuItem key={lang} value={lang}>
              {t('lang_' + lang)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
