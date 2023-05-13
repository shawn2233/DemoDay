const addFriendBtn = document.querySelectorAll(".addFriend")


Array.from(addFriendBtn).forEach(function(element) {
    console.log("addeventlistener",element)
    element.addEventListener('click', function(){
        const userid = element.dataset.userid
        console.log(userid,"add friend",element)
      fetch('/add', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userid : userid
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

console.log(addFriendBtn)