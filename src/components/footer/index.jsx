import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    const year=new Date().getFullYear()
    return (
        <div className=''>
            <footer class="flex-grow bg-gray-200 py-4 text-center">
                <a href="https://github.com/alwinantony29/beyond-us-hackathon-ST06-" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="text-gray-800 mx-2" size="lg" />
                </a>
                <p className='text-gray-500'>Made with ❤ by team ST-06 for beyond us hackathon 2023</p>
                <p className="text-gray-500">&copy; {year}  All rights reserved.</p>
            </footer>

        </div>
    )
}

export default Footer