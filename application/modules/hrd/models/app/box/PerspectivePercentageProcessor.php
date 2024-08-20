<?php

class Hrd_Models_App_Box_PerspectivePercentageProcessor extends Hrd_Models_App_Box_Processor {
    
    public function afterFillData($object) {
        $this->dataToDetail($object);
        
        return $object;
    }
    
    public function daoSave($dao, $object) {
        return $dao->save($object);
    }
	
	
    
    public function dataToDetail($perspectivepercentage) {
        $data = $this->getData();
        //var_dump($data); exit;
        foreach ($data['details'] as $dd) {
			$deleted = (boolean) $dd["deleted"];
            
            if (!$deleted) {
                $newmodel                   = new Hrd_Models_Bsc_PerspectivePercentageDetail();//Hrd_Models_Bsc_PerspectivePercentage();
				$newmodel->setId($dd["perspective_percentage_detail_id"]);
				$newmodel->perspective_percentage_id        = $dd["perspective_percentage_id"];
				$newmodel->perspective_id        = $dd["perspective_perspective_id"];
				$newmodel->percentage        = $dd["percentage"];
				$newmodel->deleted        = $dd["deleted"];
				//$newmodel->setId($dd["perspective_percentage_detail_id"]);
                /*$newmodel->perspectiveId    = $dd["perspective_id"];
                $newmodel->projectId        = $perspectivepercentage->projectId;
                $newmodel->ptId             = $perspectivepercentage->ptId;
                $newmodel->departmentId     = $perspectivepercentage->departmentId;
                $newmodel->percentValue     = array_key_exists("perspectivepercentage_percentage", $dd) ? $dd["perspectivepercentage_percentage"] : 0;
                $newmodel->yearPeriod       = $perspectivepercentage->yearPeriod;
                $newmodel->periodStart      = $perspectivepercentage->periodStart;
                $newmodel->periodEnd        = $perspectivepercentage->periodEnd;
				$newmodel->description        = $perspectivepercentage->description;*/
                
                $perspectivepercentage->addDetail($newmodel);
            }
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($perspectivepercentage);
        $de->generate();
    }
    
    
}
?>