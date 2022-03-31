const icon = document.getElementById('icon');

icon.addEventListener('click', () => {
    document.location.href = 'index.html'
  })

const footer = document.getElementById("copy")

const currentYear = new Date().getFullYear()

footer.innerHTML = `&copy ${currentYear} SF Eastern Europe Region`