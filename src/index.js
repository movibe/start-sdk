(function () {
    'use strict';
    angular
        .module('govivant.sdk', [
            'lbServices',
            'angularFileUpload',
            'stripe.checkout',
            'credit-cards',
            'angular-stripe',
            'ls.LiveSet',
            'ls.ChangeStream',
            'ngFileUpload',
            'ngResource'
        ])
        .provider('govivantSdk', function () {

            var GO_ENV    = window.GO_ENV || 'production';
            var GO_CLIENT = window.GO_CLIENT || 'web';

            // Environments
            var ENV_DEV   = GO_ENV === 'development';
            var ENV_PROD  = GO_ENV === 'production';
            var ENV_LOCAL = GO_ENV === 'local';
            var ENV_TEST  = GO_ENV === 'test';

            // API
            var API = {
                production: 'https://api.govivant.com',
                development: 'https://api-dev.govivant.com',
                localHttp: 'http://localhost:5000',
                localHttps: 'https://localhost:5001',
                test: 'https://api-dev.govivant.com',
            };

            var config = {
                ENV: GO_ENV,
                CLIENT: GO_CLIENT,
                SUB_CLIENT: null,
                ENV_DEV: ENV_DEV,
                ENV_PROD: ENV_PROD,
                ENV_LOCAL: ENV_LOCAL,
                ENV_TEST: ENV_TEST,
                HOST: API[GO_ENV],
                API: API[GO_ENV],
                useAuthHeader: false, //send auth token as query string, or header, defaults to query strin
                setSubclient: setSubclient,
                setVersion: setVersion
            };

            console.log(config);

            function setEnv(env) {
                var api = API[env];
                if (!api) throw new Error('Enviroment : ' + env + ' is not valid');

                config.ENV       = env;
                config.ENV_DEV   = (env === 'development');
                config.ENV_PROD  = (env === 'production');
                config.ENV_LOCAL = (env === 'local');
                config.ENV_TEST  = (env === 'test');
                config.HOST      = api;
                config.API       = api + '/api';
            }

            function setSubclient(subclient) {
                config.SUB_CLIENT = subclient;
            }

            function setVersion(version) {
                config.VERSION = version;
            }

            function setUseAuthHeader(useAuthHeader) {
                config.useAuthHeader = useAuthHeader || false;
            }

            function setApiUrl(apiUrl) {
                config.API = apiUrl;
            }

            return {
                setEnv: setEnv,
                setSubclient: setSubclient,
                setVersion: setVersion,
                setUseAuthHeader: setUseAuthHeader,
                setApiUrl: setApiUrl,
                ENV: config,

                // needed for Provider
                $get: function () {
                    return config;
                }

            };

        })

        .service('GovivantConfig', function (govivantSdk) {
            return govivantSdk
        });

})();