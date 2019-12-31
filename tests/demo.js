const stops = [
    {
        id: 'Appleton, WI',
        load: 100,
        startTime: new Date('2019-05-01 5:00'),
        times: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        arriveBetween: [new Date('2019-05-01 6:00'), new Date('2019-05-01 7:00')],
        id: 'Madison, WI',
        load: -10,
        times: [1, 0, 5, 3, 5.5, 7, 7.5, 4, 14, 8.75],
    },
    {
        arriveBy: new Date('2019-05-02 6:00'),
        id: 'Grand Rapids, MI',
        load: 20,
        times: [5.5, 5, 0, 3, 4, 9.5, 6.5, 8.5, 11, 8],
    },
    {
        arriveBetween: [new Date('2019-05-01 8:00'), new Date('2019-05-01 10:00')],
        id: 'Chicago, IL',
        load: -10,
        times: [3.5, 2.5, 3, 0, 3, 7.5, 5.5, 6, 12, 7],
    },
    {
        arriveBy: new Date('2019-05-02 12:00'),
        id: 'Indianapolis, Indiana',
        load: -10,
        times: [6.5, 5.5, 4, 3, 0, 7, 3, 8.5, 11, 4],
    },
    {
        arriveBy: new Date('2019-05-03 12:00'),
        id: 'Kansas City, MO',
        load: -10,
        times: [8.5, 7, 9.5, 7.5, 7, 0, 8.5, 6, 18, 8],
    },
    {
        id: 'Lexington, KY',
        load: -10,
        times: [8.5, 7.5, 6.5, 5.5, 3, 8.5, 0, 11.5, 10.5, 3],
    },
    {
        id: 'Minneapolis, MN',
        load: -10,
        times: [4, 4, 8.5, 6, 8.5, 6, 11.5, 0, 18.5, 12.5],
    },
    {
        id: 'New York, NY',
        load: -10,
        times: [15, 14, 11, 12, 11, 18, 10.5, 18.5, 0, 13.3],
    },
    {
        id: 'Nashville, TN',
        load: -10,
        times: [9.75, 8.75, 8, 7, 4, 8, 3, 12.5, 13.3, 0],
    },
]

// Initialize and add the map
document.getElementById('optimalRoute').onclick = () => initMap(true)
document.getElementById('conditionalRoute').onclick = () => initMap(false)
function initMap(conditionalMap = false){
    console.time('Solution time')
    const result = tspwc.solve(stops, stops[0].startTime, 100, conditionalMap)
    console.timeEnd('Solution time')

    var usa = {lat: 39.8283, lng: -98.5795}
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: usa})
    directionsRenderer.setMap(map)

    // const latLngMap = {
    //     'Appleton, WI': {lat: 44.261799, lng: -88.407249},
    //     'Madison, WI': {lat: 43.073051, lng: -89.401230},
    //     'Grand Rapids, MI': {lat: 42.963360, lng: -85.668083},
    //     'Chicago, IL': {lat: 41.878113, lng: -87.629799},
    //     'Indianapolis, Indiana': {lat: 39.646270, lng: -86.831770},
    //     'Kansas City, MO': {lat: 39.099728, lng: -94.578568},
    //     'Lexington, KY': {lat: 38.040585, lng: -84.503716},
    //     'Minneapolis, MN': {lat: 44.977753, lng: -93.265015},
    //     'New York, NY': {lat: 40.712776, lng: -74.005974},
    //     'Nashville, TN': {lat: 36.162663, lng: -86.781601},
    // }
    // var markers = []
    // result[0].details.forEach((res) => {
    //     markers.push(new google.maps.Marker({position: latLngMap[res.to], map: map}))
    // })
    // markers.push(new google.maps.Marker({position: latLngMap[result[0].details[result[0].details.length-1].to], map: map}))
    var waypoints = []
    result[0].details.forEach((res, index) => {
        if (index !== 0) waypoints.push({location: res.from})
    })
    directionsService.route({
        origin: {query: 'Appleton, WI'},
        waypoints,
        destination: {query: 'Nashville, TN'},
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    })
    document.getElementById('results').innerHTML = JSON.stringify(result[0], null, 2)
}