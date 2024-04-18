module.exports.getPostcodeInfo = async function(postcode) {
    return fetch(`https://api.postcodes.io/postcodes/${postcode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response) {
                return response.json()
            } else {
                throw new Error('Network response was not ok. Try again later')
            }
        })
        .then((data) => {
            switch(data.status) {
                case 200:
                    return {
                        postcode,
                        country: data.result.country || '-',
                        latitude: data.result.latitude || '-',
                        longitude: data.result.longitude || '-',
                        adminDistrict: data.result.codes.admin_district || '-'
                    }
                case 400:
                    // Error message: 'No postcode query submitted. Remember to include query parameter'
                case 404:
                    // Error message: 'Resource not found'
                case 500:
                default:
                    if (data.error) {
                        throw new Error(data.error)
                    } else {
                        throw new Error('Network response was not ok. Try again later')
                    }
            }
        })
        .catch(error => {
            return {error}
        })
}