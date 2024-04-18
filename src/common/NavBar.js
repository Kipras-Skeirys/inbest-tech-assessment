import logoSvg from '../assets/inbest-tech-assessment-logo.svg'

function NavBar() {
    return (
        <div className='bg-white shadow-custom fixed top-0 flex justify-between h-12 sm:h-16 min-w-full '>
            <div className='flex items-center ml-2'>
                <img src={logoSvg} alt="Logo" className='h-8 sm:h-12'/>
            </div>
        </div>
    )
}

export default NavBar