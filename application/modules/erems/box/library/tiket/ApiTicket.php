<?php

class Erems_Box_Library_Tiket_ApiTicket{
    private $member = array();
    public function addMember($name,$proccesor){
        if($proccesor instanceof Erems_Box_Library_Tiket_TicketProccesor){
            $this->member[$name] = $proccesor;
        }
        
    }
    public function getMember($member){
        if(key_exists($member,$this->member)){
           return $this->member[$member]; 
        }
        return null;
    }
   

}
?>
