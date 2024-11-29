<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
</head>
<body>
  <h1>{{tagline}}</h1>
  <p>{{description}}</p>
  
  <ul id="image-links">
    <!-- Link gambar akan ditampilkan di sini -->
    {{#each imageLinks}}
      <li><a href="{{this}}" target="_blank">{{this}}</a></li>
    {{/each}}
  </ul>

  <script>
    // Bisa digunakan untuk fetch gambar dari backend jika menggunakan server atau API
    // fetch('/api/images').then(response => response.json()).then(data => {
    //   const list = document.getElementById('image-links');
    //   data.forEach(link => {
    //     const li = document.createElement('li');
    //     const a = document.createElement('a');
    //     a.href = link;
    //     a.target = '_blank';
    //     a.textContent = link;
    //     li.appendChild(a);
    //     list.appendChild(li);
    //   });
    // });
  </script>
</body>
</html>
