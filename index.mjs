'use strict'

import router  from './router.mjs'
import http    from 'http';
import fs      from 'fs/promises'
import pyramid from './pyramid.mjs';

const HOST = 'localhost'
const PORT = '3000'

const render = async () => {
    return await fs.readFile( 'pub/index.html', 'utf8' )
}

const buildPostParams = async ( req, callback ) => {
    let res = ""
    let ended = false ;
req.on( 'data', ( data ) => {
        res += data
    } )

    req.on( 'end', () => {
        ended = true
        res = JSON.parse( res )
        callback( res )
    } )
}

router.addRoute( '/', async ( _, res ) => {
    res.statusCode = 200
    res.setHeader( 'Content-Type', 'text/html' )
    res.end( await render() )
} )

router.addRoute( '/pyramid/get', async ( req, res ) => {
    buildPostParams( req, ( data ) => {
        const p = pyramid.get( data.length ) ;
        res.end( p.join( '\n' ) ) ;
    } )
} )

const server = http.createServer( ( req, res ) => { router.run( req, res ) } )

server.listen( PORT, HOST, () => {
    console.log( `listening on http://${ HOST }:${ PORT }/` )
} )
