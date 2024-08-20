<?php

class Hrd_Models_App_Box_KelompokabsensiProcessor extends Hrd_Models_App_Box_Processor {

    public function afterFillData($object) {
        $this->dataToDetail($object);
        return $object;
    }

    public function daoSave($dao, $object) {
        return $dao->save($object);
    }

    public function dataToDetail($paramdata) {
        $data = $this->getData();
        $header_id = $data['kelompokabsensi_id'];
        $project_id = $data['project_id'];
        $name = $data['name'];
        if (count($data['details']) > 0) {
            foreach ($data['details'] as $dd) {
                $deleted = (boolean) $dd["deleted"];
                if (!$deleted) {
                    $newmodel = new Hrd_Models_Master_Kelompokabsensi_Kelompokabsensidetail();
                    $newmodel->setId($dd["kelompokabsensi_detail_id"]);
                    $newmodel->kelompokabsensi_id = $header_id;
                    $newmodel->employee_id = employee_id;
                    $paramdata->addDetail($newmodel);
                }
            }
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($paramdata);
        $de->generate();
    }

}

?>