<?php

class Erems_Models_Oldcontroller_MastertypeController extends Erems_Box_Models_App_Controller {

    function readAction() {
        $app = new Erems_Box_Models_App_Models_ReadWorms($this);
       // $app = new Erems_Box_Models_App_Models_ReadWorms($this,"read_all");
        $mr = $app->getModeRead();
        $r = $app->getRequest();
        switch ($mr){
            case "all":
                $typeDataList = new Erems_Box_Models_App_DataListCreator('', 'typetran', array("clusterb","productcategory"),array("typeattribute","deletedRows"));
                $app->registerDataList('typetran', $typeDataList);
                $dao = new Erems_Models_Master_TypeDao();
                
                $hasil = $dao->getAll($r);
          
                $app->setRequestModel(TRUE);
                $app->prosesDao("typetran", $hasil);
                break;
            case "detail":
                $typeDataList = new Erems_Box_Models_App_DataListCreator('', 'typeattribute', array('attribute','attributevalue'));
                $app->registerDataList('detail', $typeDataList);
    
                $dao = new Erems_Models_Master_TypeDao();
                $type = new Erems_Models_Master_Type();
                $type->setArrayTable($app->getData());
                $hasil = $dao->getAttribute($type);
               // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("detail", $hasil);
                break;
            case "attribute":
                $typeDataList = new Erems_Box_Models_App_DataListCreator('', 'attribute', array());
                $app->registerDataList('attribute', $typeDataList);
                $dao = new Erems_Models_Attribute_Dao();
                
                $hasil = $dao->getAll();
               // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("attribute", $hasil);
                break;
            case "attributevalue":
                $typeDataList = new Erems_Box_Models_App_DataListCreator('', 'attributevalue', array('attribute'));
                $app->registerDataList('value', $typeDataList);
                $dao = new Erems_Models_Attribute_Dao();
                
                $hasil = $dao->getAllValue();
               // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("value", $hasil);
                break;
            case "cluster":
                $dl = new Erems_Box_Models_App_DataListCreator('', 'clusterb', array());
                $app->registerDataList('attribute', $dl);
                $dao = new Erems_Models_Master_ClusterDao();
                $cluster = new Erems_Models_Master_ClusterTran();
                $cluster->setProject($app->getSession()->getProject());
                $cluster->setPt($app->getSession()->getPt());
                $hasil = $dao->getByProjectPt($cluster);
               // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("attribute", $hasil);
                break;
            case "productcategory":
                $dl = new Erems_Box_Models_App_DataListCreator('', 'productcategory', array());
                $app->registerDataList('attribute', $dl);
                $dao = new Erems_Models_Master_ProductCategoryDao();
                $pc = new Erems_Models_Master_ProductCategory();
                $pc->setProjectId($app->getSession()->getProject()->getId());
                $pc->setPtId($app->getSession()->getPt()->getId());
              
                $hasil = $dao->getAllByProjectPt($pc);
               // $hasil = array();
                $app->setRequestModel(TRUE);
                $app->prosesDao("attribute", $hasil);
                break;
				
				default:
				
				
				$typeDataList = new Erems_Box_Models_App_DataListCreator('', 'typetran', array("clusterb","productcategory"),array("typeattribute","deletedRows"));
                $app->registerDataList('typetran', $typeDataList);
                $dao = new Erems_Models_Master_TypeDao();
				$r->setLimit(10000);
                $dao->setSes($app->getSession());
                $hasil = $dao->getAll($r);
          
                $app->setRequestModel(TRUE);
                $app->prosesDao("typetran", $hasil);
                break;
           
        }
        $app->run();
    }

    function createAction() {
          $app = new Erems_Box_Models_App_Models_Create($this);
      //  $app = new Erems_Box_Models_App_Models_Create($this,"create_object");
        $msg = "Invalid Request";
        $success = FALSE;
        $typeTran = new Erems_Models_Master_TypeTran();
        $app->prosesData($typeTran);
        
        /*validate */
        $dao =new Erems_Models_Master_TypeDao();
        $validator = new Erems_Models_Type_Validator();
        $validator->setDao($dao);
        $validator->run($typeTran);
        if($validator->getStatus()){
           /// check detail
            $detail = $app->getData();

            $detail = $detail["typeattribute"];
            $typeAttribute = NULL;
            foreach($detail as $dtl){
                $typeAttribute = new Erems_Models_Type_Attribute();
                $typeAttribute->setArrayTable($dtl);
             //   var_dump($typeAttribute->getAttributeValue()->getName());
                if($typeAttribute->getAttribute()->getId() > 0){
                     
                     $typeTran->addAttribute($typeAttribute);
                }
               
            }
            
            $de = new Erems_Libraries_Delien_DelimiterEnhancer();
            $de->setDelimiterCandidate($typeTran);
            $de->generate();
            
           $row = 0;
           if($typeTran->getId() > 0){
            
               $typeTran->setModiBy($app->getSession()->getUser()->getId());
               $data = $app->getData();

                $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
                $de->setDelimiterCandidate($decan);
                $de->generate();
               $row = $dao->update($typeTran,$decan);
           }else{
                $typeTran->setAddBy($app->getSession()->getUser()->getId());
                $row = $dao->save($typeTran);  
           }
        
        
          
           if($row > 0){
               $msg = "Success";
               $success = TRUE;
           }else{
               $msg = "Something error when processiong your data";
           }
        }else{
            $msg = $validator->getMsg();
        }
        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    function updateAction() {
        $this->createAction();
    }

    function deleteAction() {
       $app = new Erems_Box_Models_App_Models_Delete($this);
        $app->setIdProperty('type_id');
        $app->execute(new Erems_Models_Master_TypeDao());
        $app->run();
    }

    protected function selectedRequestor(Erems_Box_Kouti_Requestor $requestor) {
        return $requestor->debugFunct();
    }

}

?>
