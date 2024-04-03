import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <div>
            <Link href="/randomjokes">random-jokes</Link>
            <Link href="/dictionary">Dictionary</Link>
            <Link href="/quote">quote</Link>
        </div>
    )
}

export default Nav