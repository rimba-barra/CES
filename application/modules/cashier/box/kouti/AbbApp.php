<?php
/* class AbbApp di sini untuk memasukkan variable class yang di inginkan seperti session, format array hasil*/
class Cashier_Box_Kouti_AbbApp extends Cashier_Box_Kouti_AbApp{
   
    protected function init(){
    	$this->session = new Cashier_Box_Kouti_Session();
       // $this->hasil = new Cashier_Box_Kouti_Hasil();
       // $this->setSession(new Cashier_Box_Kouti_Session());
        
    }  
    
    
}

?>
