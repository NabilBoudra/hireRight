
import './App.css'
import JobListingCard from './components/ui/jobListingCard'
import JobDescriptionCard from './components/ui/jobDescriptionCard'
import TopBar from './components/ui/TopBar'
import  getJobs from './api'
import { useEffect, useState } from 'react';
import SearchBar from './components/ui/SearchBar'


function App() {
  const [jobItems, setJobItems] = useState([]);
  const [selectedJobItem, setSelectedJobItem] = useState(null); 


  useEffect(() => {
    const fetchData = async () => { 
      const fetchedJobItems = await getJobs(); 
      setJobItems(fetchedJobItems); 
      setSelectedJobItem(fetchedJobItems[0]);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="border">
        <TopBar/>
         <div className="flex justify-center py-3">
            <SearchBar/>
          </div>
        <div className="flex h-full px-[20%]"> 
          <div className="w-1/3 mr-3">
            {jobItems.map(item => <JobListingCard jobItem={item}/>)}
          </div>
            {(selectedJobItem && <JobDescriptionCard jobItem={selectedJobItem} className="w-2/3 h-[97vh] sticky inset-y-5"/>)}
         </div>
      </div>
    </>
  )
}

export default App
