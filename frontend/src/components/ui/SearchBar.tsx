import { SetStateAction } from "react"
import { Input } from "./input"
import { Search } from 'lucide-react'

export default function SearchBar({searchString, onChange} : {searchString: String, onChange: (event: { target: { value: SetStateAction<String> } }) => void}) {
  return (
    <div className="relative w-[25%]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="search"
        placeholder="Search..."
        className="rounded-full pl-10 pr-4"
        value={searchString?.toString()}
        onChange={onChange}
      />
    </div>
  )
}