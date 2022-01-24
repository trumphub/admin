/**
 * 校验用户名
 *
 * @param username
 * @returns {boolean}
 */
export function validUsername(username) {
    return !!username.trim().length
}
