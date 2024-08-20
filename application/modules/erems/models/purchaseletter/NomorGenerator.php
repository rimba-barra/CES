<?php

/**
 * Description of NomorGenerator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_NomorGenerator {

    public function getNomor(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter, Erems_Models_Unit_UnitTran $unit) {

        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();

        // $unitDb = $this->unitDb;
        // $purchaseletter = $this->purchaseletter;
        $msg = NULL;
        $valid = FALSE;
        if ($unit->getProject()->getId() == 0) {
            $msg = "Project id tidak valid";
        } else if ($unit->getPt()->getId() == 0) {
            $msg = "Pt id tidak valid";
        } else if ($unit->getCluster()->getId() == 0) {
            $msg = "Cluster id tidak valid";
        } else if (strlen($purchaseletter->getDate()) < 3) {
            $msg = "Tanggal purchaseletter tidak valid";
        } else if (!$unit->getCluster()->getCode()) {
            $msg = "Cluster code tidak valid";
        } else if (!$unit->getProductCategory()->getName()) {
            $msg = "Nama Product Category tidak valid";
        } else if (!$unit->getBlock()->getCode()) {
            $msg = "Block Code tidak valid";
        } else {
            $valid = TRUE;
        }

        if (!$valid) {
            return array(
                "msg" => $msg,
                "status" => FALSE
            );
        }

        $counter = new Erems_Models_Purchaseletter_Counter();
        $counter->setYear(date("Y", strtotime($purchaseletter->getDate())));
        $counter->getProject()->setId($unit->getProject()->getId());
        $counter->getPt()->setId($unit->getPt()->getId());
        //$counter->getCluster()->setId($unitDb[1][0]["cluster_id"]);
        $isResetByCounter = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($unit->getProject()->getId(), $unit->getPt()->getId())->getIsPurchaseNomorResetByCluster();

        // kalau reset hanya per tahun makan set cluster = 0 , jika pakai per tahun dan per cluster set cluster by unit
        $counter->getCluster()->setId($isResetByCounter == 1 ? $unit->getCluster()->getId() : 0);


        if ($isResetByCounter < 0) { // tidak reset per tahun dan cluster
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $counter->getPt()->getId(), 0, 0);
        } else {
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $counter->getPt()->getId(), $counter->getCluster()->getId(), $counter->getYear());
        }


        $lastNumber = Erems_Box_Tools::toObjectRow($lastNumber, new Erems_Models_Purchaseletter_Counter());



        $counter->setId($lastNumber->getId());

        if (intval($lastNumber->getNextNumber()) == 0) {

            $lastNumber->setNextNumber(1);
        }


        $paramsNomor = array(
            "nomor"                => $lastNumber->getNextNumber(),
            "project_id"           => $counter->getProject()->getId(),
            "pt_id"                => $counter->getPt()->getId(),
            "purchase_date"        => $purchaseletter->getDate(),
            "cluster_code"         => $unit->getCluster()->getCode(),
            "productcategory_code" => $unit->getProductCategory()->getName() == "BANGUNAN" ? "B" : "K",
            "block_code"           => $unit->getBlock()->getCode(),
            "purpose_code"         => $unit->getPurpose()->getCode(),
        );



        $nomorUseGenco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($counter->getProject()->getId(), $counter->getPt()->getId())->isNomorUseGenco();

        if ($nomorUseGenco) {
            $newNomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($counter->getProject()->getId(), $counter->getPt()->getId())->getPurchaseNomorTpl($paramsNomor);
        
            
            return array(
                "msg" => "SUKSES",
                "new_nomor" => $newNomor,
                "counter_obj" => $counter,
                "status" => TRUE
            );
            
        } else {
            $hasilGetNewNomor = $this->getNewNomor($paramsNomor);

            if (!$hasilGetNewNomor["status"]) {
                return array(
                    "msg" => $hasilGetNewNomor["msg"],
                    "status" => FALSE
                );
            }



            return array(
                "msg" => "SUKSES",
                "new_nomor" => $hasilGetNewNomor["new_nomor"],
                "counter_obj" => $counter,
                "status" => TRUE
            );
        }
    }

    private function getNewNomor($paramsNomor) {




        $dir = APPLICATION_PATH . "\\modules\\erems\\models\\purchaseletternomor\\";



        $files = scandir($dir);
        // var_dump($files);
        if (is_array($files) && count($files) > 0) {

            $subj = new Erems_Models_Purchaseletter_NomorSubject();

            $projectPtValid = array();

            $statusErr = NULL;

            foreach ($files as $fn) {


                $className = 'Erems_Models_Purchaseletternomor_' . basename($fn, ".php");


                if (class_exists($className)) {



                    $myclass = new $className;
                    if ($myclass instanceof Erems_Models_Purchaseletter_NomorObserver) {
                        $projectPTText = $myclass->getProjectId() . "_" . $myclass->getPtId();
                        if (!in_array($projectPTText, $projectPtValid)) {
                            $projectPtValid[] = $projectPTText;
                            $subj->attach(new $className());
                        } else {
                            $statusErr = $projectPTText; // configurasi project pt ini sudah terdaftar
                        }
                    }
                }
            }

            if ($statusErr) { // tidak boleh ada configurasi yang menggunakan project_id and pt_id yang sama
                return array(
                    "msg" => "Ada configurasi nomor project pt yang sama " . $statusErr,
                    "status" => FALSE
                );
            }



            $subj->setPurchaseParams($paramsNomor);


            return array(
                "new_nomor" => $subj->getPurchaseNomor(),
                "status" => TRUE
            );
        } else {

            return array(
                "msg" => "Tidak file configurasi",
                "status" => FALSE
            );
        }
    }

    public function updateNomor(Erems_Models_Purchaseletter_Counter $counter, $newNomor) {
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();
        $counter->setNextNumber(intval($newNomor) + 1);
        $hasilSaveCounter = NULL;
        if ($counter->getId() == 0) {
            $hasilSaveCounter = $daoCounter->save($counter);
        } else {
            $hasilSaveCounter = $daoCounter->update($counter);
        }

        return $hasilSaveCounter;
    }

}
