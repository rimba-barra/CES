<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_CompanycherryController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'companycherry', array(), array()));
        $dm->setObject(new Hrd_Models_Companycherry_Companycherry());
        $dm->setDao(new Hrd_Models_Companycherry_Dao());
        $dm->setValidator(new Hrd_Models_Companycherry_Validator());
        $dm->setIdProperty("company_id");
        return $dm;
    }

    public function detailRead() { 

        /// pt list
        $dao = new Hrd_Models_Master_Ptaccess_Dao();
        $ptFilter = new Hrd_Models_Master_Ptaccess_PtAccess();
        $ptFilter->setUserid($this->getAppSession()->getUserId());
        $ptFilter->setGroupid($this->getAppSession()->getGroupId());
        //$hasil_pt = $dao->getAllWoPL($ptFilter);
        $hasil_pt = $dao->getAllCreate($ptFilter);

        $allpt = array();
        foreach ($hasil_pt[1] as $record){
    
            $pt = new Hrd_Models_Master_Ptaccess_PtAccess();
            $pt->setArrayTable($record);
            $allpt[] = $pt;
        }

        return Box_Tools::instantRead(array(), array($allpt));

    }

    public function urlusernameRead(){

        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();

        //get url username CHERRY
        $get_urlusername = $dao->getUrlUsername($this->getAppRequest(), $em, $this->getAppSession());
        if($get_urlusername[0][0]['totalRow'] > 0){
            $url = $get_urlusername[1][0]['url'];
            $username = $get_urlusername[1][0]['username'];
            $password = $get_urlusername[1][0]['password'];
        }else{
            $url = '';
            $username = '';
            $password = '';
        }
        
        $arrayRespon = array("url" => $url, "username" => $username, "password" => $password);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function checkcompanyRead(){

        $data = $this->getAppData();
        $ptpt_id = $data['ptpt_id'];
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        $get = $dao->getCheckCompany($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $get[0];
        
        if($hasil){
            $action_to_cherry = 'update';
        }else{
            $action_to_cherry = 'insert';
        }

        //get ptName
        $get_ptname = $dao->getPtName($this->getAppRequest(), $em, $this->getAppSession(),$data);
        if($get_ptname[0][0]['totalRow'] > 0){
            $ptname = $get_ptname[1][0]['name'];
        }else{
            $ptname = '';
        }

        $arrayRespon = array("ACTION_TO_CHERRY" => $action_to_cherry, "HASIL" => $hasil, "PTNAME" => $ptname);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savemasterRead(){

        $data = $this->getAppData();
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        $save = $dao->saveMaster($this->getAppRequest(), $em, $this->getAppSession(),$data);
        $hasil = $save;
        
        if($hasil){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("MSG" => $message, 'hasil' => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savelogRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        if($data['action'] == 'insert'){
            $save = $dao->saveLog($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult);
            $hasil = $save;
        }else{
            $hasil = '';
        }
        
        if($hasil){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("MSG" => $message, 'hasil' => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    //REMOVE
    public function getcompanyRead(){

        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();

        $data = $this->getAppData();
        $company_id = $data['company_id'];
        $arr_company_id = explode('~', $company_id);

        $temp = '';
        $hasil = '';
        $sudah_ada_data = 0;
        foreach($arr_company_id as $key => $item){
            if($item){
                $get_before = $dao->checkbefore($this->getAppRequest(), $em, $this->getAppSession(),$data,$item);
                
                if($get_before[0]){
                    $sudah_ada_data = 1;
                }else{
                    $sudah_ada_data = 0;
                }
                
                if($sudah_ada_data == 0){
                    $get = $dao->getDataCompany($this->getAppRequest(), $em, $this->getAppSession(),$data,$item);
                    $hasil[] = $get[0][0];
                }
                
            }
        }

        // $hasil = json_encode($hasil);

        if($hasil){
            $action_to_cherry = 'delete';
        }else{
            $action_to_cherry = '';
        }


        $arrayRespon = array("ACTION_TO_CHERRY" => $action_to_cherry, "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function deletemasterRead(){

        $data = $this->getAppData();
        $jsonStringHasil = json_decode($data['hasil'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        $delete = $dao->deleteMaster($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringHasil);
        $hasil = $delete;
        
        if($hasil){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("MSG" => $message, 'hasil' => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savelogdeleteRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        $jsonStringHasil = json_decode($data['hasil'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        if($data['action'] == 'delete'){
            $save = $dao->saveLogDelete($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult,$jsonStringHasil);
            $hasil = $save;
        }else{
            $hasil = '';
        }
        
        if($hasil){
            $message = 'berhasil';
        }else{
            $message = 'gagal';
        }

        $arrayRespon = array("MSG" => $message, 'hasil' => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function savetaxstatusRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        $save = $dao->saveTaxStatus($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult);
        $hasil = $save;

        if($hasil){
            $message = 'berhasil tax status';
        }else{
            $message = 'gagal tax status';
        }

        $arrayRespon = array("MSG" => $message);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function saveempstatusRead(){

        $data = $this->getAppData();   
        $jsonStringResult = json_decode($data['jsonStringResult'], true);
        
        $em = new Hrd_Models_Companycherry_Companycherry();
        $dao = new Hrd_Models_Companycherry_Dao();
        
        $save = $dao->saveEmpStatus($this->getAppRequest(), $em, $this->getAppSession(),$data,$jsonStringResult);
        $hasil = $save;

        if($hasil){
            $message = 'berhasil emp status';
        }else{
            $message = 'gagal emp status';
        }

        $arrayRespon = array("MSG" => $message);
        return Box_Tools::instantRead($arrayRespon);
    }
    

    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }
    


}

?>
