
import JobListingCard from './components/ui/jobListingCard'
import JobDescriptionCard from './components/ui/jobDescriptionCard'
import TopBar from './components/ui/TopBar'
import { SetStateAction, useEffect, useState } from 'react';
import SearchBar from './components/ui/SearchBar'
import { Job } from './utils/types'
import { isMatch } from './utils/helpers'
import api from './api'
import { Toaster } from './components/ui/toaster';
import { useMsal } from '@azure/msal-react';

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [selectedJobItem, setSelectedJobItem] = useState<Job | null>(null); 
  const [searchString, setSearchString] = useState<String>("");
  const { accounts } = useMsal();

  console.log(jobItems); 

  useEffect(() => {
    const fetchData = async () => { 
      try { 
        const fetchedJobItems = await api.get('/jobs'); 
        console.log(fetchedJobItems);
        setJobItems(fetchedJobItems); 
        setSelectedJobItem(fetchedJobItems[0]);
      }
      catch(error) { 
          console.log(error); 
      }
    };
    fetchData();
  }, [accounts]);

  const handleSearchBarChange = (event: { target: { value: SetStateAction<String> } }) => {
    setSearchString(event.target.value);
  }

  const createHandleCardClick = (job: Job) => { 
    const handleCardClick = () => { 
      setSelectedJobItem(job); 
    };
    return handleCardClick; 
  }

  return (
    <>
      <div className="border">
        <TopBar/>
         <div className="flex justify-center py-3">
            <SearchBar searchString={searchString} onChange={handleSearchBarChange}/>
          </div>
        <div className="flex h-full px-[20%]"> 
          <div className="w-1/3 mr-3" >
            {jobItems.filter(item => isMatch(item, searchString))
                     .map(item => <div onClick={createHandleCardClick(item)}>
                                      <JobListingCard jobItem={item}/>
                                  </div>
                          )
            }
          </div>
            {(selectedJobItem && <JobDescriptionCard jobItem={selectedJobItem} className="w-2/3 h-[97vh] sticky inset-y-5"/>)}
         </div>
      </div>
      <Toaster/>
    </>
  )
}

export default App
