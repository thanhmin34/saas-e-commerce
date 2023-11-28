'use client'
import { useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Geo } from '@aws-amplify/geo'
import { DEFAULT_VALUE, ZOOM_LEVEL_LOCATION } from '@constants/map'
import { GeolocateResultEvent, MarkerDragEvent } from 'react-map-gl'

interface IViewPort {
  viewState: { latitude: number; longitude: number; zoom: number }
}
interface ICurrentAddress {
  currentAddress: {
    tempLatLng: {
      latitude: number
      longitude: number
    }
  }
}
export const useCheckoutAWSMap = (props: ICurrentAddress) => {
  const { currentAddress } = props || {}

  const {
    tempLatLng: { latitude, longitude },
  } = currentAddress

  const viewportState = useState({
    longitude: longitude === DEFAULT_VALUE.longitude ? DEFAULT_VALUE.longitude : longitude,
    latitude: latitude === DEFAULT_VALUE.latitude ? DEFAULT_VALUE.latitude : latitude,
    zoom: ZOOM_LEVEL_LOCATION,
  })

  const markerState = useState({
    longitude: longitude === DEFAULT_VALUE.longitude ? DEFAULT_VALUE.longitude : longitude,
    latitude: latitude === DEFAULT_VALUE.latitude ? DEFAULT_VALUE.latitude : latitude,
  })
  const [, setViewport] = viewportState
  const [, setMarkers] = markerState

  const updateViewPort = (viewport: IViewPort) => {
    const { viewState } = viewport
    const { longitude, latitude } = viewState
    setViewport({
      longitude,
      latitude,
      zoom: viewState.zoom,
    })
  }

  const onPickMarker = (e: mapboxgl.MapLayerMouseEvent | MarkerDragEvent) => {
    const { lngLat } = e
    const { lng, lat } = lngLat
    setMarkers({
      latitude: lat,
      longitude: lng,
    })
  }

  const onPickCurrentLocation = (e: GeolocateResultEvent) => {
    const { coords } = e
    const { latitude, longitude } = coords
    setMarkers({
      latitude,
      longitude,
    })
  }

  return {
    viewportState,
    markerState,
    updateViewPort,
    onPickMarker,
    onPickCurrentLocation,
  }
}
