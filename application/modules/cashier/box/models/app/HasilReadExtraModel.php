<?php


/**
 * Description of HasilReadExtraModel
 *
 * @author MIS
 */
class Cashier_Box_Models_App_HasilReadExtraModel extends Cashier_Box_Models_App_HasilRead {
    protected $model;


    public function __construct() {
        $this->totalRow = 0;
        $this->data = array();
        $this->setForm(array("totalRow"=>0,"data"=>array(),"model"=>NULL));
    }
    
    public function getModel() {
        return $this->model;
    }

    public function setModel($model) {
        $this->model = $model;
    }

        
    protected function setFormFromParams() {
        $form = parent::setFormFromParams();
        $form["model"] = $this->model;
        
        return $form;
    }

    protected function setParamsFromForm() {
        parent::setParamsFromForm();
        $form = $this->getForm();
        $this->model = $form["model"];
    }   
}

?>
