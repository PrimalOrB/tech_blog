const { expect, test } = require('@jest/globals');
const { 
    format_date,
    format_plural,
    if_equals
 } = require( '../utils/helpers' );

test( 'format_date() returns a date string', () => {
    const date = new Date('2021-05-21 20:33:02');

    expect( format_date( date )).toBe( '5/21/2021' )
})

test ('check format_plural() to return plural string', () => {
    const word = 'comment'
    const number = 2

    expect( format_plural( word, number ) ).toBe( 'comments' )
})

test ('check if_equals to return compative opeartor result', () => {
    const word = 'comment'
    const number = 2

    expect( if_equals( 1, 1, ">" ) ).toBeFalsy()
    expect( if_equals( 1, 1, "===" ) ).toBeTruthy()
})
