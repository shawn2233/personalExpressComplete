var trash = document.getElementsByClassName("fa-trash");
var thumbUp = document.getElementsByClassName("fa-solid fa-briefcase");


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const date = this.parentNode.parentNode.childNodes[3].innerText
        const shift = this.parentNode.parentNode.childNodes[5].innerText
        const thumbUp = this.parentNode.parentNode.childNodes[7].innerText
        fetch('schedule', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'date': date,
            'shift':shift,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const date = this.parentNode.parentNode.childNodes[3].innerText
        const shift = this.parentNode.parentNode.childNodes[5].innerText
        fetch('schedule', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'date': date,
            "shift":shift
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
