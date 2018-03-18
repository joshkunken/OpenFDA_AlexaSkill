exports.handler = function( event, context ) {

    // Exercise for the reader: determine way to pass drug name as parameter to OpenFDA API below:
    var http = require( 'http' );
    var drug;  
    var url = 'https://api.fda.gov/drug/label.json?search=openfda.brand_name:';
    url+=drug;
  
    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            var text = 'According to the Open FDA database, side effects for ';
            text+=json.results.substance_name + ' include ';
            text+=json.results.warnings;
            output( text, context );

        } );

    } );

};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "OpenFDA SideEffectWarnings",
            content: text
        },
        shouldEndSession: true
    };

    context.succeed( { response: response } );

}
