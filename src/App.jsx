import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeScene from './components/ThreeScene'
import DeckGLMap from './components/DeckGLMap'
import D3Chart from './components/D3Chart'
import DataLoader from './components/DataLoader'



function App() {
  const [data, setData] = useState(null)

  return (
    <>
      <h1>Interactive World Bank Data Visualization</h1>
      <DataLoader onDataLoaded={setData} />
      {data && <D3Chart data={data} />}
    </>
  )
}

export default App


// import { useState } from 'react';
// import DataLoader from './components/DataLoader';
// import D3Chart from './components/D3Chart';
// import DeckGLMap from './components/DeckGLMap';
// import SidePanel from './components/SidePanel';
// import './App.css';

// function App() {
//   const [data, setData] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const handleCountryHover = (country) => {
//     setSelectedCountry(country);
//   };

//   const handleCountryClick = (country) => {
//     setSelectedCountry(country);
//   };

//   const handleClosePanel = () => {
//     setSelectedCountry(null);
//   };

//   return (
//     <>
//       <h1>Interactive World Bank Data Visualization</h1>
//       <DataLoader onDataLoaded={setData} />
//       {data && (
//         <>
//           <D3Chart data={data} onHover={handleCountryHover} onClick={handleCountryClick} />
//           <DeckGLMap data={data} onHover={handleCountryHover} onClick={handleCountryClick} />
//         </>
//       )}
//       {selectedCountry && (
//         <SidePanel country={selectedCountry} onClose={handleClosePanel} />
//       )}
//     </>
//   );
// }

// export default App;


// import { useState } from 'react'
// import DataLoader from './components/DataLoader'
// import D3Chart from './components/D3Chart'
// import DeckGLMap from './components/DeckGLMap'
// import SidePanel from './components/SidePanel'
// import './App.css'

// function App() {
//   const [data, setData] = useState(null)
//   const [selectedCountry, setSelectedCountry] = useState(null)

//   const handleCountryHover = (country) => {
//     setSelectedCountry(country)
//   }

//   const handleCountryClick = (country) => {
//     setSelectedCountry(country)
//   }

//   const handleClosePanel = () => {
//     setSelectedCountry(null)
//   }

//   return (
//     <>
//       <h1>Interactive World Bank Data Visualization</h1>
//       <DataLoader onDataLoaded={setData} />
//       {data && (
//         <>
//           <D3Chart
//             data={data}
//             onHover={handleCountryHover}
//             onClick={handleCountryClick}
//           />
//           <DeckGLMap
//             data={data}
//             onHover={handleCountryHover}
//             onClick={handleCountryClick}
//           />
//         </>
//       )}
//       {selectedCountry && (
//         <SidePanel country={selectedCountry} onClose={handleClosePanel} />
//       )}
//     </>
//   )
// }

// export default App

