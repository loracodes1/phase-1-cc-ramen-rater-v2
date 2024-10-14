// index.js

// Callbacks
const handleClick = (ramen) => {
  let ramenId = ramen.target.id

  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    headers: {
      "Accept": "application/json",
    }
  }).then(response => response.json()).then(ramen => {
    const detailImg = document.querySelector("#ramen-detail > .detail-image");
    const detailName = document.querySelector("#ramen-detail > .name");
    const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
    const detailsRating = document.getElementById("rating-display");
    const detailsComment = document.getElementById("comment-display");

    detailImg.src = ramen.image
    detailName.textContent = ramen.name
    detailRestaurant.textContent = ramen.restaurant
    detailsRating.textContent = ramen.rating
    detailsComment.textContent = ramen.comment
  })
};

const addSubmitListener = (form) => {
  if(! form) {
    return
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
    const ramenFormName = document.querySelector("#new-ramen #new-name");
    const ramenFormRestaurant = document.querySelector("#new-ramen #new-restaurant");
    const ramenFormImage = document.querySelector("#new-ramen #new-image");
    const ramenFormRating = document.querySelector("#new-ramen #new-rating");
    const ramenFormComment = document.querySelector("#new-ramen #new-comment");

    if(ramenFormName.value == "" || 
      ramenFormRestaurant.value == "" ||
      ramenFormImage.value == "" ||
      ramenFormRating.value == "" ||
      ramenFormComment.value == ""
    ){
      return false
    }
  
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: ramenFormName.value,
        restaurant: ramenFormRestaurant.value,
        image: ramenFormImage.value,
        rating: ramenFormRating.value,
        comment: ramenFormComment.value,
      })
    }).then(() => {
      displayRamens()
    })

    return false
  });
}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens", {
    headers: {
      "Accept": "application/json",
    }
  }).then(response => response.json()).then(ramens => {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    
    for(let ramen of ramens) {
      let img = document.createElement('img')
      
      // Set img src
      img.src = ramen.image
      img.id = ramen.id

      // Add event listener
      img.addEventListener('click', handleClick)

      // Append to div
      ramenMenuDiv.appendChild(img)
    }
  })
};

const main = () => {
  // Invoke displayRamens here
  displayRamens()

  // Invoke addSubmitListener here
  const ramenForm = document.getElementById('new-ramen');
  addSubmitListener(ramenForm)
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
