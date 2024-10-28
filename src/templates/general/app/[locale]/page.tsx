import initTranslations from '../i18n'
import TranslationProvider from '@/components/TranslationProvider'
import { Container, Typography, Box } from '@mui/material'
import IndexCard, { IndexCardProps } from '@/app/[locale]/IndexCard'
import examples from '@/nxtstart.config.json'
import { PageProps } from '@/util/types'

const libraries: IndexCardProps[] = [
  {
    imageLink: 'https://nextjs.org/favicon.ico',
    title: 'Next JS',
    description:
      'This framework builds the foundation of this template, alowing for server-side-rendering and connecting front- and backend. Find in-depth information about Next.js features and API.',
    hrefDocs: 'https://nextjs.org/docs',
    hrefExample: '/serverActions',
    additionalLinks: [
      {
        label: 'YT Tutorial',
        href: 'https://www.youtube.com/watch?v=9P8mASSREYM&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH',
      },
    ],
  },
  {
    imageLink: 'https://avatars.githubusercontent.com/u/6019716?s=48&v=4',
    title: 'ESLint',
    description:
      'ESLint can be used to enforce codestyle across the project and prevent errors. Run the lint run configuration or setup automatic linting depending on your code editor.',
    hrefDocs: 'https://eslint.org/',
    hrefExample: undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://avatars.githubusercontent.com/u/25822731?s=200&v=4',
    title: 'Prettier',
    description:
      'Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account.',
    hrefDocs: 'https://prettier.io/',
    hrefExample: undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/svg/1f436.svg',
    title: 'Husky Pre-Commit Hook',
    description:
      'Husky allows the use Pre-Commit hooks that run code automatically before code is pushed to the repository. This can be used for automatic linting and code formatting.',
    hrefDocs: 'https://typicode.github.io/husky/',
    hrefExample: undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://swr.vercel.app/favicon/safari-pinned-tab.svg',
    title: 'SWR Data Fetching',
    description:
      'SWR is used to fetch data inside components at runtime on client side. Provides good error and loading indicators using stale-while-revalidate.',
    hrefDocs: 'https://swr.vercel.app/',
    hrefExample: examples.includes('swr') ? '/swr' : undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.svg',
    title: 'Material UI',
    description: 'Used as the main design library. Browse the catalog of components provided by Material UI.',
    hrefDocs: 'https://mui.com/material-ui/getting-started/overview/',
    hrefExample: examples.includes('mui') ? '/responsive' : undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png',
    title: 'React Redux + Toolkit',
    description:
      'Allows easy state management across pages and components in your react application. The toolkit reduces needed code for the state store.',
    hrefDocs: 'https://react-redux.js.org/introduction/getting-started#api-overview',
    hrefExample: examples.includes('redux') ? '/redux' : undefined,
    additionalLinks: [],
  },
  {
    imageLink:
      'data:image/jpeg;base64,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',
    title: 'D3 JS',
    description:
      'JavaScript library for producing dynamic, interactive data visualizations in web browsers. It makes use of Scalable Vector Graphics, HTML5, and Cascading Style Sheets standards.',
    hrefDocs: 'https://d3js.org/',
    hrefExample: examples.includes('d3') ? '/d3' : undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://next-auth.js.org/img/logo/logo-sm.png',
    title: 'Next Auth',
    description:
      'Easy to implement user authentication and session management. Allows for third party providers and own implmentations for the login.',
    hrefDocs: 'https://next-auth.js.org/getting-started/example',
    hrefExample: examples.includes('nextAuth') ? '/restrictedPage' : undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://avatars.githubusercontent.com/u/17219288?s=200&v=4',
    title: 'Prisma',
    description: 'Provides client for accessing databases in Next JS. Simplifies data modeling amd sql queries.',
    hrefDocs: 'https://www.prisma.io/docs',
    hrefExample: examples.includes('prisma') ? '/prisma' : undefined,
    additionalLinks: [],
  },
  {
    imageLink:
      'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F4042378089-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-L9iS6WpW81N7RGRTQ-K%252Favatar.png%3Fgeneration%3D1523345851027218%26alt%3Dmedia',
    title: 'React I18Next',
    description:
      'Powerful internationalization framework. Check out the source code for the index page and prisma page to see the different ways of using it.',
    hrefDocs: 'https://react.i18next.com/getting-started',
    hrefExample: undefined,
    additionalLinks: [{ label: 'Tutorial', href: 'https://i18nexus.com/tutorials/nextjs/react-i18next' }],
  },
  {
    imageLink: 'https://ui-avatars.com/api/?name=Web+Worker&length=2',
    title: 'Web Worker',
    description:
      'When creating progressive visualizations Web Workers can help by offloading intensive computations onto another thread in the browser.',
    hrefDocs: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers',
    hrefExample: examples.includes('webWorker') ? '/webworker' : undefined,
    additionalLinks: [
      { label: 'Example Repo', href: 'https://github.com/vercel/next.js/tree/canary/examples/with-web-worker' },
    ],
  },
  {
    imageLink: 'https://ui-avatars.com/api/?name=Server+Sent+Events&length=3',
    title: 'Server-Sent-Events',
    description:
      'Make use of server-sent-events for large computations that can already be displayed in chunks while the rest is still being computed.',
    hrefDocs: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events',
    hrefExample: examples.includes('sse') ? '/sse' : undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://framerusercontent.com/images/3ydDYhTbVKKzF5xDzZpZKoMmc.png',
    title: 'Framer Motion',
    description:
      'Framer motion provides simple to use animations on a broad spectrum. From an animated button and scrolling progress bars to page transitions.',
    hrefDocs: 'https://www.framer.com/motion/?utm_source=motion-readme-docs',
    hrefExample: undefined,
    additionalLinks: [],
  },
  {
    imageLink: 'https://ui-avatars.com/api/?name=Progressive+Web+App&length=3',
    title: 'Next PWA + Service Worker',
    description:
      'Progressive web apps improve loading for repeating visitors and allow users to install the webapp to make it run like a native app.',
    hrefDocs: 'https://github.com/shadowwalker/next-pwa',
    hrefExample: undefined,
    additionalLinks: [
      { label: 'SW API', href: 'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API' },
      { label: 'PWA Tutorial', href: 'https://web.dev/learn/pwa/' },
    ],
  },
  {
    imageLink: 'https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg?updated=1667565306852',
    title: 'Cypress',
    description:
      'Cypress is a next generation front end testing tool built for the modern web. They address the key pain points developers and QA engineers face when testing modern applications.',
    hrefDocs: 'https://docs.cypress.io/guides/overview/why-cypress',
    hrefExample: undefined,
    additionalLinks: [],
  },
]

export default async function LandingPage(props: { params: PageProps }) {
  const { locale } = await props.params
  const { t, options } = await initTranslations(locale, ['common', 'indexPage'])

  return (
    <TranslationProvider namespaces={options.ns} locale={locale}>
      <Container
        sx={{
          my: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h3">{t('appName')}</Typography>
          <Typography variant="h5">{t('appDescription', { ns: 'indexPage' })}</Typography>
          <Typography sx={{ my: 3 }}>{t('getStarted', { file: 'page.tsx', ns: 'indexPage' })}</Typography>
        </Box>

        <Box
          sx={{
            width: '90dvw',
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {libraries.map((lib) => (
            <IndexCard
              key={lib.title}
              imageLink={lib.imageLink}
              title={lib.title}
              description={lib.description}
              hrefDocs={lib.hrefDocs}
              hrefExample={lib.hrefExample}
              additionalLinks={lib.additionalLinks}
            />
          ))}
        </Box>
      </Container>
    </TranslationProvider>
  )
}
