import _ from 'lodash';
import uiModules from 'ui/modules';
const module = uiModules.get('kibana/kibana-time-plugin', ['kibana', 'ktp-ui.bootstrap.carousel', 'BootstrapAddons']);

  module.controller('KbnCarouselVisController', function (
    $scope, $rootScope, $element, $timeout, Private, courier, config, getAppState, indexPatterns
    ) {

    const queryFilter = Private(require('ui/filter_bar/query_filter'));

    if (!$scope.searchSource) {
        $scope.firstName = $scope.searchSource;
        // $scope.firstName = $scope.searchSource.get('index');
    }
    else {
        $scope.firstName = "unk";
    }
    $scope.lastName= "Doe";

    $scope.filter = queryFilter.getFilters()

    const appState = getAppState();
    if (appState.query && !appState.linked) {
        $scope.query = appState.query
    }

  });
