function normalizeBasePath(basePath: string) {
  if (!basePath || basePath === '/') {
    return '/'
  }

  return `/${basePath.replace(/^\/+|\/+$/g, '')}/`
}

export function withBasePath(path: string) {
  const trimmedPath = path.replace(/^\/+/, '')
  const normalizedBasePath = normalizeBasePath(import.meta.env.BASE_URL)

  if (normalizedBasePath === '/') {
    return `/${trimmedPath}`
  }

  return `${normalizedBasePath}${trimmedPath}`
}
