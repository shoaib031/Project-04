import Link from 'next/link'
import React from 'react'

const Nav = () => {
    return (
        <div>
            <Link href="/about">About</Link>
            <Link href="/product">Product</Link>
            <Link href="/contact">Conatact Us</Link>
        </div>
    )
}

export default Nav