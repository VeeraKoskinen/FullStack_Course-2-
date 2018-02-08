import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const remove = (id) => {
    console.log("poistometodissa")
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
    console.log("päivitysmetodissa")
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }
