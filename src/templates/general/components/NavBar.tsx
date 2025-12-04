'use client'

import React from 'react'
import {
  AppBar,
  IconButton,
  Tab,
  Tabs,
  Box,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  useColorScheme,
  <§auth§>Button,
  Tooltip,
  Avatar,</§auth§>
} from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material'
<§auth§>import { authClient } from '@/app/api/auth/[...all]/authClient'</§auth§>
import LanguageSelector from './LanguageSelector'

interface LinkTabProps {
  value: string
  disabled?: boolean
  label: string
  href: string
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={'a'}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const TABS = [
  {
    label: 'Home',
    pathname: '/',
  },
  <§mui§>{
    label: 'Responsive Design',
    pathname: '/responsive',
  },</§mui§>
  <§redux§>{
    label: 'Redux',
    pathname: '/redux',
  },</§redux§>
  <§sse§>{
    label: 'Server-Sent-Events',
    pathname: '/sse',
  },</§sse§>
]

const validatePath = (path: string | null) => {
  const tabPaths = TABS.map((tab) => tab.pathname)
  const pathWithoutLocale = '/' + path?.split('/').slice(2).join('/')
  return pathWithoutLocale && tabPaths.includes(pathWithoutLocale) ? pathWithoutLocale : false
}

export default function NavBar() {
  <§auth§>const { data: session } = authClient.useSession()</§auth§>
  const { mode, setMode } = useColorScheme()
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const [activeTab, setActiveTab] = React.useState<string | false>(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  <§auth§>const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)</§auth§>

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  <§auth§>const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  </§auth§>const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  <§auth§>const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  </§auth§>const handleNavigateFromMenu = (path: string) => {
    router.push(path)
    handleCloseNavMenu()
  }

  React.useEffect(() => {
    const path = validatePath(pathname)
    setActiveTab(path)
  }, [pathname])

  const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
    router.push(newValue)
  }

  const handleChangeTheme = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  const a11yProps = (pathname: string) => {
    return {
      id: `simple-tab-${pathname}`,
      'aria-controls': `tab-to-${pathname}`,
    }
  }

  return (
    <>
      {pathname !== '/_error' && (
        <AppBar
          position={'sticky'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* responsive menu for mobile devices or small windows */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size={'large'}
              aria-controls={'menu-appbar'}
              aria-haspopup={'true'}
              onClick={handleOpenNavMenu}
              color={'inherit'}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id={'menu-appbar'}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {TABS.map((tab, index) => (
                <MenuItem key={index} onClick={() => handleNavigateFromMenu(tab.pathname)}>
                  <Typography>{tab.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* standard tabs menu for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={activeTab} onChange={handleChange} aria-label="navigation bar">
              {TABS.map((tab, index) => (
                <LinkTab
                  key={index}
                  value={tab.pathname}
                  label={tab.label}
                  href={tab.pathname}
                  {...a11yProps(tab.pathname)}
                />
              ))}
            </Tabs>
          </Box>

          {/* language selector and theme mode toggle */}
          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>
              <LanguageSelector />
            </Box>
            <IconButton sx={{ mr: 1 }} onClick={handleChangeTheme} aria-controls={'switch-theme-mode'}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          <§auth§>{/* next auth login and user menu */}
          <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', mr: 2 }}>
            {session && session.user && (
              <>
                <Tooltip title={'Open Menu'}>
                  <IconButton id={'toggle-user-menu'} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {session.user.name && session.user.image && (
                      <Avatar alt={session.user.name} src={session.user.image} />
                    )}
                    {session.user.name && !session.user.image && <Avatar alt={session.user.name} />}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id={'menu-user'}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography sx={{ mx: 2 }}>Logged in as:</Typography>
                  <Typography sx={{ mx: 2 }}>{session.user.name}</Typography>
                  <MenuItem
                    key={'logout'}
                    onClick={async () => {
                      await authClient.signOut()
                      router.refresh()
                    }}
                  >
                    <Typography color={'primary'}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            {!session && (
              <Button
                onClick={() => {
                  router.push(`/signIn?callbackUrl=${pathname}`)
                }}
                sx={{ p: 0, color: theme.palette.text.primary, display: 'block' }}
              >
                Login
              </Button>
            )}
          </Box></§auth§>
        </AppBar>
      )}
    </>
  )
}
