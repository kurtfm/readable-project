export const UPDATE_MODAL_KEY = 'UPDATE_MODAL_KEY'

export function updateModalKey(key){
    return {
        type: UPDATE_MODAL_KEY,
        key
    }
}