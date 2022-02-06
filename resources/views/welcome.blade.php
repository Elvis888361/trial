<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 13px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

  <style type="text/css">
    body {
  background: #555;
}

.content {
  max-width: 500px;
  margin: auto;
  background: white;
  padding: 10px;
}
 select { 
                appearance: none; 
                outline: 0; 
                background: green; 
                background-image: none; 
                width: 100%; 
                height: 100%; 
                color: black; 
                cursor: pointer; 
                border:1px solid black; 
                border-radius:3px; 
            } 
            .select { 
                position: relative; 
                display: block; 
                width: 15em; 
                height: 2em; 
                line-height: 3; 
                overflow: hidden; 
                border-radius: .25em; 
                padding-bottom:10px; 
                  
            }
            #results{
              background-color:red;
            }
  </style>
                    <?php
 $con = mysqli_connect("localhost","root","","userreg");

        if(!$con)
        {
            die("Connection failed: " . mysqli_connect_error());
        }

?>

<div class="content">

<form action="" method="post" name="form">
    <label>Select food1 ID</label>
  <br>
  <div class="select">
   <select class="form-control" name="product">
    <?php $result = mysqli_query($con,"SELECT product FROM food1 ");
 while($row = mysqli_fetch_array($result)) 
 {
   echo "<option value='" . $row['product'] . "'>" .$row['product'] . "</option>";
 }
 ?>
  </select>
</div>
  <br>
 <label>Select food3 ID</label><br>
    <div class="select">
   <select class="form-control" name="products">
    <?php $result = mysqli_query($con,"SELECT products FROM food2 ");
 while($row = mysqli_fetch_array($result)) 
 {
   echo "<option value='" . $row['products'] . "'>" .$row['products'] . "</option>";
 }
 ?>
  </select>
</div><br>

   <label>Select food3 ID</label><br>
    <div class="select">
   <select class="form-control" name="product3">
    <?php $result = mysqli_query($con,"SELECT product3 FROM food3 ");
 while($row = mysqli_fetch_array($result)) 
 {
   echo "<option value='" . $row['product3'] . "'>" .$row['product3'] . "</option>";
 }
 ?>
  </select>
</div><br>
   <label>Select food4 ID</label><br>
   <div class="select">
   <select class="form-control" name="product4">
    <?php $result = mysqli_query($con,"SELECT product4 FROM food4 ");
 while($row = mysqli_fetch_array($result)) 
 {
   echo "<option value='" . $row['product4'] . "'>" .$row['product4'] . "</option>";
 }
 ?>
  </select>
</div><br>
<input type="submit" name="submit" value="submit">
</form>
<?php
if(isset($_REQUEST['submit']))
{

  $value=$_POST['product']; 
  
 $query = "SELECT price FROM food1 WHERE product='$value';";

  if($result = mysqli_query($con, $query)){
    if(mysqli_num_rows($result) > null){
      
        while($row = mysqli_fetch_array($result)){
        
         $var1=$row['price'];
        }
       
        mysqli_free_result($result);
    } else{
        echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $query. " ;
}
 
} ?>
 <?php
if(isset($_REQUEST['submit']))
{

  $value=$_POST['products']; 

 $query = "SELECT prices FROM food2 WHERE products='$value';";

  if($result = mysqli_query($con, $query)){
    if(mysqli_num_rows($result) > null){
      
        while($row = mysqli_fetch_array($result)){
        
         $var2= $row['prices'];
        }
       
        mysqli_free_result($result);
    } else{
        echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $query. " . mysqli_error($con);
}
 
} ?>
 
<?php
if(isset($_REQUEST['submit']))
{

  $value=$_POST['product3']; 
 $query = "SELECT price3 FROM food3 WHERE product3='$value';";

  if($result = mysqli_query($con, $query)){
    if(mysqli_num_rows($result) > null){
      
        while($row = mysqli_fetch_array($result)){
        
         $var3= $row['price3'];
        }
       
        mysqli_free_result($result);
    } else{
        echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $query. " . mysqli_error($con);
}
 
} ?>



<?php
if(isset($_REQUEST['submit']))
{

  $value=$_POST['product4']; 
 $query = "SELECT price4 FROM food4 WHERE product4='$value';";

  if($result = mysqli_query($con, $query)){
    if(mysqli_num_rows($result) > null){
      
        while($row = mysqli_fetch_array($result)){
         
         $var4= $row['price4'];
        
        }
       
        mysqli_free_result($result);
    } else{
        echo "No records matching your query were found.";
    }
} else{
    echo "ERROR: Could not able to execute $query. " . mysqli_error($con);
}
 
} ?>
<form id="results">
<?php 
 if(isset($_REQUEST['submit'])){
  $value1=$_POST['product']; 
  echo "<h1>food selected</h1>";
   echo $value1;
          echo "<br>";
       $value2=$_POST['products']; 
   echo $value2;
          echo "<br>";
          $value3=$_POST['product3']; 
   echo $value3;

          echo "<br>";
          $value4=$_POST['product4']; 
   echo $value4;
          echo "<br>";
  $var5=$var1+$var2+$var3+$var4;
  echo "total to pay : kshs";
  echo '<input required  type = "text" name = "subject1" value="' . $var5. '" />';
  }
 ?>
 </form>
 <p>you are advised to save your selected product to minimize usage of bundles</p>
 <p align="center"><input type="button" onclick="myPrint('results')" value="print"></p>
</div>
    <script>
        function myPrint(results) {
            var printdata = document.getElementById(results);
            newwin = window.open("");
            newwin.document.write(printdata.outerHTML);
            newwin.print();
            newwin.close();
        }
    </script>
        </div>
    </body>
</html>
