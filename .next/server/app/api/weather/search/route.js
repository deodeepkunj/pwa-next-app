/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/weather/search/route";
exports.ids = ["app/api/weather/search/route"];
exports.modules = {

/***/ "(rsc)/./app/api/weather/search/route.js":
/*!*****************************************!*\
  !*** ./app/api/weather/search/route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const query = searchParams.get(\"q\");\n    if (!query) {\n        return Response.json({\n            success: false,\n            error: \"Query parameter is required\"\n        });\n    }\n    try {\n        // Using a free weather API key - in production, you should use your own API key\n        const API_KEY = \"your_api_key_here\"; // Replace with your WeatherAPI.com key\n        const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API}&q=${encodeURIComponent(query)}`);\n        if (!response.ok) {\n            throw new Error(\"Failed to fetch location suggestions\");\n        }\n        const locations = await response.json();\n        return Response.json({\n            success: true,\n            locations: locations.slice(0, 5)\n        });\n    } catch (error) {\n        console.error(\"Search API error:\", error);\n        // Return mock data for demo purposes\n        const mockLocations = [\n            {\n                name: \"London\",\n                country: \"United Kingdom\"\n            },\n            {\n                name: \"New York\",\n                country: \"United States\"\n            },\n            {\n                name: \"Tokyo\",\n                country: \"Japan\"\n            },\n            {\n                name: \"Paris\",\n                country: \"France\"\n            },\n            {\n                name: \"Sydney\",\n                country: \"Australia\"\n            }\n        ].filter((location)=>location.name.toLowerCase().includes(query.toLowerCase()) || location.country.toLowerCase().includes(query.toLowerCase()));\n        return Response.json({\n            success: true,\n            locations: mockLocations\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3dlYXRoZXIvc2VhcmNoL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxlQUFlQSxJQUFJQyxPQUFPO0lBQy9CLE1BQU0sRUFBRUMsWUFBWSxFQUFFLEdBQUcsSUFBSUMsSUFBSUYsUUFBUUcsR0FBRztJQUM1QyxNQUFNQyxRQUFRSCxhQUFhSSxHQUFHLENBQUM7SUFFL0IsSUFBSSxDQUFDRCxPQUFPO1FBQ1YsT0FBT0UsU0FBU0MsSUFBSSxDQUFDO1lBQ25CQyxTQUFTO1lBQ1RDLE9BQU87UUFDVDtJQUNGO0lBRUEsSUFBSTtRQUNGLGdGQUFnRjtRQUNoRixNQUFNQyxVQUFVLHFCQUFxQix1Q0FBdUM7UUFDNUUsTUFBTUMsV0FBVyxNQUFNQyxNQUNyQixDQUFDLDZDQUE2QyxFQUFFQyxRQUFRQyxHQUFHLENBQUNDLFdBQVcsQ0FBQyxHQUFHLEVBQUVDLG1CQUFtQlosUUFBUTtRQUcxRyxJQUFJLENBQUNPLFNBQVNNLEVBQUUsRUFBRTtZQUNoQixNQUFNLElBQUlDLE1BQU07UUFDbEI7UUFFQSxNQUFNQyxZQUFZLE1BQU1SLFNBQVNKLElBQUk7UUFFckMsT0FBT0QsU0FBU0MsSUFBSSxDQUFDO1lBQ25CQyxTQUFTO1lBQ1RXLFdBQVdBLFVBQVVDLEtBQUssQ0FBQyxHQUFHO1FBQ2hDO0lBQ0YsRUFBRSxPQUFPWCxPQUFPO1FBQ2RZLFFBQVFaLEtBQUssQ0FBQyxxQkFBcUJBO1FBRW5DLHFDQUFxQztRQUNyQyxNQUFNYSxnQkFBZ0I7WUFDcEI7Z0JBQUVDLE1BQU07Z0JBQVVDLFNBQVM7WUFBaUI7WUFDNUM7Z0JBQUVELE1BQU07Z0JBQVlDLFNBQVM7WUFBZ0I7WUFDN0M7Z0JBQUVELE1BQU07Z0JBQVNDLFNBQVM7WUFBUTtZQUNsQztnQkFBRUQsTUFBTTtnQkFBU0MsU0FBUztZQUFTO1lBQ25DO2dCQUFFRCxNQUFNO2dCQUFVQyxTQUFTO1lBQVk7U0FDeEMsQ0FBQ0MsTUFBTSxDQUNOLENBQUNDLFdBQ0NBLFNBQVNILElBQUksQ0FBQ0ksV0FBVyxHQUFHQyxRQUFRLENBQUN4QixNQUFNdUIsV0FBVyxPQUN0REQsU0FBU0YsT0FBTyxDQUFDRyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ3hCLE1BQU11QixXQUFXO1FBRzdELE9BQU9yQixTQUFTQyxJQUFJLENBQUM7WUFDbkJDLFNBQVM7WUFDVFcsV0FBV0c7UUFDYjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW9kZWVwa3Vuai9Qcm9qZWN0cy9wd2EtcmVhY3QvYXBwL2FwaS93ZWF0aGVyL3NlYXJjaC9yb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3QpIHtcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuICBjb25zdCBxdWVyeSA9IHNlYXJjaFBhcmFtcy5nZXQoXCJxXCIpO1xuXG4gIGlmICghcXVlcnkpIHtcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7XG4gICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIGVycm9yOiBcIlF1ZXJ5IHBhcmFtZXRlciBpcyByZXF1aXJlZFwiLFxuICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBVc2luZyBhIGZyZWUgd2VhdGhlciBBUEkga2V5IC0gaW4gcHJvZHVjdGlvbiwgeW91IHNob3VsZCB1c2UgeW91ciBvd24gQVBJIGtleVxuICAgIGNvbnN0IEFQSV9LRVkgPSBcInlvdXJfYXBpX2tleV9oZXJlXCI7IC8vIFJlcGxhY2Ugd2l0aCB5b3VyIFdlYXRoZXJBUEkuY29tIGtleVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9zZWFyY2guanNvbj9rZXk9JHtwcm9jZXNzLmVudi5XRUFUSEVSX0FQSX0mcT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9YFxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggbG9jYXRpb24gc3VnZ2VzdGlvbnNcIik7XG4gICAgfVxuXG4gICAgY29uc3QgbG9jYXRpb25zID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgcmV0dXJuIFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGxvY2F0aW9uczogbG9jYXRpb25zLnNsaWNlKDAsIDUpLCAvLyBMaW1pdCB0byA1IHN1Z2dlc3Rpb25zXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlNlYXJjaCBBUEkgZXJyb3I6XCIsIGVycm9yKTtcblxuICAgIC8vIFJldHVybiBtb2NrIGRhdGEgZm9yIGRlbW8gcHVycG9zZXNcbiAgICBjb25zdCBtb2NrTG9jYXRpb25zID0gW1xuICAgICAgeyBuYW1lOiBcIkxvbmRvblwiLCBjb3VudHJ5OiBcIlVuaXRlZCBLaW5nZG9tXCIgfSxcbiAgICAgIHsgbmFtZTogXCJOZXcgWW9ya1wiLCBjb3VudHJ5OiBcIlVuaXRlZCBTdGF0ZXNcIiB9LFxuICAgICAgeyBuYW1lOiBcIlRva3lvXCIsIGNvdW50cnk6IFwiSmFwYW5cIiB9LFxuICAgICAgeyBuYW1lOiBcIlBhcmlzXCIsIGNvdW50cnk6IFwiRnJhbmNlXCIgfSxcbiAgICAgIHsgbmFtZTogXCJTeWRuZXlcIiwgY291bnRyeTogXCJBdXN0cmFsaWFcIiB9LFxuICAgIF0uZmlsdGVyKFxuICAgICAgKGxvY2F0aW9uKSA9PlxuICAgICAgICBsb2NhdGlvbi5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgbG9jYXRpb24uY291bnRyeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpXG4gICAgKTtcblxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBsb2NhdGlvbnM6IG1vY2tMb2NhdGlvbnMsXG4gICAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwicXVlcnkiLCJnZXQiLCJSZXNwb25zZSIsImpzb24iLCJzdWNjZXNzIiwiZXJyb3IiLCJBUElfS0VZIiwicmVzcG9uc2UiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJXRUFUSEVSX0FQSSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm9rIiwiRXJyb3IiLCJsb2NhdGlvbnMiLCJzbGljZSIsImNvbnNvbGUiLCJtb2NrTG9jYXRpb25zIiwibmFtZSIsImNvdW50cnkiLCJmaWx0ZXIiLCJsb2NhdGlvbiIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/weather/search/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fweather%2Fsearch%2Froute&page=%2Fapi%2Fweather%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fweather%2Fsearch%2Froute.js&appDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fweather%2Fsearch%2Froute&page=%2Fapi%2Fweather%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fweather%2Fsearch%2Froute.js&appDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_deodeepkunj_Projects_pwa_react_app_api_weather_search_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/weather/search/route.js */ \"(rsc)/./app/api/weather/search/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/weather/search/route\",\n        pathname: \"/api/weather/search\",\n        filename: \"route\",\n        bundlePath: \"app/api/weather/search/route\"\n    },\n    resolvedPagePath: \"/Users/deodeepkunj/Projects/pwa-react/app/api/weather/search/route.js\",\n    nextConfigOutput,\n    userland: _Users_deodeepkunj_Projects_pwa_react_app_api_weather_search_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ3ZWF0aGVyJTJGc2VhcmNoJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ3ZWF0aGVyJTJGc2VhcmNoJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGd2VhdGhlciUyRnNlYXJjaCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRmRlb2RlZXBrdW5qJTJGUHJvamVjdHMlMkZwd2EtcmVhY3QlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGZGVvZGVlcGt1bmolMkZQcm9qZWN0cyUyRnB3YS1yZWFjdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDcUI7QUFDbEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9kZW9kZWVwa3Vuai9Qcm9qZWN0cy9wd2EtcmVhY3QvYXBwL2FwaS93ZWF0aGVyL3NlYXJjaC9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvd2VhdGhlci9zZWFyY2gvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS93ZWF0aGVyL3NlYXJjaFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvd2VhdGhlci9zZWFyY2gvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZGVvZGVlcGt1bmovUHJvamVjdHMvcHdhLXJlYWN0L2FwcC9hcGkvd2VhdGhlci9zZWFyY2gvcm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fweather%2Fsearch%2Froute&page=%2Fapi%2Fweather%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fweather%2Fsearch%2Froute.js&appDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fweather%2Fsearch%2Froute&page=%2Fapi%2Fweather%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fweather%2Fsearch%2Froute.js&appDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fdeodeepkunj%2FProjects%2Fpwa-react&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();