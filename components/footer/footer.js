function render_footer(parent_id){
   
    const footer_div = document.createElement("footer");
    parent_id.appendChild(footer_div);
    footer_div.id = "footer";
   
    render_inside_footer(footer_div)
    
   }
   
   
   
   function render_inside_footer(parent){
    parent.innerHTML =`
    <div id='footer_container'>
        <img src='../media/favicon/recipe-book.png'>
            
        <div id= 'footer_icons'>
            <a href ="#"> <i class ='fa-brands fa-facebook'></i></a>  
            <a href ="#"> <i class ='fa-brands fa-instagram'></i></a>  
            <a href ="#"> <i class ='fa-brands fa-twitter'></i></a>  
            <a href ="#"> <i class ='fa-brands fa-youtube'></i></a>  
        </div>
            
        <div id='footer_nav'>
            <ul>
                <li><a href=''>About</a></li>
                <li><a href=''>Contact Us</a></li>

            </ul>
        </div>

        <div id ='footerBottom'>
            <p>Copyright &copy;2024 Luxe Bites</p>
        </div>
    </div>
    `;
}