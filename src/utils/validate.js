/**
 * 校验用户名
 *
 * @param username
 * @returns {boolean}
 */
export function validUsername(username) {
    return ['admin', 'editor'].indexOf(username.trim()) !== -1
}
