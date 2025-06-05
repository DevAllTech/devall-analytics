import axios from "axios"
import { getDeviceId } from "./utils/getDeviceId"

export enum DevAllEventType {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  LOG = "log",
  METRIC = "metric",
  CUSTOM = "custom",
}

export enum DevAllEnvironment {
  DEV = "dev",
  STAGING = "staging",
  PROD = "prod",
}

interface TrackEventOptions {
  type: DevAllEventType
  environment: DevAllEnvironment
  category: string
  message: string
  payload: Record<string, any>
  deviceInfo?: Record<string, any>
  timestamp?: string
}

let _projectToken: string | null = null

export function init(projectToken: string) {
  _projectToken = projectToken
}

export async function trackEvent(options: TrackEventOptions): Promise<void> {
  if (!_projectToken) throw new Error("DevAllAnalytics not initialized")

  const {
    type,
    environment,
    category,
    message,
    payload,
    deviceInfo,
    timestamp,
  } = options

  const body = {
    timestamp: timestamp || new Date().toISOString(),
    type,
    environment,
    category,
    message,
    payload,
    deviceId: getDeviceId(),
    deviceInfo: deviceInfo || {
      platform: typeof navigator !== "undefined" ? navigator.platform : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      locale: typeof navigator !== "undefined" ? navigator.language : "",
      isPhysicalDevice: true,
    },
  }

  await axios.post("https://api-logs.devalltech.com.br/api/v1/events", body, {
    headers: {
      "Content-Type": "application/json",
      "x-project-token": _projectToken,
    },
  })
}
