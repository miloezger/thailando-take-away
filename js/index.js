

// Vars
var cartWrapper = $('.cd-cart-container');
var cartTrigger = cartWrapper.children('.cd-cart-trigger');
var cartCount = cartTrigger.children('.count');


// Show Cart if not empty
function showOrHideCart() {
    if(shoppingCart.countCart() > 0) {
        cartWrapper.removeClass('empty');
    } else {
        cartWrapper.removeClass('cart-open');
        // setTimeout(cartWrapper.addClass('empty'), 1000);
    }
}

// Open/Close Cart
cartTrigger.on('click', function(event){
    event.preventDefault();
    toggleCart();
});

// Close Cart Overlay
cartWrapper.on('click', function(event){
    if( $(event.target).is($(this)) ) toggleCart(true);
});

// Toggle Cart Overlay
function toggleCart(bool) {
    var cartIsOpen = ( typeof bool === 'undefined' ) ? cartWrapper.hasClass('cart-open') : bool;
    
    if( cartIsOpen ) {
        cartWrapper.removeClass('cart-open');
    } else {
        cartWrapper.addClass('cart-open');
    }
}




// Add to cart
$(".add-to-cart").click(function(event){
    event.preventDefault();

    var productDiv = $(this).parent().parent().parent().parent();
    
    var id = $(productDiv).attr('data-id');
    var name = $(productDiv).attr('data-name');
    var price = Number($(productDiv).attr('data-price'));
    var quantity = $(productDiv).find('input[type=number]').val();
    // TODO: quantity
    var image = $(productDiv).attr('data-image');

    shoppingCart.addItemToCart(id, name, price, 1, image);
    
    // Show cart
    var cartIsEmpty = cartWrapper.hasClass('empty');
    if (cartIsEmpty) {
        cartWrapper.removeClass('empty');
    }

    displayCart();

});


// Cart to Formfield
function writeToTextarea() {
    var cartArray = shoppingCart.listCart();
    console.log(cartArray);
    var output = "";

    for (var i in cartArray) {
        output += cartArray[i].name
            +" (Nr. "+cartArray[i].id+")\n" 
            +"Anzahl: "+cartArray[i].count+"\n"
            +"Preis: "+cartArray[i].total+" CHF"
            +"\n\r";
    }
    output += "Total: "+shoppingCart.totalCart()+" CHF";
    $("#field_id").val(output); // TODO: Replace Field ID
}

if ($("#field_id").length) { // TODO: Replace Field ID
    writeToTextarea();
}


// Show Cart
function displayCart() {
    var cartArray = shoppingCart.listCart();
    // console.log(cartArray);
    var output = "";

    for (var i in cartArray) {
        output += "<li class='product'>"
            +"<div class='product-image'>"
            +"<img src='"+cartArray[i].image+"' alt='"+cartArray[i].name+"'>"
            +"</div>"
            +"<div class='product-details'>"
            +"<div class='product-title'>"
            +"<h3>"+cartArray[i].name+"</h3>"
            +"<button class='delete-item' data-name='"
            +cartArray[i].name+"'>Löschen</button>"
            +"</div>"
            +"<div class='product-actions'>"
            +"<div class='item-actions'>"
            +"<button class='plus-item' data-id='"
            +cartArray[i].id+"' data-name='"
            +cartArray[i].name+"'>+</button>"
            +"<input class='item-count' type='number' data-name='"
            +cartArray[i].name
            +"' value='"+cartArray[i].count+"' >"
            +"<button class='subtract-item' data-name='"
            +cartArray[i].name+"'>-</button>"
            +"</div>"
            +"<span class='price'>"+cartArray[i].price+" CHF</span>"
            +"</div>"
            +"</div>"
            +"</li>";
    }

    $("#show-cart").html(output);
    $("#count-cart").html( shoppingCart.countCart() );
    $("#total-cart").html( shoppingCart.totalCart() );

    showOrHideCart();
}

$("#show-cart").on("click", ".delete-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event){
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
});

$("#show-cart").on("click", ".plus-item", function(event){
    var id = $(this).attr("data-id");
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(id, name, 0, 1);
    displayCart();
});

$("#show-cart").on("change", ".item-count", function(event){
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});


// Render Cart
displayCart();


