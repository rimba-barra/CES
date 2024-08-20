<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_MasterskController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'mastersk', array(), array()));
        $dm->setObject(new Hrd_Models_Master_Sk_MasterSK());
        $dm->setDao(new Hrd_Models_Master_Sk_Dao());
        $dm->setValidator(new Hrd_Models_Master_Sk_Validator());
        $dm->setIdProperty("mastersk_id");
        return $dm;
    }

    public function detailRead() {
        
        $em = new Hrd_Models_Master_Kategorisk_MasterKategoriSK();
        $em->setProjectKP($this->getAppSession()->getProject());
        $em->setPtKP($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Master_Kategorisk_Dao();
        //$allmasterkategori = $dao->getAllJustActiveWOPL($em);
        $allmasterkategori = $dao->getAllWoPLKP($em);
        
        if(Box_Tools::adaRecord($allmasterkategori)){
            $allmasterkategori = Box_Tools::toObjectsb("masterkategorisk", $allmasterkategori,FALSE);
        }
        return Box_Tools::instantRead(array(), array($allmasterkategori));

    }

    public function uploadRead() {

        $ses = $this->getAppSession();


        $data = $this->getAppData();

        $msg = '???';
        $success = FALSE;
        $modeUpload = $data["type"];
      
        $fileName = "";
        $fileUpload = NULL;

        if ($modeUpload == "dokumen") {
            $fileUpload = new Box_Models_App_FileUpload("/public/app/hrd/uploads/mastersk/dokumen/", "mastersk_" . $ses->getProject()->getId() . "_" . $ses->getPt()->getId() . "_DOKUMEN_" . time(), "pdf");


            $fileUpload->run();
            if (!$fileUpload->isSuccess()) {
                $msg = $fileUpload->getErrorMsg();
            } else {
                $success = TRUE;
                $fileName = $fileUpload->getFileName();
                $msg = $fileName;
            }
        }





        $arrayRespon = array("HASIL" => $success, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getmasterskkantorpusatRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'mastersk', array(), array());
        $dao = new Hrd_Models_Master_Sk_Dao();
        $obj = new Hrd_Models_Master_Sk_MasterSK();
        $obj->setArrayTable($this->getAppData());
        $hasil = $dao->getAllDefaultBrowse($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function getmasterskRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'mastersk', array(), array());
        $dao = new Hrd_Models_Master_Sk_Dao();
        $obj = new Hrd_Models_Master_Sk_MasterSK();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $obj->setActive(1);
        $hasil = $dao->getAllDefaultApply($obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function createfromimportRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $userid = $this->getAppSession()->getUser()->getId();
        $dao = new Hrd_Models_Master_Sk_Dao();
        $obj = new Hrd_Models_Master_Sk_MasterSK();
        $data = $this->getAppData();
        $paramdata = Zend_Json::decode($data['data']);

        if (is_array($paramdata)) {
            if (!empty($paramdata)) {
                foreach ($paramdata as $row) {
                    $row['project_id'] = $projectId;
                    $row['pt_id'] = $ptId;
                    $row['user_id'] = $userid;
                    $obj->setArrayTable($row);
                    $hasil = $dao->getAllDefaultBrowse($obj);
                    $totaldata = $hasil[0][0]['totalRow'];
                    if ($totaldata < 1) {                      
                        $dao->savefromimport($row);
                    }
                }
            }
        }
        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function createtoexportRead() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $projectId = $this->getAppSession()->getProject()->getId();
        $ptId = $this->getAppSession()->getPt()->getId();
        $userid = $this->getAppSession()->getUser()->getId();
        $dao = new Hrd_Models_Master_Sk_Dao();
        $obj = new Hrd_Models_Master_Sk_MasterSK();
        $data = $this->getAppData();
        $paramdata = Zend_Json::decode($data['data']);

        //project pt yang dikasih akses
        $dao_projectpt = new Hrd_Models_Master_Projectpt_Dao();
        $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectptFilter->setUserid($this->getAppSession()->getUserId());
        $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil_projectpt = $dao_projectpt->getAllWoPL($projectptFilter);

        $temp_data = array();
        if (is_array($paramdata)) {
            if (!empty($paramdata)) {
                foreach($hasil_projectpt[1] as $key => $item){
                    if($item['project_id'] != $projectId && $item['pt_id'] != $ptId){
                        foreach ($paramdata as $row) {
                            $row['project_id'] = $item['project_id'];
                            $row['pt_id'] = $item['pt_id'];
                            $row['user_id'] = $userid;
                            $obj->setArrayTable($row);
                            $hasil = $dao->getAllDefaultApply_Data($obj);
                            $totaldata = $hasil[0][0]['totalRow'];

                            if ($totaldata < 1) {                      
                                $dao->savetoexport($row);
                                $temp_data[]=$row;
                            }
                        }
                    }
                }
                if($temp_data){
                    $getdistinct_root = $dao->sendemail_getroot($temp_data);
                    $group_employeeroot = array();
                    foreach($getdistinct_root[0] as $key_root => $item_root){
                        $employee_root = $item_root['employee_id'];
                        foreach($temp_data as $key_data => $item_data){
                            $employee_root_project = $item_data['project_id'];
                            $employee_root_pt = $item_data['pt_id'];
                            $data_parse = array(
                                    'mastersk_name' => $item_data['name'],
                                    'employee_id' => $employee_root,
                                    'project_id'  => $employee_root_project,
                                    'pt_id'       => $employee_root_pt);
                            $getdistinct_root_projectpt = $dao->sendemail_getroot_projectpt($data_parse);
                            if($getdistinct_root_projectpt[0]){
                                $group_employeeroot[$getdistinct_root_projectpt[0][0]['employee_id']][] = $getdistinct_root_projectpt[0][0];
                            }
                        }
                    }
                    if($group_employeeroot){
                        foreach($group_employeeroot as $key_email => $item_email){
                            $employee_id_email =  $key_email;
                            $getroot_projectpt_email = $dao->sendemail_getroot_email($employee_id_email);
                            $sendemail = $dao->sendemail($getroot_projectpt_email[0][0]['email_ciputra'], $item_email);
                        }
                    }
                }
            }
        }

        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

}

?>
