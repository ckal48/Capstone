<?php
   include_once 'Connection.php';
   if($_POST)
   {
       $document= array(
       'firstname'=> $_POST['firstname'],
       'lastname'=> $_POST['lastname'],
       'Username'=> $_POST['Username'],
       'address'=> $_POST['address'],
       'password1'=> $_POST['password1'],
       );

       if($collection->insert($document))
       {
           echo "Data Stored Successfully";
       }
       else {
           echo "Issue With Storing Data";
       }
   }
   else{
       echo "No Data To Be Stored";
   }

?>