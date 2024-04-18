import { useState } from 'react'

function HisotoryList(props) {
    
    const lookupHistory = props.lookupHistory
    const setLookupHistory = props.setLookupHistory
    const updatePostcodeData = props.updatePostcodeData

    const [ lookupHistoryLoadCount, setCookupHistoryLoadCount ] = useState(10)

    function handleChange(e, elem) {
        updatePostcodeData(elem)
    }

    function handleDelete(e, i) {
        setLookupHistory((prev) => {
            let data = [...prev]
            data.splice(i, 1)
            localStorage.setItem('lookupHistory', JSON.stringify(data))
            return data
        })
    }

    function handleLoadMoreLookupHistory() {
        setCookupHistoryLoadCount((prev) => {
            return prev + 10
        })
    }

    function makeLookupHistoryList(lookupHistory) {
        return [...lookupHistory].slice(0, lookupHistoryLoadCount).map((elem, i) => (
            <div className='relative h-9 w-31 border rounded border-solid border-darkerGray' key={elem.t}>
                <input id='customRadioInput' className='absolute w-full h-full top-0 left-0 cursor-pointer appearance-none' type={'radio'} name={'postCode'} value={elem.postcode} onChange={(e) => handleChange(e, elem)}/>
                <div className='h-full flex items-center'>
                    <span className='relative z-10 pointer-events-none ml-2'>{elem.postcode}</span>
                    <div className='flex z-10 justify-center items-center h-5 w-5 mx-2 hover:bg-darkerGray cursor-pointer rounded' onClick={(e) => handleDelete(e, i)}>
                        <svg className='h-3 fill-black' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className='HistoryList flex'>
            <div className='flex flex-wrap justify-center gap-2'>
                { makeLookupHistoryList(lookupHistory) }
                { lookupHistory.length > lookupHistoryLoadCount ? <button className='w-32 underline' onClick={handleLoadMoreLookupHistory}>Load more...</button> : null}
            </div>
        </div>
    )
}

export default HisotoryList