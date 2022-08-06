function redirect(hist, params, path) {
    hist.push({...hist.location, pathname: path, state: params })
}

const obj = { redirect }

export default obj;