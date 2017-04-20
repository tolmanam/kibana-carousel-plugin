import _ from 'lodash';
import uiModules from 'ui/modules';

const module = uiModules.get('kibana/kibana-time-plugin', ['kibana', 'ktp-ui.bootstrap.carousel', 'BootstrapAddons']);

  module.controller('KbnCarouselVisController', function (
        $scope, $rootScope, $element, $timeout, Private, courier, config, getAppState, indexPatterns, Notifier, $filter
    ) {
 

    $scope.vis.savedAggs = $scope.vis.aggs;
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
        console.log("Current aggs");
        console.dir($scope.vis.aggs);

        $scope.filter = queryFilter.getFilters()
        if (appState.query && !appState.linked) {
            $scope.query = appState.query
        }
        else {
            $scope.query = null
        }
        $scope.hits = resp.hits.total

        if ( $scope.hits > 0 ) {

            console.log("I beleive this response is an aggregation query");

            source.set('size', 15);
            source.set('filter', $scope.filter); // why not appState.filter?
            source.set('query', $scope.query);
            source.index($scope.vis.indexPattern);

            $scope.vis.aggs = {
                getRequestAggs: function() { // called by courier.  We want to override the existing aggs temporarily
                             return [];
                },
                toDsl: function() { 
                            return {};
                }
            };
//             source.onResults(individualResultsHandler);
// 
             source.fetch().then(individualResultsHandler);
        }
        else {
            console.log("I beleive we have individual results");
            $scope.vis.aggs = $scope.vis.savedAggs;
        }
    }
    
    function individualResultsHandler(results)
    {
    
        $scope.vis.aggs = $scope.vis.savedAggs;

        console.log("Wow... we got results");
        console.dir(results);
    
    }

    $scope.$watch('esResponse', function (resp) {
        console.log("Inside the esResponse watch")

        if(resp) updateVars(resp);

    });

    console.log("Hello World");

  });
