const express = require('express');
const fetch = require('node-fetch');
const { randomUUID } = require('node:crypto')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const app = express();
const port = parseInt(process.env.PORT, 10) || 3001;

const appName = 'rcasto-dev'
const cookieName = 'rc-analytics'
const analyticsApiUrl = process.env.ANALYTICS_API_URL
const eventTypes = {
    pageView: 'page-view',
}

function trackPageView(req, res) {
    let analyticsId = req.cookies[cookieName]

    // Setting cookie here, but must be mindful
    // that this is fire and forget
    // This top code will run until async promise is executed further below
    if (!analyticsId) {
        analyticsId = randomUUID()

        res.cookie(cookieName, analyticsId, {
            maxAge: 3600000 * 72, // 3 days
            secure: true,
            httpOnly: true,
        })
    }

    fetch(analyticsApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: eventTypes.pageView,
            appName,
            version: 1,
            timeString: new Date().toISOString(),
            eventId: randomUUID(),
            analyticsId,
            data: {
                url: req.originalUrl,
            },
            userAgent: req.get('User-Agent'),
            ip: req.get('Fly-Client-IP') || req.get('X-Forwarded-For'),
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw `An error occurred logging analytics: ${response.status}, ${response.statusText}`
        }
    })
    .catch(err => {
        const message =
            (err instanceof Error && err.message) ||
            (typeof err === 'string' && err) ||
            'An error occurred logging analytics'
        console.error(message, err)
    })
}

app.use(helmet())
app.use(cookieParser())
app.use((req, res, next) => {
    if (req.path === '/' && req.method === 'GET') {
        // fire and forget like call
        trackPageView(req, res)
    }
    next()
})
app.use(express.static('public'));
app.use((req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
