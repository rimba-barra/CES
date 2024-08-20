<?php
class Erems_MasterkoefisienController extends Zend_Controller_Action {

    function init() {
        $action = $this->getRequest()->getActionName();
        if($action != 'status'){
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            if($this->session->getUserId() == null)
            {
                throw new Zend_Controller_Action_Exception('This page does not exist', 404);
            }
        }
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Master_Koefisien();

        $post_data['koefisien_id'] = $this->getRequest()->getPost('koefisien_id');
        $post_data['pricelist'] = $this->getRequest()->getPost('pricelist');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit') == 0 ? 25 : $this->getRequest()->getPost('limit');
        $post_data['page'] = $this->getRequest()->getPost('page');

        if($this->getRequest()->getPost('mode_read') == 'schedule'){
            return $this->scheduleRead($post_data);
            exit;
        }

        if($this->getRequest()->getPost('mode_read') == 'detailGenco'){
            return $this->gencoRead();
            exit;
        }
        
        $result = $model->koefisienRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Master_Koefisien();
        $result = $model->koefisienCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Master_Koefisien();
        $result = $model->koefisienUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Master_Koefisien();
        $result = $model->koefisienDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function scheduleRead($post_data) {
        $dataList[] = array('mapping' => "scheduletype_id" ,'name' => "scheduletype_id");
        $dataList[] = array('mapping' => "scheduletype" ,'name' => "type_name");
        $dataList[] = array('mapping' => "termin" ,'name' => "termin");
        $dataList[] = array('mapping' => "persentase_amount" ,'name' => "um_inh_persen");
        $dataList[] = array('mapping' => "persentase_npv" ,'name' => "npv");
        $dao = new Erems_Models_Master_Koefisien();
        $hasil = $dao->getScheduleById($post_data);
        $hasil['model'] = $dataList;
        echo Zend_Json::encode($hasil);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function gencoRead(){
        $dao = new Erems_Models_Master_Koefisien();

        $otherAT = array("data" => array(
                "discountRateYear" => $dao->get_discount_rate_year(),
                "isSafetyFactor"   => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->isSafetyFactor(),
                "safetyfactor"   => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->safetyfactor(),
                "collectionFeeNPV"   => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->UseCollectionFeeNPV(), // added by rico 08022023
                "koefisienAllowEdit"   => Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->KoefisienAllowEdit() // added by rico 10052023
        ));
        echo Zend_Json::encode($otherAT);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}
?>
