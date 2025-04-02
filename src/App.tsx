import { useEffect } from 'react'
import './App.css'
import AddressBlockContainer from './components/AddressBlockContainer'
import DisksContainer from './components/DiskContainer/DisksContainer'
import Tools from './components/UI/Tools'
import { useTools } from './contexts/ToolsContext'
import { generateRequests } from './utils/generateRequests'

const App = () =>{
  const { diskSplit, sectorSplit, trackSplit, requestCount, realTimeRequesProbabilityt, setRequests } = useTools()

  useEffect(() => {
    setRequests(generateRequests(requestCount, diskSplit * sectorSplit * trackSplit, diskSplit, sectorSplit, trackSplit, realTimeRequesProbabilityt).filter(el => el.diskIndex < diskSplit))
}, [requestCount, diskSplit, sectorSplit, trackSplit, realTimeRequesProbabilityt])

  return (
    <div className='app'>
        <div className='left-container'>
          <DisksContainer/>
        </div>
        <div className='right-container'>
          <header className='disks-header'>Disk Register</header>
          <Tools />
          {/* <AddressBlockContainer/> */}
        </div>
    </div>
  )
}

export default App
