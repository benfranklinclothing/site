"use strict";

const getSelectedProduct = src => {
    let selected = [];

    if (src == "images/blacklongsleeve.png") {
        selected = ["blacklongsleeve", 29.99, "Black Long Sleeve"];
    } else if (src == "images/sweatpants.png") {
        selected = ["sweatpants", 19.99, "Sweat Pants"];
    } else if (src == "images/longsleeve.png") {
        selected = ["longsleeve", 29.99, "Long Sleeve"];
    } else if (src == "images/sweatshirt.png") {
        selected = ["sweatshirt", 39.99, "Sweat Shirt"];
    } else if (src == "images/tshirt.png") {
        selected = ["tshirt", 19.95, "Tshirt"];
    }
    return selected;  // returns empty array if no if condition is true
};

$(document).ready( () => {
    let total = 0;

    $("ul img").each( (index, img) => {
        const oldURL = $(img).attr("src"); // gets the src attribute
        const newURL = $(img).attr("id");  // gets the id attribute
        
        // preload rollover image
        const rolloverImage = new Image();
        rolloverImage.src = newURL;
         
        // set up event handlers
        $(img).hover(
            () => $(img).attr("src", newURL), // sets the src attribute
            () => $(img).attr("src", oldURL)  // sets the src attribute
        ); // end hover

        $(img).click( evt => {
            // get data for selected item 
            const selected = getSelectedProduct(oldURL);

            // get current order from page - use empty string if no order yet
            let order  = $("#order").html();
            if (order == undefined) {
                order = "";
            }

            // update total and display with selected item data
            total += selected[1];
            order += `<option value="${selected[0]}">$${selected[1]} - ${selected[2]}</option>`;

            // display updated order and total
            $("#order").html( order );
            $("#total").text( `Total: $${total.toFixed(2)}` );
            
            // cancel default event of the clicked link
            evt.preventDefault();
            
        }); // end click
    }); // end each
    
    // add click event handler for check out button
    $("#place_order").click( () => {
        const order = $("#order").text();
        if (order == "") {
            alert ("Please add at least one item to your order.");
        } else {
            $("#order_form").submit();
        }
    }); // end click
    
    // add click event handler for clear button
    $("#clear_order").click( () => {
        total = 0;
        $("#order").text("");
        $("#total").text("");
    }); // end click
    
});
