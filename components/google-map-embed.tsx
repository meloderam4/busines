"use client"

import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface GoogleMapEmbedProps {
  latitude: number
  longitude: number
  businessName: string
}

// Extend Window interface to include google
declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMapEmbed({ latitude, longitude, businessName }: GoogleMapEmbedProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (mapRef.current && window.google && window.google.maps) {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        disableDefaultUI: true, // Disable default UI for a cleaner look
      }

      const map = new window.google.maps.Map(mapRef.current, mapOptions)

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: businessName,
      })
      setMapLoaded(true)
    } else {
      // Fallback if Google Maps API is not loaded yet
      const checkGoogleMaps = setInterval(() => {
        if (mapRef.current && window.google && window.google.maps) {
          clearInterval(checkGoogleMaps)
          const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
            disableDefaultUI: true,
          }
          const map = new window.google.maps.Map(mapRef.current, mapOptions)
          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: businessName,
          })
          setMapLoaded(true)
        }
      }, 100) // Check every 100ms
      return () => clearInterval(checkGoogleMaps)
    }
  }, [latitude, longitude, businessName])

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      {!mapLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <div ref={mapRef} className="w-full h-full" style={{ display: mapLoaded ? "block" : "none" }} />
    </div>
  )
}
