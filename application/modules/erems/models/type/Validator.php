<?php
/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Type_Validator extends Erems_Box_Models_App_Validator {


    public function run(Erems_Models_Master_TypeTran $type){
        $msg = "";
        $codeExist = (int)$this->abDao->codeExist($type->getCode());

        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $maxJumlahLantai = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(),$this->session->getCurrentPtId())->maxJumlahLantai();

                        
      //  if( $codeExist && $codeExist != $type->getId()){
         //   $msg = "Code ".$type->getCode()." already exist";
   
        if(strlen($type->getCode())< 1){
           $msg = "Code minimum 1 characters"; 
        }else if($type->getCluster()->getId()==0){
            $msg = "Invalid cluster";
        }else if($type->getProductCategory()->getId()==0){
            $msg = "Invalid Product Category";
        }else if(strlen($type->getName())<3){
            $msg = "Name minimum 3 characters";
        }else if($type->getProductCategory()->getId() < 2 && $type->getPropertyInfo()->getElectricity() <= 0){
            $msg = "Electricity must be filled";
        }else if($type->getProductCategory()->getId() > 1 && $type->getPropertyInfo()->getElectricity() > 0){
            $msg = "Electricity untuk kategori kavling tidak bisa lebih dari 0";
        }else if($type->getProductCategory()->getId() < 2 && $type->getPropertyInfo()->getFloor() <= 0 ){
            $msg = "Jumlah lantai harus lebih dari 0";
        }else if($type->getProductCategory()->getId() > 1 && $type->getPropertyInfo()->getFloor() > 0 ){
            $msg = "Jumlah lantai untuk kategori kavling tidak bisa lebih dari 0";
        }else if($type->getPropertyInfo()->getFloor() > $maxJumlahLantai){
            $msg = "Jumlah lantai tidak bisa lebih besar dari " . $maxJumlahLantai;
        }else{
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}

?>