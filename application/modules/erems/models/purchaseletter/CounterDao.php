<?php

/**
 * Description of PurchaseLetterDao
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_CounterDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

    public function getNewNumber($projectId,$ptId,$clusterId,$year) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_purchasecounternewnumber_read',$projectId,$ptId,$clusterId,$year);
     
        return $hasil;
    }
    
    public function save(Erems_Models_Purchaseletter_Counter $counter) {
        $hasil = 0;

        
        $hasil = $this->dbTable->SPUpdate('sp_purchasecounternew_create',
                $counter->getProject()->getId(),
                $counter->getPt()->getId(),
                $counter->getCluster()->getId(),
                $counter->getYear(),
                $counter->getNextNumber()
        );
        
        
 
        

        return $hasil;
    }
    
    public function update(Erems_Models_Purchaseletter_Counter $counter) {
        $hasil = 0;

        
        $hasil = $this->dbTable->SPUpdate('sp_purchasecounternew_update',
                $counter->getId(),
                $counter->getNextNumber()
        );
        
        
 
        

        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        
    }

    public function getNewNumberDraft($projectId,$ptId,$clusterId,$year) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchasecounternewnumber_draft_read',$projectId,$ptId,$year);
        return $hasil;
    }

}

?>
