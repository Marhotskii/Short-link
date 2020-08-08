import React from 'react'
import { LinksPage } from '../pages/LinksPage'

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>

            <p>Short Link: <a href={link.to} target="+blank" rel="noopener noreferrer" >{link.to}</a></p>
            <p>from: <a href={link.from} target="+blank" rel="noopener noreferrer" >{link.from}</a></p>
            <p>The number of clicks on the link: <strong>{link.clicks}</strong></p>
        <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}