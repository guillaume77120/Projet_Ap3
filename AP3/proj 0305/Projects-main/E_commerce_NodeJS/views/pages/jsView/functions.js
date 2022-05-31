  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">


  function change(){
    var id = document.getElementById('couleur');
    id.style.color="red";
}

function changeAttribute( id, attribute) {

   document.getElementById(id).setAttribute("type", attribute);
}

function Visibility(id) { //gère le bouton modifier

    if(document.getElementById(id).style.display === 'block' || document.getElementById(id).style.display === ""){
        document.getElementById(id).style.display = "none";
        document.getElementById(id+'2').style.display = "block";
    }
    else if(document.getElementById(id).style.display === 'none'){
        document.getElementById(id).style.display = "block";
        document.getElementById(id+'2').style.display = "none";
    }

document.getElementById(id).textContent = document.getElementById(id+'2').value ;

}



</script>