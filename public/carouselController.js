import _ from 'lodash';
import uiModules from 'ui/modules';

const module = uiModules.get('kibana/kibana-time-plugin', ['kibana', 'ktp-ui.bootstrap.carousel', 'BootstrapAddons']);

  module.controller('KbnCarouselVisController', function (
        $scope, $rootScope, $element, $timeout, Private, courier, config, getAppState, indexPatterns, Notifier, $filter
    ) {
 

    const appState = getAppState();

    function updateVars(resp)
    {
        console.dir(resp);

        const source = new courier.SearchSource();
        const queryFilter = Private(require('ui/filter_bar/query_filter'));

        console.log("$scope aggs");
        console.dir($scope);
        console.log("Current Vis");
        console.dir($scope.vis);

        $scope.filter = queryFilter.getFilters()
        if (appState.query && !appState.linked) {
            $scope.query = appState.query
        }
        else {
            $scope.query = null
        }
        $scope.hits = resp.hits.total

        if ( $scope.hits > 0 ) {

            source.set('size', $scope.vis.params.maxSlides);
            source.set('filter', $scope.filter); // why not appState.filter?
            source.set('query', $scope.query);
            source.index($scope.vis.indexPattern);

            source.fetch().then(individualResultsHandler);
        }
    }
    
    function individualResultsHandler(results)
    {
    
        console.log("Wow... we got results");
        var hits = results.hits.hits
        console.dir(hits);

        $scope.results = []
        var fields = {}
        if ( $scope.vis.params.titleField )   fields['title'] = $scope.vis.params.titleField
        if ( $scope.vis.params.descField )    fields['desc'] = $scope.vis.params.descField
        if ( $scope.vis.params.contentField ) fields['content'] = $scope.vis.params.contentField

        for (var i = 0; i < hits.length; i++) {
            console.log("Loop over hits");
            var row = hits[i]._source
            console.dir(row)
            var temp = { 'type': $scope.vis.params.contentType }
            for (var key in fields) {
                temp[key] = row[fields[key]]
            }
            if ( temp.content ){

var xhr = new XMLHttpRequest();
xhr.open('HEAD', temp.content, false);
console.dir(xhr);
temp['mime-type'] = xhr.getResponseHeader("Content-Type")

            }
            $scope.results.push( temp )
        }

        console.dir($scope.results)
    
    }

    $scope.$watch('esResponse', function (resp) {
        console.log("Inside the esResponse watch")

        if(resp) updateVars(resp);

    });

    console.log("Hello World");

  });
