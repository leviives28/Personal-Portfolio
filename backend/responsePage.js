function createHtml(statusMessage) {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="author" content="Levi Nicholson Ives">
            <meta name="description" content="Software developer available for freelance hire, and employment. Located in East Sussex, United Kingdom">
            <link type="text/css" rel="stylesheet" href="https://leviives.dev/css/styles.css">
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
            <link rel="manifest" href="/site.webmanifest">
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#66cccc">
            <meta name="msapplication-TileColor" content="#2b5797">
            <meta name="theme-color" content="#ffffff">
            <title>Levi Ives - Software Developer - Response Page</title>
        </head>
        <body>
            <header>
                <div id="logoContainer">
                    <a href="https://leviives.dev/home.html"><img id="logo" src="https://leviives.dev/images/logo.png" alt="Image of levi"></a>
                </div>
                <nav>
                    <a href="https://leviives.dev/home.html" class="navLink">Home</a>
                    <a href="https://leviives.dev/contact.html" class="navLink">About</a>
                    <a href="https://leviives.dev/projects.html" class="navLink">Projects</a>
                    <a href="https://leviives.dev/contact.html" class="navLink">Contact</a>
                </nav>
            </header>
            <main>
                <div id="reviewsTitle">
                    <h1>${statusMessage}</h1>
                    <h3 id="responsePageRedirectMessage">You will now be redirected</h3>
                </div>
            </main>
            <script src='https://leviives.dev/scripts/redirects.js'></script>
        </body>
    </html>
    `
return html;
}

module.exports = {
    createHtml
}
