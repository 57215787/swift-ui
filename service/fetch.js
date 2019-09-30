const baseURL = ``;

const DEFAULT_CONTENT_TYPE = {
    'content-type': 'application/json'
};

export function fetch(url, params, method = 'POST') {

    return new Promise((resolve, reject) => {
        try {
            const defaultConfig = {
                url: baseURL + url,
                header: DEFAULT_CONTENT_TYPE,
                method,
                success(config) {
                    const {
                        statusCode,
                        errMsg: message,
                        data
                    } = config;
                    if (parseFloat(statusCode) === 200) {
                        return resolve(data)
                    } else {
                        return reject({
                            message
                        })
                    }
                }
            }
            if (method === 'POST') {
                defaultConfig.data = JSON.stringify(params)
            }
            wx.request(defaultConfig);
        } catch (err) {
            reject(err);
        }
    });
}