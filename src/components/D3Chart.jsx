import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import worldData from '../assets/countries.geo.json' // GeoJSON file path
import SidePanel from './SidePanel' // Import SidePanel

const D3Chart = ({ data, onHover }) => {
  const svgRef = useRef()
  const [geoData, setGeoData] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setGeoData(worldData)
  }, [])

  useEffect(() => {
    if (geoData) {
      drawMap()
    }
  }, [geoData, data])

  const drawMap = () => {
    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 400

    const projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5])
    const path = d3.geoPath().projection(projection)

    const colorScale = d3
      .scaleSequential()
      .domain([3, 10]) // Adjust based on your data range
      .interpolator(d3.interpolateBlues)

    svg
      .selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => {
        const countryCode = d.properties.name
        const countryData = data.find(
          (country) => country['Country Name'] === countryCode
        )
        return countryData
          ? colorScale(
              countryData[
                'Unemployment, total (% of total labor force) (modeled ILO estimate)'
              ]
            )
          : '#ccc'
      })
      .attr('stroke', '#333')
      .attr('stroke-width', 0.5)
      .on('mouseover', function (event, d) {
        d3.select(this).attr('stroke-width', 1.5)
        //         onHover(d)
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke-width', 0.5)
        //         onHover(null)
      })
      .on('click', function (event, d) {
        const countryCode = d.properties.name
        const countryData = data.find(
          (country) => country['Country Name'] === countryCode
        )
        setSelectedCountry(countryData || null)
      })
      .append('title')
      .text((d) => {
        const countryData = data.find(
          (country) => country['Country Name'] === d.properties.name
        )
        return countryData
          ? countryData['Country Name'] +
              ' : ' +
              countryData[
                'Unemployment, total (% of total labor force) (modeled ILO estimate)'
              ]
          : 'No data'
      })
  }

  const handleClosePanel = () => {
    setSelectedCountry(null)
  }

  return (
    <div>
      <svg ref={svgRef} width={800} height={400}></svg>
      {selectedCountry && (
        <SidePanel country={selectedCountry} onClose={handleClosePanel} />
      )}
    </div>
  )
}

export default D3Chart

//old code

// import React, { useEffect, useRef, useState } from 'react'
// import * as d3 from 'd3'
// import worldData from '../assets/countries.geo.json' // GeoJSON file path
// import SidePanel from './SidePanel' // Import SidePanel

// const D3Chart = ({ data, onHover }) => {
//   const svgRef = useRef()
//   const [geoData, setGeoData] = useState(null)
//   const [selectedCountry, setSelectedCountry] = useState(null)

//   useEffect(() => {
//     setGeoData(worldData)
//   }, [])

//   useEffect(() => {
//     if (geoData) {
//       drawMap()
//     }
//   }, [geoData, data])

//   const drawMap = () => {
//     const svg = d3.select(svgRef.current)
//     const width = 800
//     const height = 400

//     const projection = d3
//       .geoMercator()
//       .scale(130)
//       .translate([width / 2, height / 1.5])
//     const path = d3.geoPath().projection(projection)

//     const colorScale = d3
//       .scaleSequential()
//       .domain([3, 10]) // Adjust based on your data range
//       .interpolator(d3.interpolateBlues)

//     svg
//       .selectAll('path')
//       .data(geoData.features)
//       .join('path')
//       .attr('d', path)
//       .attr('fill', (d) => {
//         const countryCode = d.properties.name
//         const countryData = data.find(
//           (country) => country['Country Name'] === countryCode
//         )
//         return countryData
//           ? colorScale(
//               countryData[
//                 'Unemployment, total (% of total labor force) (modeled ILO estimate)'
//               ]
//             )
//           : '#ccc'
//       })
//       .attr('stroke', '#333')
//       .attr('stroke-width', 0.5)
//       .on('mouseover', function (event, d) {
//         d3.select(this).attr('stroke-width', 1.5);
// //         onHover(d)
//       })
//       .on('mouseout', function () {
//         d3.select(this).attr('stroke-width', 0.5);
// //         onHover(null)
//       })
//       .on('click', function (event, d) {
//         const countryCode = d.properties.name
//         const countryData = data.find(
//           (country) => country['Country Name'] === countryCode
//         )
//         setSelectedCountry(countryData || null)
//       })
//       .append('title')
//       .text((d) => {
//         const countryData = data.find(
//           (country) => country['Country Name'] === d.properties.name
//         )
//         return countryData
//           ? countryData['Country Name'] +
//               ' : ' +
//               countryData[
//                 'Unemployment, total (% of total labor force) (modeled ILO estimate)'
//               ]
//           : 'No data'
//       })
//   }

//   const handleClosePanel = () => {
//     setSelectedCountry(null)
//   }

//   return (
//     <div>
//       <svg ref={svgRef} width={800} height={400}></svg>
//       {selectedCountry && (
//         <SidePanel country={selectedCountry} onClose={handleClosePanel} />
//       )}
//     </div>
//   )
// }

// export default D3Chart
