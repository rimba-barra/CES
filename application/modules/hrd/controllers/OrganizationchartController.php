<?php

/**
 * Description of OrganizationController
 *
 * @author MIS
 */
class Hrd_OrganizationchartController extends Hrd_Models_App_Template_AbstractMasterController {
//class Hrd_OrganizationchartController extends Box_Models_App_Hermes_AbstractController {
    
    public function allRead(){
        $ses        = Zend_Controller_Action_HelperBroker::getStaticHelper('session');        
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'organizationchart', array(),array());
        $dao        = $this->getMainDao();
        $obj        = $this->getMainObject();       
        $obj->setArrayTable($this->getAppData());       
        $hasil      = $dao->getAll($this->getAppRequest(),$obj);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'organizationchart', array(), array()));
        $dm->setObject(new Hrd_Models_Organizationchart_Organizationchart());
        $dm->setDao(new Hrd_Models_Organizationchart_OrganizationchartDao());
        $dm->setValidator(new Hrd_Models_Organizationchart_OrganizationchartValidator());
        $dm->setIdProperty("organizationchart_id");
        return $dm;    
    }
    
    public function detailRead() {
        
        $em = new Hrd_Models_Master_Position();
        $dao = new Hrd_Models_Master_PositionDao();
        $allPosition = $dao->getAllWoPL($em); 
        if(Box_Tools::adaRecord($allPosition)){
            $allPosition = Box_Tools::toObjectsb("position", $allPosition,FALSE); 
        }
        return Box_Tools::instantRead(array(), array($allPosition));

    }
    
    public function organizationchartdetaillistRead() {		
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'organizationchartdetail', array(), array());
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $dm->setDataList($dataList);
        $dm->setHasil(array());
        return $dm;
    }
    
    public function updatedetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'organizationchartdetail', array(), array());
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $data = $this->getAppData();
        $hasil = $dao->getDetailData($this->getAppRequest(), $data['organizationchart_id']);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
		
    }
    
    protected function getMainDao() {
        return new Hrd_Models_Organizationchart_OrganizationchartDao();
    }

    protected function getMainFieldID() {
        return "organizationchart_id"; //prefix id header
    }

    protected function getMainObject() {
        return new Hrd_Models_Organizationchart_Organizationchart();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Organizationchart_OrganizationchartValidator();
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    public function maindataRead(){
        $data = $this->getAppData();
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $success = $dao->getdataByid($data["organizationchart_id"]);
        return Box_Tools::instantRead(array(
                "SUCCESS" => $success
        ));
    }
    	
    public function saveheaderRead() {
        $hasil = FALSE;
        $msg = "";
        
        $params = $this->getAppData();
        $organizationchart_id = $params['organizationchart_id'];
        
        $dao 	= $this->getMainDao();
        $hasil 	= $dao->saveHeader($organizationchart_id);
        
        $arrayRespon = array("HASIL" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function positionlistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        //$dataList = new Box_Models_App_DataListCreator('', 'organizationchartposition', array(), array());
        $dataList = new Box_Models_App_DataListCreator('', 'position', array(), array());
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $position = new Hrd_Models_Organizationchart_Organizationchart();
        $this->setArrayTable($position, $this->getAppData());		
	$hasil = $dao->getPositionlist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
	
    public function selectpositionRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->selectposition($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
	/*
    public function parameterRead() {
//		
//        $m_parent = new Hrd_Models_Organizationchart_Organizationchart();
//        $allparent = $m_parent->prosesDataWithSession($this->getAppSession(), TRUE);
	var_dump($this->getAppData());
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $parent = new Hrd_Models_Organizationchart_Organizationchart();
        $this->setArrayTable($parent, $this->getAppData());		
	$hasil = $dao->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($allparent));
    }
    */
    public function parameterRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'organizationchartdetail', array(), array());
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $detail = new Hrd_Models_Organizationchart_Organizationchartdetail();
        $this->setArrayTable($detail, $this->getAppData());		
	$hasil = $dao->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $arrayRespon = array(
            "HASIL" => TRUE);
        return Box_Tools::instantRead($arrayRespon, array($hasil));
    }
    
    public function listcbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $data = $this->getAppData();

        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
	$alldetail = $dao->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $alldetail = Box_Tools::toObjectResult($alldetail, new Hrd_Models_Organizationchart_Organizationchartdetail());		
        $dm->setHasil(array($alldetail));		
        return $dm;
    }
    
    public function detaillistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'organizationchartdetail', array(), array());
        $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
        $detail = new Hrd_Models_Organizationchart_Organizationchartdetail();
        $this->setArrayTable($detail, $this->getAppData());		
	$hasil = $dao->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function detailsaveRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->detailsave($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
    
    public function deletedetailRead() {
        $data = $this->getAppData();
        $dao = $this->getMainDao();
        $success = $dao->deletedetail($this->getAppSession(), $data);
        return Box_Tools::instantRead(array(
                    "SUCCESS" => $success
        ));
    }
    
    /*
    public function detaillistRead() {
        
            $model = new Hrd_Models_Organizationchart_Organizationchartdetail();
            $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
            $result = $dao->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());	
            $tree = $this->buildTree($result[1], 0, 'menu');
            $tree = Zend_Json::encode($tree);
            var_dump($tree); exit;

            echo Zend_Json::encode($tree);

            $this->_helper->viewRenderer->setNoRender(true);
     * 
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'organizationchartdetail', array(), array()));
        $dm->setObject(new Hrd_Models_Organizationchart_Organizationchartdetail());
        $dm->setDao(new Hrd_Models_Organizationchart_OrganizationchartDao());
        $hasil = $dm->getDao()->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setHasil(array($hasil));
            $tree = $this->buildTree($hasil[1], 0);
        //$tree = Box_Tools::toObjectResult($tree, new Hrd_Models_Organizationchart_Organizationchartdetail());		
        $dm->setHasil($tree);		
            return $dm->getHasil(); exit;
        
            $dm = new Box_Models_App_Hermes_DataModel();
            $dataList = new Box_Models_App_DataListCreator('', 'organizationchartdetail', array(), array());
            $dao = new Hrd_Models_Organizationchart_OrganizationchartDao();
            $detail = new Hrd_Models_Organizationchart_Organizationchartdetail();
            $this->setArrayTable($detail, $this->getAppData());		
            $hasil = $dao->getDetaillist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
            $dm->setDataList($dataList);
            //$dm->setHasil($hasil);
            $tree = $this->buildTree($hasil[1], 0);
            //$dm->setHasil($hasil);
            $arrayRespon = array(
                "HASIL" => TRUE);
            $tree = Box_Tools::instantRead($arrayRespon, array($tree));
            var_dump($tree); exit;
            //return $tree;
    }
    */ 
    protected function buildTree(&$arr, $id = 0)
    {
            $result = array();	
            foreach ($arr as $a) {
                    //$key = $keystr.'_parent'
                    $key = 'parent_id';
                    if ($id == $a[$key]) {
                            //$subtree = $this->buildTree($arr, $a[$keystr.'_id'], $keystr);
                            $subtree = $this->buildTree($arr, $a['organizationchart_detail_id']);
                            if (count($subtree)) 
                            { 
                                    $a['expanded'] = true; 
                                    $a['children'] = $subtree; 
                            } else { 
                                    $a['leaf'] = true;				
                            }
                            $result[] = $a;
                    }				
            }
            return $result;
    }
    
}

?>
