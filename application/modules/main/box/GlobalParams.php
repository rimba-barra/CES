<?php
class Main_Box_GlobalParams {
    static $EXEC_SP = array(); ////// Add by Erwin.St 020822 for debug
    
    static $administrator_cashier = [
        14571,       // INDRAT
        14713,       // SANGGI
        24769,       // BAGAS
        25407,       // AJI
        25460,       // SEFTIAN
        26042        // YUDHISTIRA
    ];
    
    public function getVar(){
     
        return get_object_vars($this);
    }
}
?>