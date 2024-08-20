<?php

class Hrd_Models_App_Box_MonitoringmatrixProcessor extends Hrd_Models_App_Box_Processor {

    public function afterFillData($object) {
        $this->dataToDetail($object);
        return $object;
    }

    public function daoSave($dao, $object) {
        return $dao->save($object);
    }

    public function dataToDetail($paramdata) {
        $data = $this->getData();
        $header_id = $data['accesslevel_id'];
        $project_id = $data['project_id'];
        $pt_id = $data['pt_id'];
		
        $obj = new Hrd_Models_Performancemanagement_Monitoringmatrix();
        $model = new Hrd_Models_Performancemanagement_MonitoringmatrixDao();     
        $user_id = $obj->getUserlogin();
		
        foreach ($data['details'] as $dd) {
			$newmodel = new Hrd_Models_Performancemanagement_Monitoringmatrixdetail();
			$newmodel->setId($dd["accessmatrix_id"]);
			$newmodel->accesslevel_id = $dd["accesslevel_id"];
			$newmodel->accessmatrix_id = $dd["accessmatrix_id"];
			$newmodel->project_id = $project_id;
			$newmodel->pt_id = $pt_id;
			$newmodel->employee_id = $dd["employee_id"];
			$newmodel->status = $dd["status"];
			$newmodel->content = $dd["content"];
			$newmodel->score = $dd["score"];
			$newmodel->comment_general = $dd["comment_general"];
			$newmodel->comment_private = $dd["comment_private"];
			$newmodel->is_approve = $dd["is_approve"];
			$newmodel->deleted = $dd["deleted"];
			$paramdata->addDetail($newmodel);
        }

        $de = new Box_Delien_DelimiterEnhancer();
        $de->setDelimiterCandidate($paramdata);
        $de->generate();
    }

}

?>