import { Helmet } from 'react-helmet-async'

/**
 * @param {{title: string, description: string, path?: string, image?: string}} props
 */
export default function Seo({ title, description, path = '/cross-plane-vs-flat-plane', image = '/favicon.svg' }) {
  const origin = 'https://v8-anatomy.example'
  const url = `${origin}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${origin}${image}`} />
      <meta property="og:image:alt" content="V8 Anatomy technical blueprint mark" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
