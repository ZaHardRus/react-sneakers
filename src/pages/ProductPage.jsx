import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import {ProductItem} from "../components/ProductItem/ProductItem";

export const ProductPage = () => {
    const id = useLocation().pathname.slice(1)
    const [item, setItem] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {push} = useHistory()
    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://613631038700c50017ef5490.mockapi.io/products/${id}`)
            .then(res => setItem(res.data))
            .finally(() => setIsLoading(false))
    }, [])
    return (
        <ProductItem title={item.name} image={item.imageUrl} redirect={() => push('/')} loading={isLoading} description={item.description}/>
    )
}