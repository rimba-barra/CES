<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Master_TemplatechecklistValidator extends Erems_Box_Models_App_Validator{
    public function run(Erems_Models_TemplatechecklistModel $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_PositionDao();
        $code = $dao->codeExist($pl);
        
        $idExist = 0;
        if($code){
            if(count($code[0]) > 0){
                $idExist = $code[0][0]['checklist_bangunan_id'];
            }
        }
        
        $this->setMsg($msg);
    }
}

?>
