const formData = {
    UserName: 'עלמה רחובות',
    Password: '24011993',
    RememberMe: false
};

class LoginService {
    constructor(request) {
        this.request = request;
    }

    async login(url) {
        return new Promise((resolve, reject) => {
            this.request(
                {
                    method: 'POST',
                    url: url,
                    form: formData,
                    "Content-Type": "application/x-www-form-urlencoded"
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    console.log('logged in');
                    resolve(true);
                });
        })
    }

}

module.exports = LoginService;