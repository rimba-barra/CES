<?php

/**
 * Description of DataList
 *
 * @author MIS
 */
class Cashier_Box_Models_App_DataList extends Cashier_Box_Kouti_AbDataList {

    private $embedMember = array();
    private $master;
    private $aksesoris = array(); 
    
    public function __construct($dataDao,$master,$member,$aksesoris=array()) {
        parent::__construct($dataDao);
        $this->setMaster($master);
        $this->setEmbedMember($member);
        if(is_array($aksesoris)){
            $this->setAksesoris($aksesoris);
        }
        
    }

    public function setEmbedMember($embedMember) {
        $this->embedMember = $embedMember;
    }

    public function setMaster($master) {
        $this->master = $master;
    }

    public function getEmbedMember() {
        return $this->embedMember;
    }

    public function getMaster() {
        return $this->master;
    }
    
    public function getAksesoris() {
        return $this->aksesoris;
    }

    public function setAksesoris($aksesoris) {
        $this->aksesoris = $aksesoris;
    }


  

}

?>
