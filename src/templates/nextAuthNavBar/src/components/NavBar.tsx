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
  Button,
  Tooltip,
  Avatar,
} from '@mui/material'
import { useRouter } from 'next/router'
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material'
import { useSession, signIn, signOut } from 'next-auth/react'
import LanguageSelector from './LanguageSelector'
import examples from '../../webstart.config.json'

interface NavBarProps {
  setActiveTheme: (newMode: 'light' | 'dark') => void
}

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
]
// done this way to make the navbar dynamically present appropriate tabs after creation using the template app, can be removed and all tabs moved directly into the object above
if (examples.includes('mui')) {
  TABS.push({
    label: 'Responsive Design',
    pathname: '/responsive',
  })
}
if (examples.includes('redux')) {
  TABS.push({
    label: 'Redux',
    pathname: '/redux',
  })
}
if (examples.includes('sse')) {
  TABS.push({
    label: 'Server-Sent-Events',
    pathname: '/sse',
  })
}

const validatePath = (path: string) => {
  const tabPaths = TABS.map((tab) => tab.pathname)
  return tabPaths.includes(path) ? path : false
}

export default function NavBar(props: NavBarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const theme = useTheme()
  const [activeTab, setActiveTab] = React.useState<string | false>(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleNavigateFromMenu = (path: string) => {
    router.push(path)
    handleCloseNavMenu()
  }

  React.useEffect(() => {
    const path = validatePath(router.pathname)
    setActiveTab(path)
  }, [router.pathname])

  const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
    await router.push(newValue)
  }

  const handleChangeTheme = () => {
    props.setActiveTheme(theme.palette.mode === 'dark' ? 'light' : 'dark')
    window.localStorage.setItem('themeMode', theme.palette.mode === 'dark' ? 'light' : 'dark')
  }

  const a11yProps = (pathname: string) => {
    return {
      id: `simple-tab-${pathname}`,
      'aria-controls': `tab-to-${pathname}`,
    }
  }

  return (
    <>
      {router.pathname !== '/_error' && (
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
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* next auth login and user menu */}
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
                  <MenuItem key={'logout'} onClick={() => signOut()}>
                    <Typography color={'primary'}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
            {!session && (
              <Button onClick={() => signIn()} sx={{ p: 0, color: theme.palette.text.primary, display: 'block' }}>
                Login
              </Button>
            )}
          </Box>
        </AppBar>
      )}
    </>
  )
}
