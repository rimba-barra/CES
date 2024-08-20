<?php
/**
 * @author Tommy Toban <tom4_wi02@yahoo.com>
 */
class Erems_Libraries_Tagihan{
    private $id = NULL;
    private $list_cicilan = array();
    public function __construct($id=NULL,$list_cicilan=array()) {
        $this->id = $id;
        if(count($list_cicilan) > 0){
            $this->import_from_array($list_cicilan);
        }
    }
    public function getListCicilan(){
        return $this->list_cicilan;
    }
    
    public function addCicilan($c){
        if(get_class($c)=='Erems_Libraries_Cicilan'){
            $this->list_cicilan[] = $c;
        }
        
    }
    public function import_from_array($data = array()){
        
        foreach($data as $row){

            $this->list_cicilan[] = new Erems_Libraries_Cicilan($row['schedule_id'],$row['amount'],$row['remaining_balance']);
        }
        
    }
    public function getCicilan($pos){
        return $this->list_cicilan[$pos];
    }
    public function getJumlahCicilan(){
        return count($this->list_cicilan);
    }
    public function getTotalCicilan(){
        $total = 0;
        foreach($this->list_cicilan as $row){
            $total += $row->getRemainingBalance();
        }
        return $total;
    }
   
    
    
}

?>
