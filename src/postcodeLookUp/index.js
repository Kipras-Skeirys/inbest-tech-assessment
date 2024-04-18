import { useState } from 'react'
import HistoryList from './HistoryList'
import { getPostcodeInfo } from '../api/postcodesIoAPI'

function PostcodeLookUp() {

    const [ cleanedUpInputValue, setCleanedUpInputValue ] = useState('')
    const [ inputValue, setInputValue ] = useState('')
    const [ isPostCodeValid, setIsPostCodeValid ] = useState(false)
    const [ error, setError ] = useState()
    const [ country, setCountry ] = useState()
    const [ latitude, setLatitude ] = useState()
    const [ longitude, setLongitude ] = useState()
    const [ adminDistrict, setAdminDistrict ] = useState()
    const [ lookupHistory, setLookupHistory ] = useState(JSON.parse(localStorage.getItem('lookupHistory')) || null)

    function updateLookupHistoryList(newData) {
        setLookupHistory((prev) => {
            let data
            const timestampedData = { ...newData, t: Date.now() }
            if (prev) {
                // Keep history up to 50 unique postcode data
                // After that remove oldest/add newest
                if (prev.length >= 50) prev.pop()

                data = [timestampedData, ...prev]
            } else {
                data = [timestampedData]
            }
            localStorage.setItem('lookupHistory', JSON.stringify(data))
            return data
        })
    }

    function updatePostcodeData(data) {
        setInputValue(data.postcode)
        setCleanedUpInputValue(data.postcode)
        setIsPostCodeValid(true)
        setError(null)

        setCountry(data.country)
        setLatitude(data.latitude)
        setLongitude(data.longitude)
        setAdminDistrict(data.adminDistrict)
    }

    function handleInputChange(e) {
        const inputValueCleanedUp = e.target.value.split(' ').join('').toUpperCase()
        setInputValue(e.target.value)
        setCleanedUpInputValue(inputValueCleanedUp)
        // Regexp string from: wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Validation
        setIsPostCodeValid(new RegExp('^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$').test(inputValueCleanedUp))
        setError(null)
        
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setInputValue(cleanedUpInputValue)
        // Check if data exists in history
        // If yes, get data from history without API call
        let lookupData = lookupHistory ? lookupHistory.find((obj) => obj.postcode === cleanedUpInputValue) : null
        if (!lookupData) {
            lookupData = await getPostcodeInfo(cleanedUpInputValue)
        }
        if (!lookupData.error) {
            updatePostcodeData(lookupData)
            updateLookupHistoryList(lookupData)
        } else {
            setError(lookupData.error.message)
        }
    }

    return (
        <div className='PostCodeLookUp'>
            <h1 className='text-xl sm:text-3xl font-bold'>Look up information about your postcode </h1>
            <span className='mt-2 inline-block'>Input your postcode to quickly find relevant information about your postcode.</span>
            <div className='bg-white rounded-sm shadow-custom mt-4 p-5'>
                <div>
                    <h2 className='text-xl font-bold mt-2'>Your postcode</h2>
                    <span className='mt-2 inline-block'>Ender your postal code to get information based on your location.</span>
                    <form className='my-5' onSubmit={ (e) => handleSubmit(e) }>
                        <div className='flex flex-nowrap'>
                            <input className='w-full max-w-44 h-9 pl-2 border rounded-l border-solid border-darkerGray' placeholder='EH10 5DT' value={ inputValue } onChange={ (e) => handleInputChange(e) }/>
                            <button className={`flex-shrink-0 h-9 border rounded-r border-solid -ml-px w-20 border-darkerGray disabled:text-darkerGray disabled:cursor-not-allowed ${isPostCodeValid ? 'hover:bg-inbestYellow hover:border-inbestAccentYellow hover:text-white' : ''}`} disabled={ !isPostCodeValid }>Submit</button>
                        </div>
                        { error ? <span className='text-red'>{error}</span> : null }
                    </form>
                    
                </div>

                { country ? 
                    <div className='flex flex-wrap'>
                        <div className='flex flex-col mr-4'>
                            <span>Country:</span>
                            <span className='font-bold'>{country}</span>
                        </div>
                        <div className='flex flex-col mr-4'>
                            <span>Latitude:</span>
                            <span className='font-bold'>{latitude}</span>
                        </div>
                        <div className='flex flex-col mr-4'>
                            <span>Longitude:</span>
                            <span className='font-bold'>{longitude}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>admin_district:</span>
                            <span className='font-bold'>{adminDistrict}</span>
                        </div>
                    </div>
                    :
                    null
                }

            </div>

            { lookupHistory && lookupHistory.length ?
                <div className='bg-white rounded-sm shadow-custom my-4 p-5'>
                    <div>
                        <h2 className='text-xl font-bold my-2'>Lookup history</h2>
                        <HistoryList
                            lookupHistory={lookupHistory}
                            setLookupHistory={setLookupHistory}
                            updatePostcodeData={updatePostcodeData}
                        />
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}

export default PostcodeLookUp