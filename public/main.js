var trash = document.querySelectorAll(".trash");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log("clicked")
        const date = this.parentNode.childNodes[1].innerText
        const title = this.parentNode.childNodes[3].innerText
        const note = this.parentNode.childNodes[5].innerText
        console.log(date,title,note)
        fetch('/dashboard', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'title': title,
            'note': note,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});