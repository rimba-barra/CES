<?php
/* class AbbApp di sini untuk memasukkan variable class yang di inginkan seperti session, format array hasil*/
class Master_Box_Kouti_AbbApp extends Master_Box_Kouti_AbApp{
   
    protected function init(){
    	$this->session = new Master_Box_Kouti_Session();
       // $this->hasil = new Master_Box_Kouti_Hasil();
       // $this->setSession(new Master_Box_Kouti_Session());
        
    }  
    
    
}

?>
