<?php 
class Hrd_Models_App_Box_MatrixCompetencyProcessor extends Hrd_Models_App_Box_Processor {
    
    public function afterFillData($object) {
        $this->insertKimung($object);
        
        return $object;
    }
    
    public function daoSave($dao, $object) {
        return $dao->save($object);
    }
    
    public function insertKimung($matrixcompetency) {
        $data = $this->getData();
        
        foreach ($data['details'] as $dd) {
            $deleted = (boolean) $dd["deleted"];
            
            if (!$deleted) {
                $newmatrix          = new Hrd_Models_Performancemanagement_MatrixCompetency();
                $newmatrix->compid  = $dd["competency_id"];
                $newmatrix->bandid  = $matrixcompetency->bandid;
                $newmatrix->jobid   = $matrixcompetency->jobid;
                $newmatrix->headerid   = $matrixcompetency->headerid;
				if(!isset($dd["matrixcompetency_id"])){
					$dd["matrixcompetency_id"] = '';
				}
                $newmatrix->matrixcompetency_id   = $dd["matrixcompetency_id"];
                $newmatrix->levelid = array_key_exists("level_category_id", $dd)?$dd["level_category_id"]:0;
                
                $matrixcompetency->addDetail($newmatrix);
            }
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($matrixcompetency);
        $de->generate();
    }
    
    
}
?>