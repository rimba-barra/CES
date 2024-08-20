<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_MasterclusterProcessor extends Erems_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {

        switch ($modeCreate) {
            case "setupsheet":
                return $dao->setupShift($object);
                break;
        }
    }

    private function createDetail($cluster, $data) {
        if(isset($data["detail"])){
            if (is_array($data["detail"])) {
                foreach ($data["detail"] as $image) {
                    $ci = new Erems_Models_Master_ClusterImage();
                    $ci->setArrayTable($image);
                    $cluster->addDetail($ci);
                }

                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($cluster);
                $de->generate();
            }
        }
    }

    public function daoUpdate($dao, $cluster) {

        if ($cluster instanceof Erems_Models_Master_ClusterTran) {
            $data = $this->getData();


            $this->createDetail($cluster, $data);

            $decan = NULL;
            if ($cluster->getId() > 0) {
                $data = $this->getData();
                $de = new Erems_Box_Delien_DelimiterEnhancer();
                $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
                $de->setDelimiterCandidate($decan);
                $de->generate();
            }
        }

        return $dao->update($cluster, $decan);
    }

    public function daoSave($dao, $cluster) {
        if ($cluster instanceof Erems_Models_Master_ClusterTran) {
            $data = $this->getData();

            $this->createDetail($cluster, $data);
        }
        return $dao->save($cluster);
    }

}

?>
