<?php

/**
 * Description of ProductCategoryDao
 *
 * @author MIS
 */
class Erems_Models_Master_ProductCategoryDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    public function getAll(Erems_Box_Models_App_HasilRequestRead $hr = null){
        $hasil      = array();
        $page       = 1;
        $limit      = 25;
        $code       = '';
        $productcategory = '';
        $description     = '';

        if(isset($hr)){
            $page       = (empty($hr->getPage())) ? $page : $hr->getPage();
            $limit      = (empty($hr->getLimit())) ? $limit : $hr->getLimit();
            $code       = (empty($hr->getOthersValue('code'))) ? $code : $hr->getOthersValue('code');
            $productcategory = (empty($hr->getOthersValue('productcategory'))) ? $productcategory : $hr->getOthersValue('productcategory');
            $description     = (empty($hr->getOthersValue('description'))) ? $description : $hr->getOthersValue('description');
        }

        $hasil = $this->dbTable->SPExecute('sp_productcategoryb_read', $page, $limit, $code, $productcategory, $description);

        return $hasil; 
    }

    // public function getAll(){
    //     $hasil      = array();
    //     $session    = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    //     $project_id = $session->getCurrentProjectId();
    //     $pt_id      = $session->getCurrentPtId();

    //     $hasil = $this->dbTable->SPExecute('sp_productcategoryb_read', $project_id, $pt_id);

    //     return $hasil; 
    // }
    
    public function getAllByProjectPt(Erems_Models_Master_ProductCategory $pc){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_productcategoryb_read',$pc->getProjectId(),$pc->getPtId());
        return $hasil; 
    }
    
    public function save(Erems_Models_Master_ProductCategory $pc){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_productcategoryb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getDescription());
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_ProductCategory $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_productcategorycodeexist_read',$ft->getCode());
        
        return $hasil;
    }
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_ProductCategory $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_productcategoryb_update',$pc->getAddBy(),$pc->getId(),$pc->getCode(),$pc->getName(),$pc->getDescription());
        
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_productcategoryb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
?>
