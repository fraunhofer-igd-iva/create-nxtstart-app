import React from 'react';
import {Box, FormControl, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {useTranslation} from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function LanguageSelector() {

    const { t, i18n } = useTranslation()
    const router = useRouter()

    const languages: readonly string[] = i18nextConfig.i18n.locales

    const handleChange = (event: SelectChangeEvent) => {
        i18n.changeLanguage(event.target.value).then(() => {})
        // set cookie that overrides the default accepted language header and saves user choice
        document.cookie = `NEXT_LOCALE=${event.target.value}; max-age=31536000; path=/`
    }

    return (
        <Box>
            <FormControl>
                <Select
                    aria-label={'language selector'}
                    aria-haspopup={'true'}
                    value={i18n.language}
                    onChange={handleChange}
                    variant={'standard'}
                >
                    {
                        languages.map((lang: string) =>
                            <MenuItem key={lang} value={lang}>
                                <Link href={router.pathname} locale={lang}>
                                    {t('lang_' + lang)}
                                </Link>
                            </MenuItem>)
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
