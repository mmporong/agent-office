import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  BridgeDirection,
  BridgeLogEntry,
  UnityBuildConfig,
  UnityEventName,
  WrapperCommandName,
} from '../types/unity'
import { withBasePath } from '../utils/publicPath'

const MAX_LOG_ENTRIES = 12

function formatDetail(payload: Record<string, unknown>): string {
  const entries = Object.entries(payload)
  if (entries.length === 0) {
    return '-'
  }

  return entries
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(' | ')
}

function createLogEntry(
  direction: BridgeDirection,
  name: string,
  payload: Record<string, unknown>,
): BridgeLogEntry {
  return {
    id: `${Date.now()}-${name}-${Math.random().toString(16).slice(2, 8)}`,
    timestamp: new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    direction,
    name,
    detail: formatDetail(payload),
  }
}

function hasAttachedBuild(config: UnityBuildConfig | null): boolean {
  if (!config) {
    return false
  }

  return [
    config.loaderUrl,
    config.dataUrl,
    config.frameworkUrl,
    config.codeUrl,
  ].every((value) => value.trim().length > 0)
}

function resolveConfigAssetUrl(assetUrl: string | undefined, configUrl: string) {
  const trimmedAssetUrl = assetUrl?.trim() ?? ''
  if (!trimmedAssetUrl) {
    return ''
  }

  if (/^(?:https?:)?\/\//.test(trimmedAssetUrl) || trimmedAssetUrl.startsWith('/')) {
    return trimmedAssetUrl
  }

  return new URL(trimmedAssetUrl, configUrl).toString()
}

function normalizeBuildConfig(config: UnityBuildConfig, configUrl: string): UnityBuildConfig {
  return {
    ...config,
    loaderUrl: resolveConfigAssetUrl(config.loaderUrl, configUrl),
    dataUrl: resolveConfigAssetUrl(config.dataUrl, configUrl),
    frameworkUrl: resolveConfigAssetUrl(config.frameworkUrl, configUrl),
    codeUrl: resolveConfigAssetUrl(config.codeUrl, configUrl),
    streamingAssetsUrl: resolveConfigAssetUrl(config.streamingAssetsUrl, configUrl),
  }
}

export function useUnityBridge() {
  const [config, setConfig] = useState<UnityBuildConfig | null>(null)
  const [configError, setConfigError] = useState<string | null>(null)
  const [runtimeReady, setRuntimeReady] = useState(false)
  const [rewardGrantedCount, setRewardGrantedCount] = useState(0)
  const [logEntries, setLogEntries] = useState<BridgeLogEntry[]>([])
  const configUrl = useMemo(() => withBasePath('unity/config.json'), [])

  const pushLog = useCallback(
    (
      direction: BridgeDirection,
      name: string,
      payload: Record<string, unknown> = {},
    ) => {
      setLogEntries((current) => [
        createLogEntry(direction, name, payload),
        ...current,
      ].slice(0, MAX_LOG_ENTRIES))
    },
    [],
  )

  const sendWrapperCommand = useCallback(
    (
      name: WrapperCommandName,
      payload: Record<string, unknown> = {},
    ) => {
      pushLog('Wrapper -> Unity', name, payload)
      window.dispatchEvent(
        new CustomEvent('cat-merge-cafe:wrapper-command', {
          detail: { name, payload },
        }),
      )
    },
    [pushLog],
  )

  const emitUnityEvent = useCallback(
    (
      name: UnityEventName,
      payload: Record<string, unknown> = {},
    ) => {
      if (name === 'unity:runtime-ready') {
        setRuntimeReady(true)
      }

      if (name === 'unity:runtime-stopped') {
        setRuntimeReady(false)
      }

      if (name === 'unity:reward-consumed' && payload.granted === true) {
        setRewardGrantedCount((count) => count + 1)
      }

      pushLog('Unity -> Wrapper', name, payload)
      window.dispatchEvent(
        new CustomEvent('cat-merge-cafe:unity-event', {
          detail: { name, payload },
        }),
      )
    },
    [pushLog],
  )

  const reloadConfig = useCallback(async () => {
    setConfigError(null)
    pushLog('System', 'wrapper:config-load-start', { url: configUrl })

    try {
      const response = await fetch(configUrl, { cache: 'no-store' })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const loadedConfig = normalizeBuildConfig(
        (await response.json()) as UnityBuildConfig,
        response.url,
      )
      setConfig(loadedConfig)
      pushLog('System', 'wrapper:config-load-complete', {
        product: loadedConfig.productName,
        attached: hasAttachedBuild(loadedConfig),
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown config load failure'
      setConfig(null)
      setConfigError(message)
      pushLog('System', 'wrapper:config-load-failed', { message })
    }
  }, [configUrl, pushLog])

  useEffect(() => {
    void reloadConfig()
  }, [reloadConfig])

  useEffect(() => {
    if (!config) {
      return
    }

    sendWrapperCommand('wrapper:boot-ready', {
      platform: config.platform,
      locale: navigator.language,
      canvasId: config.canvasId,
      buildVersion: config.buildVersion,
    })
  }, [config, sendWrapperCommand])

  useEffect(() => {
    const handleVisibilityChange = () => {
      sendWrapperCommand('wrapper:lifecycle-change', {
        state: document.visibilityState,
      })
    }

    const handleFocus = () => {
      sendWrapperCommand('wrapper:lifecycle-change', { state: 'focused' })
    }

    const handleBlur = () => {
      sendWrapperCommand('wrapper:lifecycle-change', { state: 'blurred' })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [sendWrapperCommand])

  const configAttached = useMemo(() => hasAttachedBuild(config), [config])

  useEffect(() => {
    window.CatMergeCafeWrapper = {
      emitUnityEvent,
      sendWrapperCommand,
      reloadConfig,
      getSnapshot: () => ({
        runtimeReady,
        configAttached,
        rewardGrantedCount,
      }),
    }

    return () => {
      delete window.CatMergeCafeWrapper
    }
  }, [
    configAttached,
    emitUnityEvent,
    reloadConfig,
    rewardGrantedCount,
    runtimeReady,
    sendWrapperCommand,
  ])

  return {
    config,
    configAttached,
    configError,
    emitUnityEvent,
    logEntries,
    reloadConfig,
    rewardGrantedCount,
    runtimeReady,
    sendWrapperCommand,
  }
}
