export {isAdmin}

function isAdmin (user) {
    const userRoles = user.roles
    console.log(userRoles)
    if(userRoles === undefined || userRoles === null){
        return false
    }
    for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i].name === 'ROLE_ADMIN') {
            return true
        }
    }
    return false
}
