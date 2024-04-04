import Link from 'next/link'
import React from 'react'
import './style.css'    

const Nav = () => {
    return (
        <div className='link-header'>
            <Link className='link' href="/randomjokes">1): Random-Jokes</Link>
            <Link className='link' href="/dictionary">2): Dictionary</Link>
            <Link className='link' href="/quote">3): Quote</Link>
            <Link className='link' href="/countryguide">4): Country-Guide</Link>
            <Link className='link' href="/pokemonguide">5): Pokemon-Card</Link>
            <Link className='link' href="/recipeapp">5): Recipe-App</Link>

        </div>
    )
}

export default Nav