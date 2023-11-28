'use client'
import { use, useEffect, useMemo, useRef, useState } from 'react'
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'

//Constants

//Amplify
import { Signer } from '@aws-amplify/core'
import { Geo } from '@aws-amplify/geo'
import { Amplify, Auth } from 'aws-amplify'
import { ICredentials } from '@aws-amplify/core'
import 'mapbox-gl/dist/mapbox-gl.css'

//Hooks
const TOKEN_MAP_BOX = 'pk.eyJ1IjoidGhhbmhtaW4zNCIsImEiOiJjbDJ1NGNsMG4wYW8zM2lwMm8wdm9taHE2In0.zgLp06F_0sJvF-jPi5i1Eg'
import { get } from 'lodash'
import { DEFAULT_VALUE, ZOOM_LEVEL } from '@constants/map'
import awsmobile from '../../../../aws-exports'
import RoomIcon from '@mui/icons-material/Room'
import { imageUrls } from '@constants/imageUrls'
import { useCheckoutAWSMap } from '@hooks/useCheckoutAWSMap'
import styles from './styles.module.scss'
import Image from 'next/legacy/image'

Amplify.configure(awsmobile)

interface ICurrentAddress {
  tempLatLng: {
    latitude: number
    longitude: number
  }
}

/**
 * Sign requests made by Mapbox GL using AWS SigV4.
 */
const transformRequest = (credentials: ICredentials) => (url: string, resourceType: string) => {
  // Resolve to an AWS URL
  if (resourceType === 'Style' && !url?.includes('://')) {
    url = `https://maps.geo.${awsmobile.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`
  }

  // Only sign AWS requests (with the signature as part of the query string)
  if (url?.includes('amazonaws.com')) {
    return {
      url: Signer.signUrl(url, {
        access_key: credentials.accessKeyId,
        secret_key: credentials.secretAccessKey,
        session_token: credentials.sessionToken,
      }),
    }
  }

  // Don't sign
  return { url: url || '' }
}

const CheckoutAWSMap = ({ currentAddress }: { currentAddress: ICurrentAddress }) => {
  const [credentials, setCredentials] = useState<ICredentials | null>(null)

  const { viewportState, markerState, onPickMarker, updateViewPort, onPickCurrentLocation } = useCheckoutAWSMap({
    currentAddress,
  })
  const [viewport, setViewport] = viewportState

  const [markers] = markerState
  const mapRef = useRef(null)

  const mapName = useMemo(() => {
    return get(awsmobile, 'geo.amazon_location_service.maps.default')
  }, [awsmobile])

  useEffect(() => {
    const fetchCredentials = async () => {
      // const currentUser = Auth.currentUserCredentials()
      // currentUser.then((data: ICredentials) => {
      //   if (data) {
      //     setCredentials(data)
      //   }
      // })
    }

    fetchCredentials()
  }, [])

  useEffect(() => {
    const body = document.querySelector('body') as HTMLElement
    body.classList.remove('overflow-hidden')
  })

  useEffect(() => {
    if (
      markers.latitude &&
      markers.longitude &&
      markers.latitude !== DEFAULT_VALUE.latitude &&
      markers.longitude !== DEFAULT_VALUE.longitude
    ) {
      Geo.searchByCoordinates([markers.longitude, markers.latitude], { maxResults: 2 }).then((data) => {
        console.log('data', data)
      })
    }
  }, [markers])

  return (
    <div className={styles.map}>
      {credentials ? (
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          transformRequest={transformRequest(credentials)}
          mapStyle={mapName}
          onDrag={updateViewPort}
          onZoom={updateViewPort}
          onClick={onPickMarker}
          mapboxAccessToken={TOKEN_MAP_BOX}
        >
          <div style={{ position: 'absolute', left: 20, top: 20 }}>
            {/* react-map-gl v5 doesn't support dragging the compass to change bearing */}
            <NavigationControl showCompass={false} />
            <GeolocateControl
              trackUserLocation
              showAccuracyCircle={false}
              showUserLocation={false}
              onGeolocate={onPickCurrentLocation}
              fitBoundsOptions={{ maxZoom: ZOOM_LEVEL, zoom: ZOOM_LEVEL }}
            />
            <Marker
              longitude={markers.longitude}
              latitude={markers.latitude}
              anchor="center"
              draggable
              onDragEnd={onPickMarker}
              style={{ position: 'absolute' }}
            >
              <RoomIcon color="error" width={30} />
            </Marker>
          </div>
        </ReactMapGL>
      ) : (
        <Image
          src={imageUrls.loading}
          layout="fixed"
          className={styles.loading}
          width={100}
          height={100}
          alt="loading"
          priority={true}
        />
      )}
    </div>
  )
}

export default CheckoutAWSMap
