<?php
/**
 * Description of Foo
 *
 * @author MIS
 */
class Erems_Models_Foo_Foo extends Erems_Box_Models_ObjectEmbedData{
    private $akadRealisasionDate;
    private $lunasDate;
    private $SPPJBDate; //sppjb_date
    private $SPPJBTandaTanganDate;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'foo_';
    }
    
    public function getAkadRealisasionDate() {
        return $this->akadRealisasionDate;
    }

    public function setAkadRealisasionDate($akadRealisasionDate) {
        $this->akadRealisasionDate = $akadRealisasionDate;
    }

    public function getLunasDate() {
        return $this->lunasDate;
    }

    public function setLunasDate($lunasDate) {
        $this->lunasDate = $lunasDate;
    }
    
    public function getSPPJBDate() {
        return $this->SPPJBDate;
    }

    public function setSPPJBDate($SPPJBDate) {
        $this->SPPJBDate = $SPPJBDate;
    }

    public function getSPPJBTandaTanganDate() {
        return $this->SPPJBTandaTanganDate;
    }

    public function setSPPJBTandaTanganDate($SPPJBTandaTanganDate) {
        $this->SPPJBTandaTanganDate = $SPPJBTandaTanganDate;
    }

        
    public function setArrayTable($dataArray=NULL) {
       // $x = $dataArray;
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['akad_realisasiondate'])){
          $this->setAkadRealisasionDate($x['akad_realisasiondate']);
        }
        if(isset ($x['lunas_date'])){
          $this->setLunasDate($x['lunas_date']);
        }
        if(isset ($x['sppjb_date'])){
          $this->setSPPJBDate($x['sppjb_date']);
        }
        if(isset ($x['tandatangan_date'])){
          $this->setSPPJBTandaTanganDate($x['tandatangan_date']);
        }
        unset($x);
        
        /*end add voucher*/
        
    }
    
    public function getArrayTable(){
        $x = array(
            'akad_realisasiondate'=>$this->getAkadRealisasionDate(),
            'lunas_date'=>$this->getLunasDate(),
            'sppjb_date'=>$this->getSPPJBDate(),
            'tandatangan_date'=>$this->getSPPJBTandaTanganDate()
            
        );
        return $x;
    }


}

?>
