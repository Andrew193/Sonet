import axios from "axios";


function getPosts() {
    return axios.get("https://sonet34.herokuapp.com/api/post", { params: { howMany: 5 } })
        .then((response) => response.data)
        .catch((error) => {
            if (error) { 
                console.log(error);
            }
        })
}

function openFull(history,id) {
    history.push(`/posts/${id}`)
    window.location.reload()
}

const obj={ getPosts, openFull }

export default obj