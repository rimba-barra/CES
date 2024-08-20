<?php

class Hrd_Models_App_Box_ScoringbscProcessor extends Hrd_Models_App_Box_Processor {

    public function afterFillData($object) {
        $this->dataToDetail($object);
        return $object;
    }

    public function daoSave($dao, $object) {
        return $dao->save($object);
    }

    public function dataToDetail($paramdata) {
        $data = $this->getData();
        $header_id = $data['scoringbsc_id'];
        $project_id = $data['project_id'];
        foreach ($data['details'] as $dd) {
            $deleted = (boolean) $dd["deleted"];
            if (!$deleted) {
                $newmodel = new Hrd_Models_Master_Scoringbsc_Scoringbscdetail();
                $newmodel->setId($dd["scoringbsc_detail_id"]);
                $newmodel->scoringbsc_id = $header_id;
                $newmodel->project_id = $project_id;
                $newmodel->rating = $dd["rating"];
                $newmodel->batas_atas = $dd["batas_atas"];
                $newmodel->batas_bawah = $dd["batas_bawah"];
                $newmodel->interval = $dd["interval"];
                $newmodel->deleted = $dd["deleted"];
                $newmodel->rating_range = $dd["rating_range"];
                $paramdata->addDetail($newmodel);
            }
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($paramdata);
        $de->generate();
    }

}

?>