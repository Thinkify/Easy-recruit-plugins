/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from '@heroicons/react/solid'

interface Props {
    contact :string,
    currentSalary :string,
     noticePeriod :string,
    expectedSalary :string,
    email :string,
    date :string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const CandidateDetailsView : React.FC<Props> = ({contact ,currentSalary, noticePeriod, expectedSalary,email, date}) => {
    return  <div className="lg:flex lg:items-center lg:justify-between">
    <div className="flex-1 min-w-0">
      {/* <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Back End Developer</h2> */}
      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          UI Dev
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Remote
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Current is {currentSalary}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <CurrencyDollarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Expected is {expectedSalary}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          {noticePeriod}
        </div>
      </div>
    </div>
    <div className="mt-5 flex lg:mt-0 lg:ml-4 justify-center align-baseline">
      <span className="hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          Edit
        </button>
      </span>
    </div>
  </div>
}

export default CandidateDetailsView;
