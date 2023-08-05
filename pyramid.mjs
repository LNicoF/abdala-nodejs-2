'use strict'

/** @param { number } length */
export const get = ( length ) => {
    let res = []
    for ( let i = 0 ; i < length ; ++i ) {
        const row =  ' '.repeat( length - ( i + 1 ) )
            + '*' + 'o*'.repeat( i )
        res.push( row )
    }
    return res ;
}

export default { get }
