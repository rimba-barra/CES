<?php
/* class AbbApp di sini untuk memasukkan variable class yang di inginkan seperti session, format array hasil*/
class Gl_Box_Kouti_AbbApp extends Gl_Box_Kouti_AbApp{
   
    protected function init(){
    	$this->session = new Gl_Box_Kouti_Session();
       // $this->hasil = new Gl_Box_Kouti_Hasil();
       // $this->setSession(new Gl_Box_Kouti_Session());
        
    }  
    
    
}

?>
