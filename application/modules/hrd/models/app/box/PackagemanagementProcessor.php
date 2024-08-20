<?php

class Hrd_Models_App_Box_PackagemanagementProcessor extends Hrd_Models_App_Box_Processor {

    public function afterFillData($object) {
        $this->dataToDetail($object);
        return $object;
    }

    public function daoSave($dao, $object) {
        return $dao->save($object);
    }

    public function dataToDetail($paramdata) {
        $data = $this->getData();
        $header_id = $data['pmdocument_id'];
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];
		
        $obj = new Hrd_Models_Master_Packagemanagement_Packagemanagement();
        $model = new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();     
        $user_id = $obj->getUserlogin();
      
        foreach ($data['details'] as $dd) {
            $deleted = (boolean) $dd["deleted"];
            if (!$deleted) {
                $newmodel = new Hrd_Models_Master_Packagemanagement_Packagemanagementdetail();
                $newmodel->setId($dd["pmdocument_detail_id"]);
                $newmodel->pmdocument_id = $header_id;
                $newmodel->project_id = $project_id;
                $newmodel->pt_id = $pt_id;
                $newmodel->jenisdocument_id = $dd["jenisdocument_id"];
                $newmodel->bobot = $dd["bobot"];
                $newmodel->deleted = $dd["deleted"];
                if(empty($dd["pmdocument_detail_id"]) && $header_id > 0){
                   // for insert detail if condition edit / update                                 
                   $model->Insertdetail($project_id,$pt_id,$header_id,$user_id,$dd);
                }else{
                     $paramdata->addDetail($newmodel);
                }
            }else if($header_id > 0){
                $model->Deletedetail($dd["pmdocument_detail_id"], $user_id);
            }
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($paramdata);
        $de->generate();
    }

}

?>