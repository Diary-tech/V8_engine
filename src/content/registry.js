const modules = import.meta.glob('./**/*.mdx', { eager: true })

export function getTopicContent(slug) {
  const key = `./${slug}.mdx`
  return modules[key]?.default ?? null
}

export function getTopicSlugs() {
  return Object.keys(modules).map((key) => key.replace('./', '').replace(/\.mdx$/, ''))
}
