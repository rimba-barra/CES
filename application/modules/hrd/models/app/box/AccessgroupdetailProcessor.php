<?php

class Hrd_Models_App_Box_AccessgroupdetailProcessor extends Hrd_Models_App_Box_Processor {

    public function afterFillData($object) {
        $this->dataToDetail($object);
        return $object;
    }

    public function daoSave($dao, $object) {
        return $dao->save($object);
    }
    
    public function dataToDetail($paramdata) {
        $data = $this->getData();
        $header_id = $data['accessgroup_id'];
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];
		
        $obj = new Hrd_Models_Accessgroupdetail_Accessgroupdetail();
        $model = new Hrd_Models_Accessgroupdetail_AccessgroupdetailDao();     
        $user_id = $obj->getUserlogin();
        
        foreach ($data['details'] as $dd) {
			$newmodel = new Hrd_Models_Accessgroupdetail_Accessgroupdetaildetail();
			$newmodel->setId($dd["accessgroup_detail_id"]);
			$newmodel->accessgroup_id = $dd["accessgroup_id"];
			$newmodel->accessgroup_detail_id = $dd["accessgroup_detail_id"];
			$newmodel->project_id = $project_id;
			$newmodel->pt_id = $pt_id;
			$newmodel->group_id = $dd["group_id"];
			$newmodel->group = $dd["group"];
			$newmodel->is_approve = $dd["is_approve"];
			$newmodel->approveon = $dd["approveon"];
			$newmodel->is_reject = $dd["is_reject"];
			$newmodel->rejecton = $dd["rejecton"];
			$newmodel->deleted = $dd["deleted"];
			$newmodel->is_submitforapproval = $dd["is_submitforapproval"];
			$newmodel->approveby_name = $dd["approveby_name"];
			$newmodel->rejectby_name = $dd["rejectby_name"];
			$paramdata->addDetail($newmodel);
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($paramdata);
        $de->generate();
    }

}

?>