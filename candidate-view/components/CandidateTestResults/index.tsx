import React from 'react'

interface Props {
    overAllScore :string,
    jsScore? :string,
    reactScore? :string,
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const CandidateTestResults : React.FC<Props> = ({overAllScore, jsScore, reactScore}) => {
    return   <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Test Results</h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">Triple byte test results.</p>
    </div>
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">OverAll Score</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{overAllScore}</dd>
        </div>
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">JavaScript Score</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{jsScore}</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">React Score</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{reactScore}</dd>
        </div>
        {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Notes</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            where you can impove is your JS skills
          </dd>
        </div> */}
      </dl>
    </div>
  </div>
}

export default CandidateTestResults;
