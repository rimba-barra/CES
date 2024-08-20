<?php
/* class AbbApp di sini untuk memasukkan variable class yang di inginkan seperti session, format array hasil*/
class Erems_Box_Kouti_AbbApp extends Erems_Box_Kouti_AbApp{
   
    protected function init(){
    	$this->session = new Erems_Box_Kouti_Session();
       // $this->hasil = new Erems_Box_Kouti_Hasil();
       // $this->setSession(new Erems_Box_Kouti_Session());
        
    }  
    
    
}

?>
