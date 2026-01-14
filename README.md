<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>لوحة التحكم الإدارية</title>
    <link rel="stylesheet" href="./styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="app-shell">
      <header class="app-header">
        <div class="brand">
          <span class="brand__logo">A</span>
          <div>
            <h1>بوابة إدارة النظام</h1>
            <p>إدارة المستخدمين والصلاحيات بشكل آمن</p>
          </div>
        </div>
        <nav class="app-nav" id="app-nav"></nav>
      </header>
      <main id="app" class="app-content" aria-live="polite"></main>
    </div>
    <script type="module" src="./router.js"></script>
  </body>
</html>
