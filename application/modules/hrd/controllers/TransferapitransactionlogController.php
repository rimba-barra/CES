<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TransferapitransactionlogController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'transferapitransactionlog', array(), array()));
        $dm->setObject(new Hrd_Models_Transferapi_Transferapitransactionlog());
        $dm->setDao(new Hrd_Models_Transferapi_TransferapitransactionlogDao());
        // $dm->setValidator(new Hrd_Models_Training_Trainingoutstanding_Validator());
        $dm->setIdProperty("transferapitransactionlog_id");
        return $dm;
    }

    public function getTransactionRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        /// pt list access
        $dao = new Hrd_Models_Master_Ptaccess_Dao();
        $ptFilter = new Hrd_Models_Master_Ptaccess_PtAccess();
        $ptFilter->setUserid($this->getAppSession()->getUserId());
        $ptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil_pt = $dao->getAllWoPL($ptFilter);

        /// pt list x cherry
        $dao_pt_cherry = new Hrd_Models_Companycherry_Dao();
        $pt_cherryFilter = new Hrd_Models_Companycherry_Companycherry();
        
        $RowNum = 0;
        $temp_pt_cherry = null;

        foreach($hasil_pt[1] as $key => $item){
            
            $pt_cherryFilter->setPtptId($item['ptpt_id']);
            $hasil_pt_cherry = $dao_pt_cherry->getAllWoPL($pt_cherryFilter);
            
            if($hasil_pt_cherry[0][0]['totalRow'] > 0){
                $RowNum++;
                $temp_pt_cherry[] = array(
                                            'RowNum'        => $RowNum,
                                            'ptpt_id'       => $item['ptpt_id'],
                                            'ptpt_name'     => $item['ptpt_name'],
                                            'company_code'  => $hasil_pt_cherry[1][0]['company_code']
                );
            }
        }


        $allpt_cherry = array();
        foreach ($temp_pt_cherry as $record){
    
            $pt_cherry = new Hrd_Models_Companycherry_Companycherry();
            $pt_cherry->setArrayTable($record);
            $allpt_cherry[] = $pt_cherry;
        }

        $dm->setHasil(array($allpt_cherry));
        return $dm;
        
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }

    public function exportdataRead() {
        $data = $this->getAppData();
        $obj = new Hrd_Models_Transferapi_TransferapitransactionExport();
        $post_data = Zend_Json::decode(Zend_Controller_Action::getRequest()->getPost('data'));

        // print_r($post_data);die();
        
        $result = $obj->exceldata($post_data);  
        $hasil = TRUE;
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($result));
        
    }
}

?>
