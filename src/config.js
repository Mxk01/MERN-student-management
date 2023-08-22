export const bearerConfig = {
    headers : {'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('student')).data.token}`}

}