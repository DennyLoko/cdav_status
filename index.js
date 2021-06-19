const axios = require('axios')
const cors = require('cors')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())

app.get('/', (req, res) => {
    axios.get(`http://${process.env.CDAV_ENDPOINT}/players.json`)
        .then(resp => {
            if (resp.status == 200) {
                res.json({
                    "status": "success",
                    "message": "Successfully got server status",
                    "server": {
                        "players": resp.data.length,
                        "status": "up"
                    }
                })
            } else {
                console.log(`Error: ${resp.status}`)

                res.status(500).json({
                    "status": "error",
                    "message": "Failed to get server status",
                    "server": {
                        "players": 0,
                        "status": "down"
                    }
                })
            }
        })
        .catch(e => {
            console.log(e.code)

            res.status(500).json({
                    "status": "error",
                    "message": "Failed to get server status",
                    "server": {
                        "players": 0,
                        "status": "down"
                    }
                })
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
