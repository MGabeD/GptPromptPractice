This README is a description of each API and what to send it and what the structure of the request. The API's url section is what you have to add to the hosted url, the components are which types of calls work, and the data section is what they are requesting from the user.

APIs:
    GPT
        URL: "/api/gpt"
        COMPONENTS:
            POST
                DATA:
                    req.body.prompt             (REQUIRED)
                    req.body.context            (OPTIONAL)

    User
        URL: "/api/users"
        COMPONENTS:
            PUT:
                DATA:
                    ("/:id") = req.params.id    (REQUIRED)
                    req.body.userName           (OPTIONAL)
                    req.body.password           (OPTIONAL)
                    req.body.maxScore           (OPTIONAL)
                    req.body.cumulativeScore    (OPTIONAL)
                    req.body.attempts           (OPTIONAL)
                    req.body.maxAttempts        (OPTIONAL)
            POST:
                DATA:
                    req.body.key                (REQUIRED)
                        The key is a necessary part of using this application, it needs to match the const CREATEACCOUNT in ./utils/token.js to allow an account to be created
                    req.body.userName           (REQUIRED)
                    req.body.password           (REQUIRED)
                    req.body.maxScore           (OPTIONAL)
                    req.body.cumulativeScore    (OPTIONAL)
                    req.body.attempts           (OPTIONAL)
                    req.body.maxAttempts        (OPTIONAL)
            GET:
                DATA:
                    ("/:id") = req.params.id    (OPTIONAL)
            DELETE:
                DATA:
                    ("/:id") = req.params.id    (REQUIRED)

    Auth
        URL: "/api/auth"
        COMPONENTS:
            GET:
                DATA:
                    req.query.userName          (REQUIRED)
                    req.query.password          (REQUIRED)

    Attempt:
        URL: "/api/attempts"
        COMPONENTS:
            PUT:
                DATA:
                    ("/:id") = req.params.id    (REQUIRED)




