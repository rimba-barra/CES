<?php

/**
 * Description of NumberCounter
 *
 * @author TOMMY-MIS
 */
class Erems_Models_General_NumberCounter {

    private $projectId;
    private $ptId;
    private $clusterId;
    private $clusterCode;
    private $docDate; // nomor dokumen
    private $number;
    private $counter;

    public function __construct($projectId = 0, $ptId = 0, $clusterId = 0, $clusterCode = "CLUSTERCODE", $docDate) {
        $this->projectId = $projectId;
        $this->ptId = $ptId;
        $this->clusterId = $clusterId;
        $this->clusterCode = $clusterCode;
        $this->docDate = $docDate;
    }

    public function process() {
        // GENERATE NOMOR DOKUMEN
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();

        // $unitDb = $this->unitDb;
        // $purchaseletter = $this->purchaseletter;

        $counter = new Erems_Models_Purchaseletter_Counter();
        $counter->setYear(date("Y", strtotime($this->docDate)));
        $counter->getProject()->setId($this->projectId);
        $counter->getPt()->setId($this->ptId);
        $counter->getCluster()->setId($this->clusterId);

        $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $counter->getPt()->getId(), $counter->getCluster()->getId(), $counter->getYear());
        $lastNumber = Erems_Box_Tools::toObjectRow($lastNumber, new Erems_Models_Purchaseletter_Counter());
        $counter->setId($lastNumber->getId());

        if (intval($lastNumber->getNextNumber()) == 0) {

            $lastNumber->setNextNumber(1);
        }


        $paramsNomor = array(
            "nomor" => $lastNumber->getNextNumber(),
            "project_id" => $counter->getProject()->getId(),
            "pt_id" => $counter->getPt()->getId(),
            "purchase_date" => $this->docDate,
            "cluster_code" => $this->clusterCode
        );

        $this->number = $this->getNewNomor($paramsNomor);
        $this->counter = $counter;
        // $purchaseletter->setNomor($newNomor);
        // /GENERATE NOMOR DOKUMEN
       /*
        $hasilSave = $dao->save($object);
        if ($hasilSave) {

            $counter->setNextNumber(intval($newNomor) + 1);

            if ($counter->getId() == 0) {
                $hasilSaveCounter = $daoCounter->save($counter);
            } else {
                $hasilSaveCounter = $daoCounter->update($counter);
            }
        }
        
        */
        
        return $this->number;
    }

    public function save() {
        $hasilSaveCounter = FALSE;
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();
        $this->counter->setNextNumber(intval($this->number) + 1);
        
        if ($this->counter->getId() == 0) {
            $hasilSaveCounter = $daoCounter->save($this->counter);
        } else {
            $hasilSaveCounter = $daoCounter->update($this->counter);
        }
        
        return $hasilSaveCounter;
    }
    
    private function getNewNomor($paramsNomor){
    
        $subj = new Erems_Models_Purchaseletter_NomorSubject();
        $subj->attach(new Erems_Models_Purchaseletternomor_Local());
        $subj->attach(new Erems_Models_Purchaseletternomor_Biasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOff);
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOrc());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarRes());
        $subj->attach(new Erems_Models_Purchaseletternomor_BmwCilegon());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraIndah());
        $subj->setPurchaseParams($paramsNomor);
       
        return $subj->getPurchaseNomor();
    }
    
    public function getNumber(){
        return $this->number;
    }
    
    

}
