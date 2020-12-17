import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

import RatingService from '../../../../services/rating.service'

const AdminPageCard = ({ name, image, status, id }) => {

    const [state, setState] = useState({ avgRating: undefined })
    const ratingService = new RatingService()

    useEffect(() => id && getAvgRate(), [])

    const getAvgRate = () => {
        ratingService
            .getUserRatings(id)
            .then(rates => {
                const avgRate = (rates.data.reduce((acc, elm) => acc + elm.value.valueOf(), 0)) / (rates.data.length)
                isNaN(parseFloat(avgRate.toFixed(2))) ? setState({ avgRating: 'No rating'}) : setState({ avgRating: `${parseFloat(avgRate.toFixed(2))} / 5`})
            })
            .catch(err => new Error('ERROR GETTING AVG RATES', err))
    }


    return (
        <Card style={{display: 'flex', flexDirection: 'row', marginBottom: '10px', padding: '10px', alignItems: 'center', textAlign: 'left'}}>
            <img src={image} alt={name} style={{objectFit: 'cover', width: '70px', height: '70px', marginRight: '10px', borderRadius: '3px'}}/>
            <article style={{width: '100%'}}>
                <Card.Title style={{ fontSize: '1.2rem', fontWeight: '300'}}>{name}</Card.Title>
                {status && <Card.Text style={{fontWeight: '300'}}>Status: <span style={status === 'available' ? { color: 'green'} : (status === 'sold' ? { color: 'red'} : { color: 'orange' })}>{status}</span></Card.Text>}
                {state.avgRating && <Card.Text style={{fontWeight: '300'}}>{state.avgRating}</Card.Text>}
            </article>
        </Card>
    )
}


export default AdminPageCard