//   take id  from url of window

      const params = new URLSearchParams(window.location.search);
      const pid = parseInt(params.get('id'));
      console.log("id number :", pid);

    //    fetch the data from products.json file

    fetch("product.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        return res.json();
      })
      .then((products) => {
          
          //  current products show  with the help of  url id ==>

          const product = products.find((p) => p.id == pid);
          console.log(product);

          if (product) {
            document.getElementById("product").innerHTML = `
  
    <div class="product_detile"> 
       <div class="product_image"> 
        <img src="${product.image}"width="200"/>
    </div>
     <div class = "product_info">
      <spn>${product.category}</spn>
      <h1>${product.name}</h1>
      <p class="product_price"> price :$ ${product.price}</p>
       <p class="product_stock"> stock: ${product.stock}</p>
        <p class="product_descrip">${product.description}</p>
        <p>Rating : ${product.rating}⭐⭐⭐⭐<p>

       </div>
      
      </div>
    `;
            //  similar products of previous id 
            const similar= products.filter(
              (p) => p.category === product.category && p.id != product.id
            );
            console.log("this is filterd products: ", similar);

            const simbox = document.getElementById('similar');
            console.log(simbox);

            let htmlsimlir = '';

            similar.forEach((product) => {
              htmlsimlir += `
            <div class="similar_card">
            <img   class ="similar_imag"src="${product.image}"width="200"/>
            <h4 class="sim_name">${product.name}</h4>
          <p class="price">price:${product.price}$</p>
          <p>Rating : ${product.rating}⭐⭐⭐⭐<p>
          <a  class="view-btn" href="productDetails.html?id=${product.id}">view detile</a>
            </div>
            `;
            });
            simbox.innerHTML = htmlsimlir;
          } else {
            document.getElementById("product").innerHTML =
              "products is not found..";
            console.log(" products is not found..");
          }


           

          

    });