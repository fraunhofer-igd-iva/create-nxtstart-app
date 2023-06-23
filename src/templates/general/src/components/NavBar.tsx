import React from 'react';
import {AppBar, IconButton, Tab, Tabs, Box, useTheme, Menu, MenuItem, Typography, Button, Tooltip, Avatar} from '@mui/material';
import {useRouter} from 'next/router';
import {Brightness4, Brightness7, Menu as MenuIcon} from '@mui/icons-material';
import {useAppDispatch} from '../store/hooks';
import {switchTheme} from '../store/slices/themeSlice';
import {useSession, signIn, signOut} from 'next-auth/react';
import LanguageSelector from './LanguageSelector';

interface LinkTabProps {
    value: string,
    disabled?: boolean,
    label: string;
    href: string;
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component={'a'}
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.preventDefault();
            }}
            {...props}
        />
    )
}

const TABS = [
    {
        label: 'Home',
        pathname: '/'
    },
    {
        label: 'Redux',
        pathname: '/redux'
    },
    {
        label: 'Server-Sent-Events',
        pathname: '/sse'
    },
    {
        label: 'Responsive Design',
        pathname: '/responsive'
    },
]

const validatePath = (path: string) => {
    const tabPaths = TABS.map(tab => tab.pathname)
    return tabPaths.includes(path) ? path : false
}

export default function NavBar() {

    const { data: session } = useSession()
    const router = useRouter()
    const theme = useTheme()
    const appDispatch = useAppDispatch()
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
        appDispatch(switchTheme())
    }

    const a11yProps = (pathname: string) => {
        return {
            id: `simple-tab-${pathname}`,
            'aria-controls': `tab-to-${pathname}`,
        };
    }

    return (
        <>
            {
                router.pathname !== '/_error' &&
                <AppBar
                    position={'sticky'}
                    sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: theme.palette.background.default}}
                >

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size={'large'}
                            aria-label={'account of current user'}
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
                            {
                                TABS.map(
                                    (tab, index) =>
                                        <MenuItem key={index} onClick={() => handleNavigateFromMenu(tab.pathname)}>
                                            <Typography>{tab.label}</Typography>
                                        </MenuItem>
                                )
                            }
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Tabs value={activeTab} onChange={handleChange} aria-label='navigation bar'>
                            {
                                TABS.map((tab, index) =>
                                    <LinkTab key={index} value={tab.pathname} label={tab.label} href={tab.pathname} {...a11yProps(tab.pathname)} />
                                )
                            }
                        </Tabs>
                    </Box>

                    <Box sx={{ml: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Box sx={{mr: 2}}>
                            <LanguageSelector />
                        </Box>
                        <IconButton sx={{mr: 1}} onClick={handleChangeTheme} aria-controls={'switch-theme-mode'}>
                            {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', mr: 2 }}>
                        {
                            session && session.user &&
                            <>
                                <Tooltip title={'Open Menu'}>
                                    <IconButton id={'toggle-user-menu'} onClick={handleOpenUserMenu} sx={{p: 0}}>
                                        {
                                            session.user.name && session.user.image &&
                                            <Avatar alt={session.user.name} src={session.user.image}/>
                                        }
                                        {
                                            session.user.name && !session.user.image &&
                                            <Avatar alt={session.user.name} />
                                        }
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id='menu-user'
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
                                    <Typography sx={{mx: 2}}>Logged in as:</Typography>
                                    <Typography sx={{mx: 2}}>{session.user.name}</Typography>
                                    <MenuItem key={'logout'} onClick={() => signOut()}>
                                        <Typography color={'primary'}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        }
                        {
                            !session &&
                            <Button
                                onClick={() => signIn()}
                                sx={{ p: 0, color: theme.palette.text.primary, display: 'block' }}
                            >
                                Login
                            </Button>
                        }
                    </Box>
                </AppBar>
            }
        </>
    )
}
