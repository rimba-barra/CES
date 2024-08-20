<?php
/* class AbbApp di sini untuk memasukkan variable class yang di inginkan seperti session, format array hasil*/
class Box_Kouti_AbbApp extends Box_Kouti_AbApp{
   
    protected function init(){
    	$this->session = new Box_Kouti_Session();
       // $this->hasil = new Box_Kouti_Hasil();
       // $this->setSession(new Box_Kouti_Session());
        
    }  
    
    
}

?>
