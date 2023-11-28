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
      const currentUser: ICredentials = {
        identityId: 'eu-west-1:b982a556-aa60-4137-ad08-447f479ebd6a',
        accessKeyId: 'ASIAURUDXVQIT6MOWKX7',
        secretAccessKey: '2rVnDDZggRJcedIilvniSqh8u0AecsbB4cmkrFEi',
        sessionToken:
          'IQoJb3JpZ2luX2VjEEUaCWV1LXdlc3QtMSJHMEUCIC8ev+1CmXKrAgcWRaXzLutrw+24+icszp/sFueU8ZlPAiEAi0MZ9KDMpGZt+bb9MtYU1EZPkc5NAeCvEsPFHYyMCFYq1QUInv//////////ARAAGgwzMTI3MzUxNDkwNzMiDDFBoVAOSWgEwkaH5CqpBcvMxg3dBh4db+7hw9tvGQIw+BdlMgeZPUXeMJo6L03jzEmSh5chulyK3Ik3xL0Qi8Y61cIJcxHlrsOhycKTOc0IN5WdeddaMZGPWVucEjUnoZljdeMidf4idbEu/ziSKNmt79YDUKJ0Qp39OJ0h0cQZwRRD2rhkzCw3aiwyf5hv6obY7xEqQG68ajc7w4CQf8+D2EEpXr8R5hOHfqKaxE2PkC7c35Ouw4YP+g0ROBwl4GopVKTC/1jN5maaQB1+sWECkF5LmVQqkPxIWZjTCVQ/TvaGQH+ITPGPTUulvMgxLDHT1QSzyyxcUgY/ff/MOaisf1KcV1lu2z4Qr+bJV0LC+ejdNgKbYHk1TUFUwgVHlbq+M7MSKJ8an+nnJslK9Rbs9zL6pMq9YQCFJwwVm3deaudYI694+M52MLO9qPnU2FMbgyuzMnwzYRdZuoHvNQb/ryWOcFNUk54QK0kKQpqjMkqCRL3XNmHisduQ8a+tAejCfE+4Tq25shK0sGz9b8YbEzKSMHGql67b2G+YEkWdzj5cvfm0RtkrJCyKdDFiEnBny85J2GoaZ/3NKNL22eiFijud7Ov4D97/yFpsw4lPM/2Ae0a/S2i8dZr9N75aYIqiUVUaugmUc9AOYooNE3gvOzAGNN1RwTMx6T96LEyvJwIMGwVFJ1yR+tIV1xwzCtsNaFHkFdEW/ZBlxW4R0cNZtfggXBZ6KCdZ6avOXmD4ZsVU+G3zdCxrm++qwlMNlPnifz0jd/sIM83w4x4/lI9Ldq4kGyYuMdQx/JiTKJQx+LlHd2cGTimm8txvqJ0R5AG8FInGeX/VTBUOv4p/28pmtZex7xwqEi0nRrGoUB85T3WNnGq6j49xbTOX4qRSP0WZUQ7/bEnKJ4ufbjjPixDYJK/Il0O2ljDUwpCrBjraAnUS2QU1sQ49HuLEwB3iSk98MaHjhz4uY85Q7wHIRsJZBiOdgLFawqHjpe39TMR/zxElZygYZEoMidhgb+605xMovTZY+da1u48YpcMvcka0HlXJyoRLkFGjl+oJQVdo1wB88JSh1fCID5bUeD96Pa5S6dDPgGTvK8ZV/WcyNI8SLx+ncVuAhagvzfp6dmJ3SmlKDFni63FvXfu3L4HC3r6XXkItT/z0/jVKU0lGS58B9l0ZDz8ChOaU7Tu81rn0C3DRCAJbFFUAExIKLMB0YoDdOvRHEMJjnk7hRYYGVTwu2c7hGP1HdtD9VDMhNLkF9tDkrDhrYjpjZF3yxaQ+29DaQlaqNzYGn6QDGJU7ogatjAyD6/3HHnQSQqynxlJ91h77COSt03kyB/O1KKWo8l6jX1zWrv8oGCIUns6z1YTn98/eTwVk5D9vjo6PcGAMnE4SGs2Gt81y618=',
        expiration: new Date('2023-11-27T05:55:48.000Z'),
        authenticated: false,
      }
      setCredentials(currentUser)
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
