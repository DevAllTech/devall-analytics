import { v4 as uuidv4 } from "uuid"

const DEVICE_ID_KEY = "devall_device_id"

let _cachedDeviceId: string | null = null

export async function getDeviceId(): Promise<string> {
  if (_cachedDeviceId) return _cachedDeviceId

  const env = detectEnvironment()

  switch (env) {
    case "react-native":
      return getDeviceIdNative()
    case "browser":
      return getDeviceIdBrowser()
    case "node":
    default:
      return getDeviceIdNode()
  }
}

function detectEnvironment(): "react-native" | "browser" | "node" {
  // React Native
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return "react-native"
  }

  // Browser
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return "browser"
  }

  return "node"
}

async function getDeviceIdBrowser(): Promise<string> {
  const stored = localStorage.getItem(DEVICE_ID_KEY)
  if (stored) {
    _cachedDeviceId = stored
    return stored
  }

  const id = uuidv4()
  _cachedDeviceId = id
  localStorage.setItem(DEVICE_ID_KEY, id)
  return id
}

async function getDeviceIdNative(): Promise<string> {
  try {
    const AsyncStorage = await import(
      "@react-native-async-storage/async-storage"
    )
    const stored = await AsyncStorage.default.getItem(DEVICE_ID_KEY)
    if (stored) {
      _cachedDeviceId = stored
      return stored
    }

    const id = uuidv4()
    _cachedDeviceId = id
    await AsyncStorage.default.setItem(DEVICE_ID_KEY, id)
    return id
  } catch (error) {
    console.warn("Erro ao acessar AsyncStorage", error)
    return uuidv4()
  }
}

function getDeviceIdNode(): string {
  const fs = require("fs")
  const path = require("path")
  const filePath = path.resolve(__dirname, ".devall-device-id")
  try {
    if (fs.existsSync(filePath)) {
      const storedId = fs.readFileSync(filePath, "utf8").trim()
      _cachedDeviceId = storedId
      return storedId
    } else {
      const newId = uuidv4()
      fs.writeFileSync(filePath, newId)
      _cachedDeviceId = newId
      return newId
    }
  } catch (error) {
    console.error("Erro ao lidar com deviceId no Node.js:", error)
    const fallback = uuidv4()
    _cachedDeviceId = fallback
    return fallback
  }
}
