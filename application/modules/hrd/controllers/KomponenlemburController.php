<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_KomponenlemburController extends Hrd_Models_App_Template_AbstractMasterController {
    
    
    public function _getMainDataModel() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'komponenlembur', array('komponengaji'), array()));
        $dm->setObject(new Hrd_Models_Payroll_Lembur_Komponen());
        $dm->setDao(new Hrd_Models_Payroll_Lembur_Dao());
        $dm->setValidator(new Hrd_Models_Payroll_Lembur_Validator());
        $dm->setIdProperty("komponenlembur_id");
        return $dm;
        
    } 
    
    public function parameterRead(){
        
        /// get paramater
        $ma = new Hrd_Models_App_Mastertable_KomponenGaji();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);
        
        
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array(
            $aa
            
        ));
    }
}

?>
