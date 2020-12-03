let BASE_URL = 'http://localhost/api' || 'http://10.10.10.10/api'
if (process.env.NODE_ENV === "production"){
    BASE_URL = '/api'
}

export { BASE_URL }


export const userRole = {
    ROLE_USER: 'ROLE_USER',
    ROLE_AGENT: 'ROLE_MODER',
    ROLE_ADMIN: 'ROLE_ADMIN',
}
