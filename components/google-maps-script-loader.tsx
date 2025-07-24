"use client"

import { useEffect, useState } from "react"

// Extend Window interface to include google
declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMapsScriptLoader() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch("/api/google-maps-api-key")
        const data = await response.json()
        if (response.ok) {
          setApiKey(data.apiKey)
        } else {
          console.error("Failed to fetch Google Maps API key:", data.error)
        }
      } catch (error) {
        console.error("Error fetching Google Maps API key:", error)
      }
    }

    if (!apiKey) {
      fetchApiKey()
    }
  }, [apiKey]) // Re-run if apiKey becomes null (e.g., after an error)

  useEffect(() => {
    if (apiKey && !scriptLoaded && (!window.google || !window.google.maps)) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setScriptLoaded(true) // Mark script as loaded
      script.onerror = (e) => console.error("Google Maps script failed to load:", e)
      document.head.appendChild(script)

      return () => {
        // Clean up the script when the component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [apiKey, scriptLoaded])

  return null // This component doesn't render anything visible
}
