<?php

class Erems_Libraries_Payment {
    // edit 8 okt
    //private $pl_id = 0; 
    //edit 8 okt
    //private $pl_model = NULL; 
    private $p_value = 0; // payment value
    private $error = array();
    private $cdn_value = 0; /// 0 -> none , 1 -> credit , 2 -> debit
    private $cdn_amount = 0.0;
    private $tagihan = NULL; /// object tagihan
    private $tagihan_paid = NULL; /// object tagihan yang terbayar saja
    private $sch_data = NULL; /// added 8 Okt deleted 8 okt

    public function __construct() {
        $this->error = array();
    }

    public function set_cdn_value($v) {
        $this->cdn_value = intval($v);
    }
    
    public function get_cdn_value(){
        return $this->cdn_value;
    }
    
    public function get_cdn_amount(){
        return $this->cdn_amount;
    }

    public function set_p_value($v) {
        $this->p_value = floatval($v);
    }
    // add 10 okt 
    public function get_p_value(){
        return $this->p_value;
    }
    

     /// edit 8 okt
//    public function set_pl_id($id) {
//        $this->pl_id = intval($id);
//    }

    /// edit 8 okt
//    public function set_pl_model($m) {
//        $this->pl_model = $m;
//    }
    
    // added 8 Okt edited 8 okt
    public function setTagihan($d,$pd){
        if(get_class($d)=='Erems_Libraries_Tagihan'){
            $this->tagihan = $d;
            /// create null paid tagihan
            $this->tagihan_paid = $pd;
        }
        
        
        
    }

    public function process() {
        if (!$this->valid_input())
            return false;



        $this->calculate();
    }

    private function formula($pv, $rb, & $nrb, & $sisa) {
        $nrb = $rb;

        if ($pv >= $rb) {
            $nrb = 0;
            $sisa = $pv - $rb;
        } else {
            $nrb = $rb - $pv;
            $sisa = 0;
        }
        return true;
    }

    private function calculate() {
        $pv = $this->p_value;

        $nrb = 0;
        $sisaPayment = 0.0;
        $currentRb = 0; /// current remaining balance

        
        $currentCicilan = 0;


        $jumlahCicilan = $this->tagihan->getJumlahCicilan();

        
        while ($pv > 0 && key_exists($currentCicilan, $this->tagihan->getListCicilan())) {

            $currentRb = $this->tagihan->getCicilan($currentCicilan)->getRemainingBalance();
            $this->formula($pv, $currentRb, $nrb, $sisaPayment);
            $this->tagihan_paid->addCicilan($this->tagihan->getCicilan($currentCicilan));
            $this->tagihan_paid->getCicilan($currentCicilan)->setRemainingBalance($nrb);
            //$this->tagihan_paid->getCicilan($currentCicilan)->setPayValue($pv);
            $pv = $sisaPayment;

            $currentCicilan++;
        }


        /// let's check credit debit note
        /* Credit debit note hanya berlaku jika cicilan yang tersisa tinggal satu [cicilan terakhir] */
        if ($pv > 0) {
            if ($this->cdn_value == 2) {
                $this->cdn_amount = $pv;
            }
        } else {
            
            if ($this->cdn_value == 1 && ($currentCicilan == $jumlahCicilan)) {
                $this->cdn_amount = $this->tagihan_paid->getCicilan($currentCicilan - 1)->getRemainingBalance();
                $this->tagihan_paid->getCicilan($currentCicilan - 1)->setRemainingBalance(0);
            }
        }
        
   
    }

    private function valid_input() {
// edit 8 okt
//        if (get_class($this->pl_model) != 'Erems_Models_Purchaseletter')
//            $this->error[] = 'No model';
//        
//        if ($this->pl_id == 0)
//            $this->error[] = 'No purchase letter id';
  // end edit 8 okt
        if ($this->p_value == 0)
            $this->error[] = 'No Payment Value';
        if (count($this->error) > 0) {
            return false;
        }
        return true;
    }

    public function print_error() {
        $str = '';
        if (count($this->error) > 0) {
            foreach ($this->error as $row) {
                $str .='' . $row . '</br>';
            }
        }
        return $str;
    }
    
    public function getTagihanPaid(){
        return $this->tagihan_paid;
    }
    
    

}

?>
