<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from frameworks where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from frameworks";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_SERVER['REQUEST_METHOD']=='POST' && $_POST['METHOD'] == 'POST'){
    $nombre= $_POST['nombre'];
    $lanzamiento= $_POST['lanzamiento'];
    $desarrollador= $_POST['desarrollador'];
    $query="insert into frameworks(nombre, lanzamiento, desarrollador) values ('$nombre', '$lanzamiento', '$desarrollador')";
    $queryAutoIncrement="select MAX(id) as id from frameworks";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_SERVER['REQUEST_METHOD']=='POST' && $_POST['METHOD'] == 'PUT'){
    $id=$_POST['id'];
    $nombre=$_POST['nombre'];
    $lanzamiento=$_POST['lanzamiento'];
    $desarrollador=$_POST['desarrollador'];
    $query="UPDATE frameworks SET nombre='$nombre', lanzamiento='$lanzamiento', desarrollador='$desarrollador' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_SERVER['REQUEST_METHOD']=='POST' && $_POST['METHOD'] == 'DELETE'){
    $id=$_POST['id'];
    $query="DELETE FROM frameworks WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>