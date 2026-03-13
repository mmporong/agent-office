export type WrapperCommandName =
  | 'wrapper:boot-ready'
  | 'wrapper:lifecycle-change'
  | 'wrapper:reward-result'
  | 'wrapper:request-save'

export type UnityEventName =
  | 'unity:runtime-ready'
  | 'unity:save-requested'
  | 'unity:interstitial-requested'
  | 'unity:reward-consumed'
  | 'unity:runtime-stopped'

export type BridgeDirection = 'Wrapper -> Unity' | 'Unity -> Wrapper' | 'System'

export interface UnityBuildConfig {
  productName: string
  companyName: string
  buildVersion: string
  platform: string
  canvasId: string
  loaderUrl: string
  dataUrl: string
  frameworkUrl: string
  codeUrl: string
  streamingAssetsUrl?: string
}

export interface BridgeEnvelope<TName extends string = string> {
  name: TName
  payload: Record<string, unknown>
}

export interface BridgeLogEntry {
  id: string
  timestamp: string
  direction: BridgeDirection
  name: string
  detail: string
}

export interface WrapperRuntimeSnapshot {
  runtimeReady: boolean
  configAttached: boolean
  rewardGrantedCount: number
}

export interface WrapperBridgeApi {
  emitUnityEvent: (
    name: UnityEventName,
    payload?: Record<string, unknown>,
  ) => void
  sendWrapperCommand: (
    name: WrapperCommandName,
    payload?: Record<string, unknown>,
  ) => void
  reloadConfig: () => Promise<void>
  getSnapshot: () => WrapperRuntimeSnapshot
}

declare global {
  interface Window {
    CatMergeCafeWrapper?: WrapperBridgeApi
    unityInstance?: {
      SendMessage?: (
        gameObjectName: string,
        methodName: string,
        parameter?: string,
      ) => void
    }
  }
}
