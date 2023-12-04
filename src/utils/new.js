{
    "config": {
        "adapter": ["xhr", "http"],
        "baseURL": "http://192.168.0.105:8080/api/v1/client",
        "data": "{\"header\":{\"content-type\":\"appliction/form-data\"},\"body\":\"{\\\"firstName\\\":\\\"Aaan\\\",\\\"lastName\\\":\\\"Annanan\\\",\\\"email\\\":\\\"M@j\\\",\\\"password\\\":\\\"12345678\\\",\\\"confirmPassword\\\":\\\"12345678\\\"}\"}",
        "env": {
            "Blob": [Function Blob],
            "FormData": [Function FormData]
        },
        "headers": [Object],
        "maxBodyLength": -1,
        "maxContentLength": -1,
        "method": "post",
        "timeout": 0,
        "transformRequest": [
            [Function transformRequest]
        ],
        "transformResponse": [
            [Function transformResponse]
        ],
        "transitional": {
            "clarifyTimeoutError": false,
            "forcedJSONParsing": true,
            "silentJSONParsing": true
        },
        "url": "/signup",
        "validateStatus": [Function validateStatus],
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN"
    },
    "data": {
        "status": "error"
    },
    "headers": {
        "access-control-allow-headers": "Content-Type",
        "access-control-allow-methods": "GET, POST, PUT, DELETE",
        "access-control-allow-origin": "*",
        "connection": "keep-alive",
        "content-length": "18",
        "content-type": "application/json; charset=utf-8",
        "date": "Mon, 28 Aug 2023 16:45:09 GMT",
        "etag": "W/\"12-Y7TqX4PFUJ6O+RTv1aRJV2FCE/E\"",
        "keep-alive": "timeout=5",
        "x-powered-by": "Express"
    },
    "request": {
        "DONE": 4,
        "HEADERS_RECEIVED": 2,
        "LOADING": 3,
        "OPENED": 1,
        "UNSENT": 0,
        "_aborted": false,
        "_cachedResponse": undefined,
        "_hasError": false,
        "_headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json"
        },
        "_incrementalEvents": false,
        "_lowerCaseResponseHeaders": {
            "access-control-allow-headers": "Content-Type",
            "access-control-allow-methods": "GET, POST, PUT, DELETE",
            "access-control-allow-origin": "*",
            "connection": "keep-alive",
            "content-length": "18",
            "content-type": "application/json; charset=utf-8",
            "date": "Mon, 28 Aug 2023 16:45:09 GMT",
            "etag": "W/\"12-Y7TqX4PFUJ6O+RTv1aRJV2FCE/E\"",
            "keep-alive": "timeout=5",
            "x-powered-by": "Express"
        },
        "_method": "POST",
        "_perfKey": "network_XMLHttpRequest_http://192.168.0.105:8080/api/v1/client/signup",
        "_performanceLogger": {
            "_closed": false,
            "_extras": [Object],
            "_pointExtras": [Object],
            "_points": [Object],
            "_timespans": [Object]
        },
        "_requestId": null,
        "_response": "{\"status\":\"error\"}",
        "_responseType": "",
        "_sent": true,
        "_subscriptions": [],
        "_timedOut": false,
        "_trackingName": "unknown",
        "_url": "http://192.168.0.105:8080/api/v1/client/signup",
        "readyState": 4,
        "responseHeaders": {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Origin": "*",
            "Connection": "keep-alive",
            "Content-Length": "18",
            "Content-Type": "application/json; charset=utf-8",
            "Date": "Mon, 28 Aug 2023 16:45:09 GMT",
            "ETag": "W/\"12-Y7TqX4PFUJ6O+RTv1aRJV2FCE/E\"",
            "Keep-Alive": "timeout=5",
            "X-Powered-By": "Express"
        },
        "responseURL": "http://192.168.0.105:8080/api/v1/client/signup",
        "status": 200,
        "timeout": 0,
        "upload": {},
        "withCredentials": true
    },
    "status": 200,
    "statusText": undefined
}