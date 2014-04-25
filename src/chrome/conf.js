'use strict';

angular.module('ngGiaffer.conf', [])

.constant('conf', {
    api: {
        login  : '/api/login',
        logout : '/api/logout',
        expiry : '/api/expiry'
    }
})

.constant('defaults', {
        settings: {
            csstheme: 'readable',
            searchEngine: 'google',
            nbTerms: 2
        },
        interests: [
            {name:"Number theory", searchString:'"Number theory"|"prime numbers"|"nombres premiers"' },
            {name:"Oulipo", searchString:'"Oulipo"|"Queneau"|"Georges Perec"|"Jacques Roubaud"' },
            {name:"Monty Python", searchString:'"Monty Python"|"John Cleese"' },
            {name:"Borges", searchString:'"Borges"' },
            {name:"Bebop", searchString:'"bebop"|"Dizzy Gillespie"|"Charlie Parker"|"Thelonious Monk"|"John Coltrane"|"Mingus"' }
        ]
    });
