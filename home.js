var selectedSize = '';
var selected = [];

/** My cart function */
$(document).ready(function () {
  document.getElementById("cartNum").textContent = 0;
})

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myCart() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}

/**
 * Select size function
 */
$(".dropdown-menu li a").click(function () {
  // remove previously added selectedLi
  $('.selectedLi').removeClass('selectedLi');

  if (selectedSize != $(this).text()) {
    // add class `selectedLi`
    $(this).addClass('selectedLi');
    selectedSize = $(this).text();
  } else {
    selectedSize = '';
  }

  $("#selectedSize").text(selectedSize);

});

function addToCart() {
  if (selectedSize) {
    let index = selected.findIndex(obj =>  obj.size === selectedSize);

    if(selected.findIndex(obj =>  obj.size === selectedSize) == -1) {
      selected.push({
        img: 'img/classic-tee.jpg',
        quantity: 1,
        price: '$75',
        size: selectedSize
      });
      
    }


    $('#no-items').addClass('display-none');
    $('#size-error-msg').addClass('display-none');
    
    // append items to cart div
    if ($(".element").length < selected.length && index == -1) {
      let i = selected.findIndex(obj =>  obj.size === selectedSize);
      let content = `
        <div class='element' id='div_${i}' style='display:inline-block; padding:10px'>
          <div class="width-30"> 
            <img src=${selected[i].img} alt="Nature" class="responsive-img">
          </div>
          <div class="two-col"> 
            <span class="font-bold"> Classic Tee </span>
            <span class='block-style'> 
            <span id='qty_${i}'> ${selected[i].quantity}</span> x <span class='font-bold'>
            ${selected[i].price}</span> </span>
            <span class='block-style'> 
            Size: ${selected[i].size}
          </div>
        </div>
        `
      if ($(".element").length > 0) {
        $(".element:last").after(content);
      } else {
        $('#myCart').append(content);
      }

      $("#cartNum").text(selected.length);
    } else {
      let i = selected.findIndex(obj =>  obj.size === selectedSize);
      $(`#qty_${i}`).text(selected[index].quantity += 1)
    }

    //show msgs
    $('#size-success-msg').show(0).delay(3000).hide(0);
    selectedSize = '';
    $(".dropdown-menu li a").removeClass('selectedLi');
  } else {
    $('#size-error-msg').removeClass('display-none');
  }
  //add to cart
}