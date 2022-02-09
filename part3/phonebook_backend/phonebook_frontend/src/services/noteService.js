import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(responce => responce.data)
}

const create = (person) => {
    return axios.post(baseUrl, person).then(responce => responce.data)
}

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(responce => responce.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(responce => responce.data)
}

export default {getAll, create, update, remove}
