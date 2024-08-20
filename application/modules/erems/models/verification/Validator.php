<?php
/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Verification_Validator extends Erems_Box_Models_App_Validator {
   public function run(Erems_Models_Verification_Verification $pl){
        $msg = "";
        
        $dao = new Erems_Models_Verification_Dao();
        $dataExistId = $dao->getByUnit($pl);
       
     //   var_dump($dataExistId);

        
        $dataExsitApprove = 1;
        if(count($dataExistId[0]) > 0){
            $dataExsitApprove = $dataExistId[0][0]["is_approve"];
            $dataExistId = $dataExistId[0][0]["verification_id"];
           
        }else{
            $dataExistId = 0;
        }
       // $dataExistId = count($dataExistId[0]) >0 ?$dataExistId[0][0]["verification_id"]:0;
        
        
        
        
        if($pl->getUnit()->getId()==0){
            $msg = "Invalid Unit";
        }else if(!$pl->getDate()){
            $msg = "Invalid date";
        }else if(strlen($pl->getNote()) < 3){
            $msg = "Note minimun 3 charaters";
        }else if($dataExistId != $pl->getId() && $dataExsitApprove==0){
             $msg = "Verifikasi approval yang belum di approve untuk unit ini sudah terdaftar";
        }else if(!filter_var($pl->getApproveBy(), FILTER_VALIDATE_EMAIL)){
            $msg = "Email yang ApproveBy tidak valid.";
        }else if(!filter_var($pl->getSubmitBy(), FILTER_VALIDATE_EMAIL)){
            $msg = "Email yang SubmitBy tidak valid.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}
