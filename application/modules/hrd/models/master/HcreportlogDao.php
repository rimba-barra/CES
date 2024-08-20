<?php
/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Master_HcreportlogDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {
    /* start added by ahmad riadi 30-05-2017 */
    public $setup =null;
    public function __construct() {
        parent::__construct();
        $this->setup = new Hrd_Models_General_Setup();
    }
        
    public function getAll(Box_Models_App_HasilRequestRead $r,  Hrd_Models_Master_Hcreportlog $d){
       $hasil = 0;      
            
        $data = $this->dbTable->SPExecute('sp_log_hcreport_read', 
            $this->setup->_project_id,
            $this->setup->_pt_id, 
            $d->getReporttype(), 
            $d->getCutoffdate(), 
            $d->getIsmark(), 
            $d->getMarkmonth(), 
            $d->getMarkyear(), 
            $r->getPage(), 
            $r->getLimit()
        );
        
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $hasil = array(array(array("totalRow" => $totalrow)), $result);        
        return $hasil;
    }

    public function update(Hrd_Models_Master_Hcreportlog $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPUpdate('sp_log_hcreport_update', 
            $em->getAddBy(), 
            $this->setup->_project_id,
            $this->setup->_pt_id, 
            $em->getId(), 
            $em->getIsmark(),
            $em->getMarkmonth(),
            $em->getMarkyear()
        );
        return $hasil;
    }

    public function save(Hrd_Models_Master_Hcreportlog $d) {
        
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {        
       
    }

}

?>
