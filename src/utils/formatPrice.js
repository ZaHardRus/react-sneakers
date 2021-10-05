export const formatPrice = (price) => {
    return new Intl.NumberFormat('RU-ru').format(price)
}