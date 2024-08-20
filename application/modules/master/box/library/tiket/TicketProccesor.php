<?php

abstract class Erems_Box_Library_Tiket_TicketProccesor{
    protected $name = 'ticket_procces';
    private $postData = null;
    private $json = '{}';
    private $specialParam = array();
    private $request = null;
   public function getName(){
       return $this->name;
   }
   protected final function getPostData(){
       return $this->postData;
   }
   public function setPostData($postData){
       $this->postData = $postData;
   }
   
   public function setRequest($req){
       $this->request = $req;
   }
   
   public function getRequest(){
       return $this->request;
   }
   
   public final function getJson(){
       $arrayHasil = $this->procces();
       return Zend_Json::encode($arrayHasil);
   }
   
   public final function setSpecialParam($sp){
       $this->specialParam = $sp;
   }
   
   public final function getSpecialParam(){
       return $this->specialParam;
   }
   

   abstract protected function procces();
   

}
?>
